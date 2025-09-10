import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Button } from '@src/components/Button';
import CommonLayout from '@src/layouts/Common.Layout';
import { APP_INFO } from '@src/utils/constants';
import { motion } from "framer-motion";
import Wave from "react-wavify";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


export const OurStory = () => {
    const steps = [
        {
            title: "Built By Students, For Students",
            waveStyle: { height: "40%", marginTop: 110 },
        },
        {
            title: "Verified Listings",
            waveStyle: { height: "100%", marginTop: 80 },
        },
        {
            title: "Smart Roommate + Property Matching",
            waveStyle: { height: "100%", marginTop: 30 },
        },
        {
            title: "Institutional Partnerships",
            waveStyle: { height: "110%", marginTop: 0 },
        },
    ];

    const clients = [
        "campus_living_center.png",
        "keilty.png",
        "eye.png",
        "clv.png",
        "peartree.png",
        "paramount.png",
    ]

    return (
        <CommonLayout>
            {/* Banner */}
            <div className={` md:bg-[url('/assets/img/backgrounds/our-story-banner.png')] 
                                 bg-[url('/assets/img/backgrounds/our-story-banner.png')] 
                bg-center bg-cover h-[120vh]  w-full 
                text-white text-center px-5
                `}>

                <h1 className='text-3xl md:text-6xl font-bold pt-20 drop-shadow-lg'>
                    The Student Housing <br className='hidden md:inline' />
                    Revolution Is Now.
                </h1>
                <p className='text-lg md:text-xl mt-4 drop-shadow-lg'>
                    We Power The Future.  Affordability.  <br className='hidden md:inline' />
                    Transparency. Safety</p>
            </div>

            {/* Platform Details */}

            <div className="bg-gradient-to-b from-[#B3322F] to-[#4D1614] p-6 pt-15 text-center text-white w-full ">
                {/*  info*/}
                <p className='italic text-xl  md:text-3xl leading-relaxed font-semibold'>
                    “We Started Because We Saw A Problem. Students Couldn't Find <br className='hidden md:inline' />
                    Housing, And Landlords Couldn't Find Qualified Renters. <br className='hidden md:inline' />
                    We Saw An Opportunity To Change This.”

                </p>

                <p className='font-semibold mt-8'> Aidan Fitzmaurice</p>
                <h1 className='font-light -mt-1'>Founder - University of Ottawa Student</h1>


                {/*  Steps*/}
                <div className="py-20">
                    {steps.map((step, index) => (
                        <StepCard
                            key={index}
                            title={step.title}
                            waveStyle={step.waveStyle}
                            delay={index * 0.2}
                        />
                    ))}
                </div>
            </div>


            {/* VedioComponent */}
            <VedioComponent />

            {/* NextroomComparison */}
            <NextroomComparison />

            {/* slider */}
            <img
                src="/assets/img/team/nextroom-team.svg"
                className=" "
                alt="avatar"
            />
            {/* slider */}
            <FlowSlider />

            {/*   */}
            <div className='bg-[#B3322F]  pt-10 flex-col gap-5 flex md:hidden'>
                <h1 className='text-white text-3xl font-bold text-center'>We’re Trusted By</h1>

                <Swiper
                    spaceBetween={10}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 8 },
                    }}
                    // navigation
                    pagination={{ clickable: true }}
                    // modules={[Navigation]}
                    className="mySwiper"
                >
                    {clients.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img src={`/assets/img/logo/client/${img}`} className=' w-20  bg-red-100 ' />

                        </SwiperSlide>
                    ))}
                </Swiper>
                <img src="/assets/img/images/support-trusted-banner-boy.png" className='  w-150 ' />

            </div>

            {/*   */}
            <div className='bg-[#4D1614] px-10 py-10 flex-col gap-5 flex md:hidden mb-3'>
                <h1 className='text-white text-3xl font-bold text-center'>But We’re Just Getting Sarted</h1>
                <Button className='bg-black text-white rounded-full w-full py-3'>Join The Revolution</Button>
            </div>

            {/*Buttons  */}
            <div className='bg-[#4D1614] px-10 py-10 flex-col gap-5 flex md:hidden'>
                <Button className='bg-black text-white rounded-full w-full py-3'>Find Your Next Home</Button>
                <Button className='bg-black text-white rounded-full w-full py-3'>List Your Property</Button>
                <Button className='bg-black text-white rounded-full w-full py-3'>Partner With Us</Button>
            </div>
        </CommonLayout>
    )
}


function StepCard({ title, waveStyle, delay }) {
    return (
        <motion.div
            className="flex gap-6 flex-col md:flex-row items-center justify-center mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
        >
            {/* Circle with Wave + Check */}
            <div className="w-60">
                <div className="rotate-180 bg-white h-40 w-40 rounded-full overflow-hidden mx-auto relative shadow-lg">
                    <Wave
                        fill="#57AF4F"
                        paused={false}
                        style={waveStyle}
                        options={{
                            height: 2,
                            amplitude: 20,
                            speed: 0.2,
                            points: 2,
                        }}
                    />
                    <p className="absolute top-1/2 rotate-180 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl drop-shadow-lg  ">
                        ✓
                    </p>
                </div>
            </div>

            {/* Text */}
            <div className="text-xl md:text-3xl font-bold text-white md:text-left  text-center md:w-150 px-5 md:px-0">
                {title}
            </div>
        </motion.div>
    );
}

export const FlowSlider = () => {
    return (
        <>
            <div className="w-full md:px-15 px-5 py-20">
                <Swiper
                    spaceBetween={40}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {[1, 2, 3, 4, 5].map((feature, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className=" rounded-xl overflow-hidden bg-[#6D0813]"

                            >
                                {/* Overlay */}
                                <div className="p-5 flex flex-col justify-end text-white  ">
                                    <div className=" flex flex-col items-center gap-3 mb-2">
                                        <div className="p-5 rounded-full">
                                            <img
                                                src="/assets/img/team/aiden_headshot.svg"
                                                className="w-50 rounded-full mr-2"
                                                alt="avatar"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p className='font-semibold'> Aidan Fitzmaurice</p>
                                            <h1 className='font-light -mt-1'>Founder - University of Ottawa Student</h1>

                                            <p className='font-semibold mt-8'> Lorem ipsum dolor sit amet,
                                                consectetuer adipiscing elit. Aenean
                                                Lorem ipsum dolor sit amet, consectetuer  </p>
                                            <p className='font-semibold mt-8'> Why I Love Working at Next Room</p>

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

export const NextroomComparison = () => {
    const otherSystems = [
        "Unverified marketplace listings",
        "Unfair rent and hidden fees",
        "Landlords ghosting students",
        "No way to compare options",
        "No support",
        "No student community",
        "Fake or no reviews",
        "You’re on your own",
    ];

    const nextRoom = [
        "Verified listings you can trust",
        "Transparent pricing, always",
        "Messaging + landlord response tracking",
        "View listings across properties",
        "Real people, fast responses",
        "Roommate or property matching + partnerships",
        "Reviews from real students",
        "Someone finally gets it",
    ]
    return (
        <div className='px-5 md:px-15 py-15'>
            <h1 className='text-3xl md:text-6xl font-bold  text-center text-[#B3322F] drop-shadow-lg mb-15 px-15'>
                The Revolution We’re Creating
            </h1>

            <div className='hidden md:flex gap-5'>
                <div className='bg-[#A8021A] py-10 pb-15 px-10 w-1/2 font-semibold rounded-2xl text-white'>
                    <h1 className='text-5xl font-bold  text-center  mt-3'>Old Systems</h1>
                    <div className='flex flex-col gap-4 mt-10'>
                        {otherSystems.map(i =>
                            <div className='flex items-center'>
                                <XMarkIcon className='text-white w-7 bg-[#B3322F] text-xl p-1 rounded-full mr-3' /> {i}
                            </div>
                        )}
                    </div>
                </div>
                <div className='bg-[#A8021A] py-10 pb-15 px-10 w-1/2 font-semibold rounded-2xl text-white'>

                    <img
                        src={APP_INFO.PRIMARY_LOGO_WHITE}
                        className="w-90  mx-auto -mt-5"
                        alt="avatar"
                    />

                    <div className='flex flex-col gap-4'>
                        {nextRoom.map(i =>
                            <div className='flex items-center'>
                                <CheckIcon className='text-white w-7 bg-[#57AF4F] text-xl p-1 rounded-full mr-3' /> {i}
                            </div>
                        )}
                    </div>

                </div>


            </div>
            {/* Responsive */}
            <div className='flex mt-10 md:hidden flex-col gap-5'>
                <div className='bg-[#A8021A] py-10 pb-15 px-10 w-full font-semibold rounded-2xl text-white'>
                    <h1 className='text-3xl font-bold  text-center  mt-3 mb-8'>Old Systems</h1>
                    {/* <div className='flex flex-col gap-4 mt-10'>
                        {otherSystems.map(i =>
                            <div className='flex flex-col items-center'>
                                <XMarkIcon className='text-white w-7 bg-[#B3322F] text-xl p-1 rounded-full mr-3' /> {i}
                            </div>
                        )}
                    </div> */}
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 2 },
                        }}
                        // navigation
                        pagination={{ clickable: true }}
                        // modules={[Navigation]}
                        className="mySwiper"
                    >
                        {nextRoom.map((i, index) => (
                            <SwiperSlide key={index}>
                                <div className=' '>
                                    <div className='flex flex-col items-center justify-center textt-center'>
                                        <XMarkIcon className='text-white w-7 bg-[#B3322F] text-xl p-1 rounded-full mr-3' />
                                    </div>
                                    <div className='text-center mt-5'>
                                        {i}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
                <div className='bg-[#A8021A] py-10   px-10 w-full font-semibold rounded-2xl text-white'>

                    <img
                        src={APP_INFO.PRIMARY_LOGO_WHITE}
                        className="w-90  mx-auto -mt-5"
                        alt="avatar"
                    />

                    {/* <div className='flex flex-col gap-4'>
                        {nextRoom.map(i =>
                            <div className='flex flex-col items-center'>
                                <CheckIcon className='text-white w-7 bg-[#57AF4F] text-xl p-1 rounded-full mr-3' /> {i}
                            </div>
                        )}
                    </div> */}
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 2 },
                        }}
                        // navigation
                        pagination={{ clickable: true }}
                        // modules={[Navigation]}
                        className="mySwiper"
                    >
                        {nextRoom.map((i, index) => (
                            <SwiperSlide key={index}>
                                <div className=' '>
                                    <div className='flex flex-col items-center justify-center textt-center'>
                                        <CheckIcon className='text-white w-7 bg-[#57AF4F] text-xl p-1 rounded-full' />
                                    </div>
                                    <div className='text-center mt-5'>
                                        {i}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>


            </div>

        </div>
    )
}



export const VedioComponent = () => {
    return (<div className='px-5 md:px-20 py-10 text-center'>

        {/* Vedio */}
        <div className="relative rounded-xl z-20 overflow-hidden w-full my-10 ">
            <video
                src="https://v.ftcdn.net/04/59/59/49/700_F_459594974_4I9zM2soy7Pe8GmT7vdreiFmugErs6h7_ST.mp4"
                controls
                className="w-screen md:h-[90vh] h-[30vh] object-cover shadow-none rounded-2xl transition-all duration-700 ease-in-out"
            // onPlay={handlePlay}
            // onPause={handlePause}
            />
        </div>
        <p className='italic text-xl text-[#B3322F] md:text-3xl leading-relaxed font-semibold xl:w-[60%] lg:w-[70%] md:w-[80%] w-full mx-auto'>
            “We Started Because We Saw A Problem. Students Couldn't Find
            Housing, And Landlords Couldn't Find Qualified Renters”
        </p>
        {/* Vedio */}
        <div className="relative rounded-xl z-20 overflow-hidden w-full my-10 ">
            <video
                src="https://v.ftcdn.net/04/59/59/49/700_F_459594974_4I9zM2soy7Pe8GmT7vdreiFmugErs6h7_ST.mp4"
                controls
                className="w-screen md:h-[90vh] h-[30vh] object-cover shadow-none rounded-2xl transition-all duration-700 ease-in-out"
            // onPlay={handlePlay}
            // onPause={handlePause}
            />
        </div>
        <p className='italic text-xl text-[#B3322F] md:text-3xl leading-relaxed font-semibold xl:w-[60%] lg:w-[70%] md:w-[80%] w-full mx-auto'>
            “We Started Because We Saw A Problem. Students Couldn't Find
            Housing, And Landlords Couldn't Find Qualified Renters”
        </p>

    </div>)
}