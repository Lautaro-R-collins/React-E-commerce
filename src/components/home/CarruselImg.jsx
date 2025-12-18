import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { homeCarouselImages } from "../../mocks/homeCarousel.mock";

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
      {homeCarouselImages.map((img) => (
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
