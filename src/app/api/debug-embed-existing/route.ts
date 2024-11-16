import { db } from "@/db";
import { embedProduct } from "@/lib/embedder";
import { vectorStore } from "@/lib/vector-store";

export async function POST(request: Request) {
  const json = await request.json();
  if (!json.token || json.token !== process.env["SECRET_KEY"]) {
    return new Response("Unauthorized", { status: 401 });
  }

  const products = await db.query.productsTable.findMany();

  let vectorCount = 0;

  for (const product of products) {
    const [productVectorData] = await embedProduct(product);
    vectorCount += 1;
    await vectorStore.upsert([productVectorData]);
  }

  return Response.json({
    productCount: products.length,
    vectorCount,
  });
}
