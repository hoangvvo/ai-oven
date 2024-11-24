import { AddToCart } from "@/components/add-to-cart";
import { getProduct } from "@/lib/data";
import { getProductCost } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductReviewSection } from "./product-reviews";

type Params = { product_id: string };

type Props = {
  params: Promise<Params>;
};

const getProductFromProps = async (props: Props) => {
  const params = await props.params;

  const product = await getProduct(params.product_id);

  if (!product) {
    notFound();
  }

  return product;
};

function ProductDetailSection({
  title,
  content,
}: {
  title: string;
  content: string | null;
}) {
  if (!content) {
    return null;
  }
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl md:text-2xl font-medium">{title}</h2>
      <p className="text-base md:text-lg text-neutral-700">{content}</p>
    </div>
  );
}

export default async function ProductPage(props: Props) {
  const product = await getProductFromProps(props);

  const productCost = getProductCost(product);

  return (
    <div className="container py-12 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-96">
          <Image
            src={product.image_urls[0]}
            width={400}
            height={400}
            alt={product.name}
            className="w-full aspect-square object-cover rounded"
            priority
          />
        </div>

        <div className="md:flex-1">
          <h1 className="text-3xl md:text-5xl font-medium mb-2">
            {product.name}
          </h1>
          <p className="text-base md:text-lg mb-4">{product.description}</p>
          <p className="text-xl md:text-2xl mb-6 text-gray-700">
            {productCost.price === productCost.originalPrice ? (
              <>${productCost.price}</>
            ) : (
              <>
                <span className="line-through text-neutral-500">
                  ${productCost.originalPrice}
                </span>{" "}
                ${productCost.price}{" "}
                <span className="bg-rose-600 text-white font-semibold py-1 px-2 rounded text-sm">
                  ({parseInt(product.discount_percent)}% off)
                </span>
              </>
            )}
          </p>
          <AddToCart product={product} />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <ProductDetailSection
          title="Ingredients"
          content={product.ingredients}
        />
        <ProductDetailSection
          title="Nutritional Information"
          content={product.nutritional_info}
        />
        <ProductDetailSection
          title="Allergen Information"
          content={product.allergen_info}
        />
        <ProductDetailSection
          title="Serving Suggestions"
          content={product.serving_suggestions}
        />
        <ProductDetailSection
          title="Storage Instructions"
          content={product.storage_instructions}
        />
        <ProductReviewSection product={product} />
      </div>
    </div>
  );
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const product = await getProductFromProps(props);

  return {
    title: `${product.name} - AI Oven`,
    description: product.description,
    openGraph: {
      images: product.image_urls.map((url) => ({
        url,
        alt: product.name,
      })),
    },
  };
}
