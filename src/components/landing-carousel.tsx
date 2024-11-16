"use client";

import { Product } from "@/types";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const LandingCarousel: FC<{
  featuredProducts: Product[];
}> = ({ featuredProducts }) => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {featuredProducts.map((product) => (
          <div key={product.id} className="embla__slide relative h-[500px]">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={product.image_urls[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                width={800}
                height={500}
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
              <div className="container max-w-xl flex flex-col items-center justify-center gap-4 text-white">
                <div className="text-4xl font-semibold text-center">
                  {product.name}
                </div>
                <p className="text-lg text-gray-200/75 mb-2 text-center">
                  {product.description}
                </p>
                <Link
                  href={`/products/${product.id}`}
                  className="px-8 py-4 font-semibold bg-black hover:bg-gray-900 text-white rounded-md transition-colors"
                >
                  ORDER NOW
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
