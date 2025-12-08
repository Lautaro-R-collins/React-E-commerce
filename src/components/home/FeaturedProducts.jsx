import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useProduct } from "../../context/productContext.jsx";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  const { products, loading } = useProduct();
  const destacados = products.slice(0, 12);

  return (
    <div className="w-full mt-6 p-4">
      {loading && <p className="text-center">Cargando...</p>}

      {!loading && (
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
          {destacados.map((item) => (
            <SwiperSlide key={item._id}>
              <Link
                to={`/product/${item._id}`}
                className="flex flex-col py-2 items-center bg-white hover:scale-105 transition p-4"
              >
                <img
                  src={item.images?.[0] || "/placeholder.jpg"}
                  alt={item.name}
                  className="w-32 h-32 object-contain mb-2"
                />
                <p className="text-sm font-semibold text-gray-700 text-center line-clamp-2">
                  {item.name}
                </p>
                <p className="text-[#00a650] font-bold text-lg mt-1">
                  ${item.price}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
