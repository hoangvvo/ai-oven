import { getProductCost } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";

export function ProductCard({
  product,
  imageProps,
}: {
  product: Product;
  imageProps?: Partial<React.ComponentProps<typeof Image>>;
}) {
  const productCost = getProductCost(product);

  return (
    <div className="group flex flex-col items-center gap-2 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
      <div className="relative w-full aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-2">
        <Image
          src={product.image_urls[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          width={192}
          height={192}
          {...imageProps}
        />
        <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
          {product.featured && (
            <span className="bg-gradient-to-tr from-emerald-600 to-emerald-700 text-white text-xs font-bold py-1.5 px-4 rounded">
              Featured
            </span>
          )}
          {Number(product.discount_percent) > 0 && (
            <span className="bg-gradient-to-tr from-rose-600 to-rose-500 text-white text-xs font-bold py-1.5 px-4 rounded">
              {parseInt(product.discount_percent)}% off
            </span>
          )}
        </div>
      </div>
      <h3 className="text-xl text-black w-full text-left">{product.name}</h3>
      <p className="text-sm text-neutral-500 line-clamp-2 w-full text-left">
        {product.description}
      </p>
      <p className="text-sm text-neutral-600 w-full text-left">
        Starting from{" "}
        {productCost.price === productCost.originalPrice ? (
          <>${productCost.price}</>
        ) : (
          <>
            <span className="line-through">${productCost.originalPrice}</span> $
            {productCost.price}
          </>
        )}
      </p>
    </div>
  );
}
