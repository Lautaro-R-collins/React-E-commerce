import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useProduct } from "../../context/productContext.jsx";
import { Link } from "react-router-dom";
import FeaturedProductSkeleton from "./FeaturedProductSkeleton.jsx";

export default function FeaturedProducts() {
  const { discountedProducts, loading } = useProduct();

  const destacados = discountedProducts.slice(0, 12);

  // Si no hay productos con descuento, no se renderiza nada
  if (!loading && destacados.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-6 p-4">
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={2.2}
        spaceBetween={14}
        className="max-w-[95%] mx-auto"
        breakpoints={{
          480: { slidesPerView: 2.6 },
          640: { slidesPerView: 3.2 },
          768: { slidesPerView: 4.2 },
          1024: { slidesPerView: 5.2 },
        }}
      >
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <SwiperSlide key={i}>
                <FeaturedProductSkeleton />
              </SwiperSlide>
            ))
          : destacados.map((item) => (
              <SwiperSlide key={item._id}>
                <Link
                  to={`/product/${item._id}`}
                  className="flex flex-col py-2 items-center bg-white hover:scale-105 transition p-4 rounded-lg"
                >
                  <img
                    src={item.images?.[0] || "/placeholder.jpg"}
                    alt={item.name}
                    className="w-32 h-32 object-contain mb-2"
                  />

                  <p className="text-sm font-semibold text-gray-700 text-center line-clamp-2">
                    {item.name}
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through text-sm">
                      ${item.price}
                    </span>

                    <span className="text-[#00a650] font-bold text-lg">
                      $
                      {Math.round(
                        item.price - (item.price * item.discount) / 100
                      )}
                    </span>
                  </div>

                  <span className="text-red-500 text-xs font-semibold">
                    {item.discount}% OFF
                  </span>
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}
