import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  {
    id: 1,
    src: "https://http2.mlstatic.com/D_NQ_776708-MLA100247837909_122025-OO.webp",
    alt: "Primera imagen",
  },
  {
    id: 2,
    src: "https://http2.mlstatic.com/storage/splinter-admin/o:f_webp,q_auto:best/1764797409205-3e444e50-d08f-11f0-83a3-73f47fda0910.png",
    alt: "Segunda imagen",
  },
  {
    id: 3,
    src: "https://http2.mlstatic.com/D_NQ_629622-MLA99760735676_122025-OO.webp",
    alt: "tercera imagen",
  },
];

function ImageCarousel() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop
      autoplay={{ delay: 4000, disableOnInteraction: false }}
    >
      {images.map((img) => (
        <SwiperSlide key={img.id}>
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-[150px] sm:h-[200px] md:h-[350px] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImageCarousel;
