import { IMAGES } from "@src/utils/constants/app-info.constant";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";

interface PropertyImagesSliderProps {
    images: { uri?: string }[];
    altText?: string;
    height?: string; // let height be customizable
}

export const PropertyImagesSlider: React.FC<PropertyImagesSliderProps> = ({
    images = [],
    altText = "Property image",
    height = "h-48",
}) => {
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.src = IMAGES.FAILED_IMAGE;
    };

    return (
        <>
            <div className="w-full overflow-hidden ">
                <Swiper
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView: 1 },
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="w-full h-full "
                >
                    {images?.length > 0 ? (
                        images?.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image?.uri || IMAGES.NOT_FOUND}
                                    onError={handleImageError}
                                    alt={`${altText} ${index + 1}`}
                                    className={`w-full ${height} object-cover rounded-2xl`}
                                />
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <img
                                src={IMAGES.NOT_FOUND}
                                alt="No property images available"
                                className={`w-full  ${height} object-cover rounded-2xl`}
                            />
                        </SwiperSlide>
                    )}
                </Swiper>

            </div>
            {/* <div className="w-full">
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 1 },
                    1024: { slidesPerView: 1 },
                }}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="mySwiper"
            >
                {images?.length > 0 ? (
                    images?.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image?.uri || IMAGES.NOT_FOUND}
                                onError={handleImageError}
                                alt={`${altText} ${index + 1}`}
                                className={` ${height} object-cover rounded-2xl`}
                            />
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <img
                            src={IMAGES.NOT_FOUND}
                            alt="No property images available"
                            className={`  ${height} object-cover rounded-2xl`}
                        />
                    </SwiperSlide>
                )}
            </Swiper>
        </div> */}
        </>
    );
};
