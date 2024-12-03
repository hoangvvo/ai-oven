import { ProductEntity } from "@/db/schema";
import { Product, ProductDataVectorEntity, ProductReview } from "@/types";
import outdent from "outdent";
import { openai } from "./ai";

class Embedder {
  constructor() {}

  async embed(texts: string[]) {
    const res = await openai.embeddings.create({
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

export async function embedReviews(
  reviews: ProductReview[],
  product: Product,
): Promise<Omit<ProductDataVectorEntity, "id">[]> {
  const data = reviews.map((review): Omit<ProductDataVectorEntity, "id"> => {
    const content = outdent`
      Review for ${product.name}:
      ${review.comment}
    `;

    return {
      product_id: product.id,
      vector: [],
      content_type: "user_review",
      content_text: content,
      user_review_id: review.id,
    };
  });

  const vectors = await embedder.embed(data.map((d) => d.content_text));

  return data.map((d, i) => ({
    ...d,
    vector: vectors[i],
  }));
}
