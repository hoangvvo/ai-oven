import { ProductDataVectorEntity } from "@/types";
import {
  ConsistencyLevelEnum,
  DataType,
  MetricType,
  MilvusClient,
  SearchResultData,
} from "@zilliz/milvus2-sdk-node";
import { VECTOR_COLLECTION_NAME } from "./constants";

class Milvus {
  private client: MilvusClient;

  constructor() {
    this.client = new MilvusClient({
      address: process.env.MILVUS_HOST as string,
      token: process.env.MILVUS_TOKEN as string,
    });
  }

  private _initPromise: Promise<void> | null = null;
  private hasInit = false;

  async init() {
    await this.createCollection();
  }

  async initIfNeeded() {
    if (!this.hasInit) {
      if (!this._initPromise) {
        this._initPromise = this.init();
      }
      return this._initPromise;
    }
  }

  private async createCollection() {
    const hasCollectionRes = await this.client.hasCollection({
      collection_name: VECTOR_COLLECTION_NAME,
    });
    if (hasCollectionRes.status.code) {
      throw new Error(
        `Failed to create collection: ${hasCollectionRes.status.reason}`,
      );
    }
    if (hasCollectionRes.value) {
      return;
    }

    await this.client.createCollection({
      collection_name: VECTOR_COLLECTION_NAME,
      fields: [
        {
          name: "id",
          is_primary_key: true,
          data_type: DataType.VarChar,
          max_length: 64,
        },
        {
          name: "product_id",
          data_type: DataType.VarChar,
          max_length: 64,
        },
        {
          name: "vector",
          data_type: DataType.FloatVector,
          dim: 1536,
        },
        {
          // "product_info", "user_review"
          name: "content_type",
          data_type: DataType.VarChar,
          max_length: 64,
        },
        {
          name: "content_text",
          data_type: DataType.VarChar,
          max_length: 2048,
        },
        {
          name: "user_review_id",
          data_type: DataType.Int16,
          max_length: 64,
          default_value: -1,
        },
      ],
    });

    await this.client
      .createIndex([
        {
          collection_name: VECTOR_COLLECTION_NAME,
          field_name: "vector",
          metric_type: MetricType.IP,
        },
        {
          collection_name: VECTOR_COLLECTION_NAME,
          field_name: "product_id",
        },
      ])
      .then((res) => {
        if (res.code) {
          throw new Error(`Failed to create index: ${res.code}: ${res.reason}`);
        }
      });

    await this.client
      .loadCollection({
        collection_name: VECTOR_COLLECTION_NAME,
      })
      .then((res) => {
        if (res.code) {
          throw new Error(
            `Failed to load collection: ${res.code}: ${res.reason}`,
          );
        }
      });
  }

  async search<F extends keyof ProductDataVectorEntity>({
    vector,
    vectors,
    limit,
    offset = 0,
    filter,
    outputFields,
  }: {
    vector?: number[];
    vectors?: number[][];
    limit: number;
    offset?: number;
    filter?: string;
    outputFields?: F[];
  }) {
    await this.initIfNeeded();

    const res = await this.client.search({
      collection_name: VECTOR_COLLECTION_NAME,
      data: vector ? [vector] : vectors,
      limit,
      offset,
      filter,
      output_fields: outputFields,
      vector_type: DataType.FloatVector,
      consistency_level: ConsistencyLevelEnum.Bounded,
    });
    if (res.status.code) {
      throw new Error(res.status.reason);
    }

    return res.results.flat() as (SearchResultData & {
      [K in F]: ProductDataVectorEntity[K];
    })[];
  }

  async upsert(data: Omit<ProductDataVectorEntity, "id">[]) {
    await this.initIfNeeded();

    const res = await this.client.upsert({
      collection_name: VECTOR_COLLECTION_NAME,
      data: data.map((d) => {
        let id: string;
        if (d.content_type === "product_info") {
          id = `${d.product_id}/product_info`;
        } else if (d.content_type === "user_review") {
          if (!d.user_review_id) {
            throw new Error("user_review_id is required for user_review");
          }
          id = `${d.product_id}/user_review/${d.user_review_id}`;
        } else {
          throw new Error(`Unknown content_type: ${d.content_type}`);
        }

        return {
          id,
          ...d,
        };
      }),
    });

    if (res.status.code) {
      throw new Error(res.status.reason);
    }
  }

  async delete(filter: string) {
    await this.initIfNeeded();

    const res = await this.client.delete({
      collection_name: VECTOR_COLLECTION_NAME,
      filter,
    });
    if (res.status.code) {
      throw new Error(`Failed to delete: ${res.status.reason}`);
    }
  }
}

export const vectorStore = new Milvus();
