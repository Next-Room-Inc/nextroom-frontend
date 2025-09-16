import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { APP_INFO } from "@src/utils/constants";

const features = [
  {
    icon: `landlord-icon1.png`,
    title: "Reach Student Renters Faster",
    description: "The platform students are already on.",
    image: `landlord-slider1.png`,
    className: "h-8 w-8"
  },
  {
    icon: `landlord-icon2.png`,
    title: "Only Pay For Qualified Leads",
    description: "Stress-free with no upfront fees.",
    image: `landlord-slider2.png`,
    className: "h-8 w-8"
  },
  {
    icon: `landlord-icon3.png`,
    title: "Sync Directly",
    description: "With platforms like Entrata, RentCafe & more.",
    image: `landlord-slider3.png`,
    className: "h-8 w-8"
  },
  {
    icon: `landlord-icon4.png`,
    title: "Ensure Higher Occupancy",
    description: "Next Room automatically fills your units.",
    image: `landlord-slider4.png`,
    className: "w-8 h-8"
  },
];

export const LandLordFlowSlider = () => {
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
                  backgroundPosition: "top",
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0  p-5 flex flex-col justify-end text-white  ">
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
