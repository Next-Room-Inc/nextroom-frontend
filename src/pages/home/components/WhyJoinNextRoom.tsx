import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";


export const WhyJoinNextRoom = () => {
    return (
        <div className="bg-[#B3322F] pt-10">
            <h1 className="text-white text-3xl md:text-5xl w-[80%] mx-auto text-center font-bold mb-10">
                Why Join Next Room
            </h1>

            <div>
                < WhyJoinNextRoomSlider />
            </div>

            <h1 className="text-white text-3xl md:text-5xl w-[80%] mx-auto text-center font-bold mb-10">
                Why I Built Next Room
            </h1>



            <div
                className=" text-white bg-cover  text-center px-10 md:px-0 bg-fixed "

            >
                <p className=" max-w-3xl  mx-auto md:text-lg text-md leading-relaxed mb-6">
                    Annoyed by lengthy leases, scams, and dead-end housing searches, I
                    built Next Room with one thing in mind—
                    <strong>connectivity</strong>. Like building a real home, the
                    walls, the roof, the foundation—they all matter. At Next Room,
                    every piece—housing, roommates, sublets, support—fits together to
                    give students a platform that actually works.
                </p>
                <p className=" max-w-3xl mx-auto md:text-lg text-md leading-relaxed mb-8">
                    We’re the platform that should have existed years ago—now, we’re
                    building the future of student housing by removing uncertainty and
                    leading the student housing revolution. <br />
                    <span className="italic">
                        To me, student housing matters; I love what I do.
                    </span>
                </p>
                <div className=" font-bold text-lg">
                    Aidan Fitzmaurice
                </div>
                <div className=" text-md">Founder</div>
                <div className=" text-md">
                    University of Ottawa Student
                </div>
            </div>


            {/* Launching div */}
            <div className="overflow-hidden pt-20">
                <div className=" min-h-100 ">
                    <div className=" md:bg-[url('/assets/background/wave_bg_red.svg')]  flex  flex-col-reverse md:flex-row bg-bottom  bg-no-repeat ">
                        <div className="  w-full md:w-1/2 -mb-5 md:-mb-10">
                            <img
                                src={`/assets/images/white_shirt_girl.svg`}
                                alt=""
                                className={'h-full mx-auto '}
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <motion.img
                                src={`/assets/images/launch_text.svg`}
                                alt=""
                                className="h-full mx-auto"
                                animate={{
                                    opacity: [1, 0.4, 1, 0.2, 1], // flicker steps
                                }}
                                transition={{
                                    duration: 1.5,     // total duration of one flicker loop
                                    repeat: Infinity,  // repeat forever
                                    ease: "easeInOut",
                                    times: [0, 0.2, 0.5, 0.7, 1], // control when opacity changes
                                }}
                            />
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}



const features = [
    { title: "Free To Join", image: `happy_emoji.svg`, className: "h-8 w-8" },
    { title: "Built By Students, For Students.", image: `convocation_hat.svg`, },
    { title: "Find Housing & Students You Actually Like", image: `house.svg`, },
    { title: "Access Exclusive Student Events & Giveaways", image: `gift.svg`, },
    { title: "Be Part Of A Growing Student Community", image: `handshake.svg`, },
    { title: "Make Renting Less Stressful, More Transparent", image: `key.svg`, },
];

const WhyJoinNextRoomSlider = () => {
    return (
        <div className="w-full mx-auto px-10 py-10">
            <Swiper
                loop
                spaceBetween={60}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
                // navigation
                pagination={{ clickable: true }}
                // modules={[Navigation, Pagination]}
                className="mySwiper"
            >
                {features.map((feature, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className=" z-0 relative h-120 rounded-xl overflow-hidden bg-white py-25 px-10"
                        >
                            <div className="flex flex-col items-center justify-between   h-full ">


                                <h3 className="text-2xl font-bold   text-center mx-auto text-[#B3322F] w-[100%] mb-8">
                                    {feature.title}
                                </h3>
                                <div className="flex items-center gap-3 mb-2">


                                    <img
                                        src={`/assets/images/${feature.image}`}
                                        alt=""
                                        className={'h-40 mx-auto'}
                                    />


                                </div>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}