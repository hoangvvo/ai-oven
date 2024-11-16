"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container flex flex-col items-center justify-center h-full py-36">
      <img
        src="https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.nj.com/home/njo-media/width2048/img/middlesex_impact/photo/ovenfirejpg-210d84f170210b50.jpg"
        alt="Burned oven"
        className="w-48 h-48 object-cover rounded mb-8"
      />
      <h1 className="text-4xl font-semibold mb-4">Uh-oh!</h1>
      <p className="text-gray-900 text-xl mb-8">
        Our oven overheated, and things got a little crispy!
      </p>
      <p className="text-lg text-gray-600  mb-8">
        It seems something went wrong, and we burned this page. But don’t worry,
        our bakers are working to fix it. In the meantime, you can head back to
        our home page or try reloading.
      </p>
      <button
        onClick={reset}
        className={buttonVariants({
          variant: "secondary",
        })}
      >
        Reload
      </button>
      <Link href="/" className={buttonVariants()}>
        Return to Home
      </Link>
    </div>
  );
}