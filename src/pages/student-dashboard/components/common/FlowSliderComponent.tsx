import { APP_INFO } from '@src/utils/constants'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'


const slidersList = [
    {
        image: `https://storage.googleapis.com/nextroom-images/events/1/slider/1.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=cloud-run-service-account%40nextroom-backend.iam.gserviceaccount.com%2F20250904%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250904T213122Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=144a7469905a9046e50f18d6c6a24fb2cbbf6cb28aba862031e2bc721ab2507074f324389fd0a31bbb3ae981640e120252c2bb05f3d9cee5187576943907581f52e0b5b2b7b7885c625053de54510d786d062b1f646d7803a5ce2c35bd584e00ca1e2c41a72098dffd8fc500de3c85de119f29b83dec9c0f889210f08d4420d5bf5622ea9192b2f15bf19b15970e04762ae8c15fc8c7d6d92ff39f0926596153af6cea5aac55e1e1fbbad6369ddb242f0ac476109dc0ac2eda7b72f5f8752273d38a275459b2276e103408dfc07174b5b4559dad137b1149b709adacb0946b30dec55beaaa41e2322b2d4c4fa45764ab165473171d4c13b6b27b1f968f229238`,
    },
    {
        image: `event_4.png`,
    },
    {
        image: `event_3.png`,
    },
    {
        image: `event_2.png`,
    },
];


export const FlowSliderComponent = () => {
    return (
        <>
            <div className="w-full my-4">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 3 },
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="mySwiper1"
                >
                    {slidersList.map((feature, index) => (
                        <SwiperSlide key={index}>

                            <div
                                className={`z-10 md:flex  overflow-hidden `}
                            >

                                <img
                                    src={`${APP_INFO.IMG_BASE_URL}events/${feature.image}`}
                                    alt={"title"}
                                    className="w-full h-50  object-cover rounded-2xl"
                                />

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </>
    );
};