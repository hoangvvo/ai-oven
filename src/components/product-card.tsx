import { Product } from "@/types";
import Image from "next/image";

export function ProductCard({
  product,
  imageProps,
}: {
  product: Product;
  imageProps?: Partial<React.ComponentProps<typeof Image>>;
}) {
  return (
    <div className="group flex flex-col items-center gap-2 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
      <div className="w-full aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-2">
        <Image
          src={product.image_urls[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          width={192}
          height={192}
          {...imageProps}
        />
      </div>
      <h3 className="text-xl text-black w-full text-left">{product.name}</h3>
      <p className="text-sm text-neutral-500 line-clamp-2 w-full text-left">
        {product.description}
      </p>
      <p className="text-sm text-neutral-600 w-full text-left">
        Starting from ${Number(product.price).toFixed(2)}
      </p>
    </div>
  );
}
