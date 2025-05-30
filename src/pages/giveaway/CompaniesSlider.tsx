import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { APP_INFO } from "../../utils/constants";

const list = [

  `company-logo-01.svg`,
  `company-logo-02.svg`,
  `company-logo-03.png`,
  `company-logo-04.svg`,
  `company-logo-05.svg`,
  `company-logo-06.svg`,
  `company-logo-07.svg`,
  `company-logo-08.svg`,
  `company-logo-09.png`, 

];

export const CompaniesSlider = () => {
  return (
    <>
      <div className="w-full mx-auto px-4 bg-[#C32026]">
        <Swiper
          loop
          // spaceBetween={20}
          slidesPerView={2.5}
          breakpoints={{
            400: { slidesPerView: 2.5 },
            640: { slidesPerView: 3.5 },
            768: { slidesPerView: 5.5 },
            1024: { slidesPerView: 7.5},
          }}

          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {list.map((giveaway, index) => (
            <SwiperSlide key={index}>
              <div
                className=" z-0 relativeoverflow-hidden  flex justify-center items-center"
              >
                <img
                  src={`${APP_INFO.IMG_BASE_URL}company_logos/${giveaway}`}
                  alt=""
                  className=" md:h-40 h-30"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
