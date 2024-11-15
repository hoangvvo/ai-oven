import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Collection {
  title: string;
  description: string;
  image: string;
  collection: string;
}

const productCollections: Collection[] = [
  {
    title: "Artisan Bread",
    description:
      "Discover our curated selection of artisan bread, each a masterpiece of flavor and craftsmanship.",
    image: "https://images.unsplash.com/photo-1588870410947-895d92561635",
    collection: "breads",
  },
  {
    title: "Exquisite Pastries",
    description:
      "Discover our curated selection of exquisite pastries, each a masterpiece of flavor and craftsmanship.",
    image: "https://plus.unsplash.com/premium_photo-1663133750605-97df74d9d3a2",
    collection: "pastries",
  },
  {
    title: "Gourmet Cakes",
    description:
      "Discover our curated selection of gourmet cakes, each a masterpiece of flavor and craftsmanship.",
    image: "https://plus.unsplash.com/premium_photo-1661431015513-68ea7322097a",
    collection: "cakes",
  },
];

const occasionCollections: Collection[] = [
  {
    title: "Weddings",
    description: "Elegant cakes and delicate pastries for your special day",
    image: "https://images.unsplash.com/photo-1559373098-e1caaccae791",
    collection: "wedding",
  },
  {
    title: "Birthdays",
    description:
      "Customized cakes and colorful treats to celebrate another year",
    image: "https://plus.unsplash.com/premium_photo-1663839412026-51a44cfadfb8",
    collection: "birthday",
  },
  {
    title: "Corporate Events",
    description:
      "Sophisticated pastries and finger foods for professional gatherings",
    image: "https://plus.unsplash.com/premium_photo-1723867267202-169dfe3b197a",
    collection: "corporate",
  },
  {
    title: "Holidays",
    description: "Seasonal specialties to make your festivities even sweeter",
    image: "https://images.unsplash.com/photo-1608906457945-eae8eecf31a5",
    collection: "holiday",
  },
];

const testimonialData = [
  {
    name: "Sophie L.",
    quote:
      "The croissants at Élégant are simply divine. Perfectly flaky and buttery!",
  },
  {
    name: "Thomas M.",
    quote:
      "Their attention to detail in every pastry is remarkable. A true Parisian experience.",
  },
  {
    name: "Emma R.",
    quote:
      "The seasonal specials never disappoint. Always looking forward to what's next!",
  },
];

interface CollectionSectionProps {
  title: string;
  description: string;
  collections: Collection[];
  columns: 2 | 3 | 4; // Configurable columns value
  className?: string;
}

const getGridClass = (columns: 2 | 3 | 4) => {
  switch (columns) {
    case 2:
      return "sm:grid-cols-2";
    case 3:
      return "sm:grid-cols-2 lg:grid-cols-3";
    case 4:
      return "sm:grid-cols-2 lg:grid-cols-4";
    default:
      return "sm:grid-cols-2";
  }
};

const CollectionSection: React.FC<CollectionSectionProps> = ({
  title,
  description,
  collections,
  columns,
  className,
}) => (
  <section className={cn("py-12", className)}>
    <div className="container flex flex-col gap-8 items-center">
      <div className="flex flex-col max-w-xl gap-2">
        <h2 className="text-4xl font-semibold text-center">{title}</h2>
        <p className="text-gray-500 text-center text-xl max-w-xl">
          {description}
        </p>
      </div>
      <div className={`grid grid-cols-1 gap-4 mt-8 ${getGridClass(columns)}`}>
        {collections.map((collection) => (
          <Link
            key={collection.title}
            className="flex flex-col items-center"
            href={`/products?collection=${collection.collection}`}
          >
            <Image
              className="object-cover w-40 h-40 rounded"
              width={160}
              height={160}
              src={collection.image}
              alt={collection.title}
            />
            <div className="p-4 text-center">
              <h3 className="text-2xl mb-1">{collection.title}</h3>
              <p className="text-gray-500 max-w-md">{collection.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const AboutSection: FC = () => (
  <div className="py-12">
    <div className="container p-12 bg-indigo-100 flex flex-col md:flex-row items-center rounded-lg">
      <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 flex flex-col items-start">
        <h2 className="text-4xl mb-6 font-light tracking-wide">Our Legacy</h2>
        <p className="text-[#4a4a4a] mb-6 leading-relaxed">
          Since 1920, AI Oven has been an emblem of artisanal excellence. Our
          unwavering commitment to quality and tradition is evident in every
          creation, making each bite a testament to our rich heritage.
        </p>
        <Link className={buttonVariants()} href="/about">
          Discover Our Story
          <ChevronRightIcon className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="md:w-1/2">
        <Image
          src="https://images.unsplash.com/photo-1702132341930-1813b0a0ea31?q=80&w=1309&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={300}
          height={600}
          alt="Bakery interior"
          className="rounded-lg shadow-md ml-auto"
        />
      </div>
    </div>
  </div>
);

const TestimonialSection: FC = () => (
  <div className="py-12 mb-24">
    <div className="container flex flex-col gap-8 items-center">
      <h2 className="text-4xl font-semibold text-center">
        What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonialData.map((testimonial) => (
          <div key={testimonial.name} className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <StarIcon className="w-6 h-6 text-yellow-400" />
              <StarIcon className="w-6 h-6 text-yellow-400" />
              <StarIcon className="w-6 h-6 text-yellow-400" />
              <StarIcon className="w-6 h-6 text-yellow-400" />
              <StarIcon className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-gray-500">{testimonial.quote}</p>
            <p className="text-lg font-semibold mt-4">
              &ldquo;{testimonial.name}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const IndexPage: React.FC = () => {
  return (
    <>
      <CollectionSection
        title="Our Products"
        description="Indulge in our meticulously crafted pastries and breads, where centuries-old techniques meet modern refinement."
        collections={productCollections}
        columns={3}
      />
      <CollectionSection
        title="Treats for any Occasion"
        description="From birthdays to anniversaries, our cakes are the perfect centerpiece for any celebration."
        collections={occasionCollections}
        columns={4}
        className="bg-red-50"
      />
      <AboutSection />
      <TestimonialSection />
    </>
  );
};

export default IndexPage;
