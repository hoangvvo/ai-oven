import { AddToCart } from "@/components/add-to-cart";
import { getProduct } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";

type Params = { product_id: string };

export default async function ProductPage({
  params: paramsPromise,
}: {
  params: Promise<Params>;
}) {
  const params = await paramsPromise;
  const product = await getProduct(params.product_id);

  if (!product) {
    notFound();
  }

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

        {/* Product Details */}
        <div className="md:flex-1">
          <h1 className="text-3xl md:text-5xl font-medium mb-4">
            {product.name}
          </h1>
          <p className="text-xl md:text-2xl mb-6">${product.price}</p>
          <AddToCart product={product} />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl font-medium">Description</h2>
          <p className="text-base md:text-lg">{product.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl font-medium">Ingredients</h2>
          <p className="text-base md:text-lg">{product.ingredients}</p>
        </div>
      </div>
    </div>
  );
}