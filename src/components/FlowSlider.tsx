import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { APP_INFO } from "@src/utils/constants";

const features = [
  {
    icon: `slider_icon_1.svg`,
    title: "Flexible Sublets",
    description: "We help you find sublets automatically.",
    image: `slider_1.png`,
    className: "h-8 w-8"
  },
  {
    icon: `slider_icon_2.svg`,
    title: "AI Matching",
    description: "Equal weighting of roommate and property preferences.",
    image: `slider_2.png`,
    className: "h-8 w-8"
  },
  {
    icon: `slider_icon_3.svg`,
    title: "Friend Option",
    description: "Students may still live with their friends.",
    image: `slider_3.png`,
    className: "h-8 w-8"
  },
  {
    icon: `slider_icon_4.svg`,
    title: "Verified Students Only",
    description: "Every user on the platform is a real, verified student.",
    image: `slider_4.png`,
    className: "w-8 h-8"
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
                    <div className=" bg-[#B3322F] p-5 rounded-full">
                      <img
                        src={`${APP_INFO.IMG_BASE_URL}images/${feature.icon}`}
                        alt=""
                        className={feature.className}
                      />
                    </div>
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
