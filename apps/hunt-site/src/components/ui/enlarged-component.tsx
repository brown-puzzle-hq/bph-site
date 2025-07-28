"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageProps } from "next/image";

export function EnlargedImage({ props }: { props: ImageProps }) {
  const [enlargedImage, setEnlargedImage] = useState<boolean>(false);

  // Prevent scrolling in the background when the modal is open
  useEffect(() => {
    if (enlargedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [enlargedImage]);

  return (
    <>
      {/* Image Grid */}
      <div className="flex space-x-2">
        <div
          className="relative cursor-pointer"
          onClick={() => setEnlargedImage(true)}
        >
          <Image {...props} className="rounded-lg" />
        </div>
      </div>

      {/* Scrollable Fullscreen Modal with Larger Image */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-neutral-900/90"
          onClick={() => setEnlargedImage(false)}
        >
          <div className="max-w-screen relative max-h-screen overflow-auto p-4">
            <Image
              src={props.src}
              alt={props.alt}
              height={
                (typeof props.height === "number" ? props.height : 800) * 2
              }
              width={(typeof props.width === "number" ? props.width : 800) * 2}
              className="max-h-none max-w-none rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
