import { useState } from "react";
import { LuX } from "react-icons/lu";

const ProductGallery = ({ images = [], productName }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomOpen, setZoomOpen] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="lg:w-1/2 flex flex-col lg:flex-row gap-4">
        {images.length > 1 && (
          <div className="hidden lg:flex flex-col gap-2 w-24 max-h-[450px] overflow-y-auto">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail-${idx}`}
                className="w-20 h-20 object-cover cursor-pointer hover:opacity-80 transition"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        )}

        <div className="w-full flex justify-center">
          <div className="w-full max-w-md h-[300px] flex items-center justify-center">
            <img
              src={selectedImage || images[0]}
              alt={productName}
              className="max-h-full max-w-full object-contain cursor-zoom-in"
              onClick={() => setZoomOpen(true)}
            />
          </div>
        </div>

        {images.length > 1 && (
          <div className="flex lg:hidden gap-2 mt-3 justify-center flex-wrap">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail-${idx}`}
                className="w-20 h-20 object-cover cursor-pointer"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        )}
      </div>

      {zoomOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-3xl p-2 cursor-pointer hover:opacity-70 transition"
            onClick={() => setZoomOpen(false)}
          >
            <LuX />
          </button>
          <div
            className="cursor-zoom-out flex items-center justify-center w-full h-full"
            onClick={() => setZoomOpen(false)}
          >
            <img
              src={selectedImage || images[0]}
              alt="zoomed"
              className="max-h-[90%] max-w-[90%] object-contain cursor-default"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductGallery;
