import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { APP_INFO } from "../../utils/constants";

const list = [

  `giveaway_prizes-1.svg`,
  `giveaway_prizes-2.svg`,
  `giveaway_prizes-3.svg`,
  `giveaway_prizes-4.svg`,
  `giveaway_prizes-5.svg`,
  `giveaway_prizes-6.svg`,
  `giveaway_prizes-7.svg`,
  `giveaway_prizes-8.svg`,

];

export const GiveAwaySlider = () => {
  return (
    <>
      <div className="w-full mx-auto px-4 py-10">
        <Swiper
          loop
          spaceBetween={20}
          slidesPerView={1.4}
          breakpoints={{
            400: { slidesPerView: 1.4 },
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 3.1 },
            1024: { slidesPerView: 3.5 },
          }}

          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {list.map((giveaway, index) => (
            <SwiperSlide key={index}>
              <div
                className=" z-0 relative  rounded-xl overflow-hidden bg-[#C32026] flex justify-center items-center"
              >
                <img
                  src={`${APP_INFO.IMG_BASE_URL}images/${giveaway}`}
                  alt=""
                  className=" h-70 "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
