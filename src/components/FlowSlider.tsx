import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { APP_INFO } from "../utils/constants";

const features = [
  {
    icon: `slider_icon_1.png`,
    title: "Flexible Sublets",
    description: "We help you find sublets automatically.",
    image: `slider_1.png`,
  },
  {
    icon: `slider_icon_2.png`,
    title: "AI Matching",
    description: "Equal weighting of roommate and property preferences.",
    image: `slider_2.png`,
  },
  {
    icon: `slider_icon_3.png`,
    title: "Friend Option",
    description: "Students may still live with their friends.",
    image: `slider_3.png`,
  },
  {
    icon: `slider_icon_1.png`,
    title: "Flexible Sublets",
    description: "We help you find sublets automatically.",
    image: `slider_1.png`,
  },
];

export const FlowSlider = () => {
  return (
    <>
      <div className="w-full mx-auto px-4 py-10">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <div
                className=" z-0 relative h-80 rounded-xl overflow-hidden"
                style={{
                  backgroundImage: `url(assets/img/images/${feature.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0  p-5 flex flex-col justify-end text-white cursor-pointer ">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={`${APP_INFO.IMG_BASE_URL}images/${feature.icon}`}
                      alt=""
                      className="w-18 h-18 bg-[#B3322F] p-1 rounded-full"
                    />
                    <div className="text-left">
                      <h3 className="text-lg font-semibold mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
