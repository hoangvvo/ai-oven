import { ProductEntity } from "@/db/schema";
import { ProductDataVectorEntity } from "@/types";
import OpenAI from "openai";
import outdent from "outdent";

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

class Embedder {
  constructor() {}

  async embed(texts: string[]) {
    const res = await client.embeddings.create({
      input: texts,
      model: "text-embedding-3-small",
    });

    return res.data.map((d) => d.embedding);
  }
}

export const embedder = new Embedder();

export async function embedProduct(
  product: ProductEntity,
): Promise<Omit<ProductDataVectorEntity, "id">[]> {
  const content = outdent`
    ${product.name} information:
    Description: ${product.description}
    Ingredients: ${product.ingredients}
    Nutritional: ${product.nutritional_info}
    Allergen: ${product.allergen_info}
    Serving Suggestions: ${product.serving_suggestions}
    Storage Instructions: ${product.storage_instructions}
  `;

  const [vector] = await embedder.embed([content]);

  return [
    {
      product_id: product.id,
      vector,
      content_type: "product_info",
      content_text: content,
      user_review_id: 0,
    },
  ];
}
