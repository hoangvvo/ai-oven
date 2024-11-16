import imageCakeNotFound from "@/assets/images/cake-not-found.jpg";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center h-full py-36">
      <Image
        src={imageCakeNotFound}
        alt="Cake not found"
        className="w-48 h-48 object-cover rounded mb-8"
        width={192}
        height={192}
      />
      <h1 className="text-4xl font-semibold mb-4">Oops!</h1>
      <p className="text-gray-900 text-xl mb-8">
        It looks like this page is half-baked or out of the oven.
      </p>
      <p className="text-lg text-gray-600  mb-8">
        Maybe the dough didn’t rise, or we mixed up the ingredients. Either way,
        it’s not here!
      </p>
      <Link href="/" className={buttonVariants()}>
        Return to Home
      </Link>
    </div>
  );
}
