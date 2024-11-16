import { AddToCart } from "@/components/add-to-cart";
import { getProduct } from "@/lib/data";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

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

export default async function ProductPage(props: Props) {
  const product = await getProductFromProps(props);

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
          />
        </div>

        <div className="md:flex-1">
          <h1 className="text-3xl md:text-5xl font-medium mb-2">
            {product.name}
          </h1>
          <p className="text-base md:text-lg mb-4">{product.description}</p>
          <p className="text-xl md:text-2xl mb-6 text-gray-700">
            ${product.price}
          </p>
          <AddToCart product={product} />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl font-medium">Ingredients</h2>
          <p className="text-base md:text-lg">{product.ingredients}</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl font-medium">Nutrition Facts</h2>
          <p className="text-base md:text-lg">{product.nutritional_info}</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl font-medium">Allergens</h2>
          <p className="text-base md:text-lg">{product.allergen_info}</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl font-medium">
            Serving Instructions
          </h2>
          <p className="text-base md:text-lg">{product.serving_suggestions}</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl font-medium">
            Storage Instructions
          </h2>
          <p className="text-base md:text-lg">{product.storage_instructions}</p>
        </div>
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
