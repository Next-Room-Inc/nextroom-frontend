import { ArrowRightIcon, ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import SearchPropertyLayout from "../../layouts/SearchProperty.Layout"
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { APP_INFO } from "../../utils/constants";
import { motion } from 'framer-motion';


const Blogs = () => {
  const [search, setSearch] = useState('');

  return (
    <SearchPropertyLayout>


      <div className='py-15 md:mx-15'>
        <div className='mx-4'>
          {/* title */}
          <h2 className="text-xl font-bold text-[#B3322F] mb-3 flex md:ml-2 justify-center md:justify-start">
            <img
              src="/assets/img/icons/blogs_icon.svg"
              alt="Like"
              className="h-12 mr-2  -mt-2"
            />
            Blog
          </h2>

          <h2 className="text-xl font-bold text-[#B3322F] mb-3 mt-5 md:ml-2 md:text-left text-center">
            Recent Repairs
          </h2>

          {/* Blogs Slider */}
          <div className='  md:mx-5 mx-1   bg-white shadow-xl rounded-2xl py-5 px-3   my-15'>
            <BlogSliderComponent />
          </div>
          {/* SearchBar */}
          <div className='md:mx-5 shadow-[#D9D9D9] mb-3  pl-4 pr-8 py-2 mx-auto rounded-full drop-shadow-md shadow-md bg-white mt-5 flex items-center  justify-center gap-3'>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder='Search property Repairs'
              className=' focus:outline-none  w-full px-2 py-2'
            />
            {/* <img alt="" className="h-8 mt-1" src="assets/img/icons/google_logo.svg" /> */}
            <MagnifyingGlassIcon className="h-8 text-[#B3322F] mt-1" />
          </div>

          {/* Blogs Slider */}
          <div className='  md:mx-5 mx-1   bg-white shadow-xl rounded-2xl py-5 md:px-3 px-1    my-15'>
            <BlogSliderComponent />
          </div>


          <div className='  mx-1 md:mx-5   bg-white shadow-xl rounded-2xl mb-15 py-5 px-4 md:px-10'>
            <p className='text-[#B3322F] font-bold text-xl text-center'>Site Updates Now Live!</p>
            <p className='font-semibold text-sm px-4 mb-3 text-center'>September 1, 2025</p>
            {/* Vedio */}
            <div className="relative rounded-xl z-20 overflow-hidden w-full my-10 "  >

              <video
                src="https://v.ftcdn.net/04/59/59/49/700_F_459594974_4I9zM2soy7Pe8GmT7vdreiFmugErs6h7_ST.mp4"
                controls
                className="w-screen md:h-[90vh] h-[30vh] object-cover shadow-none rounded-4xl transition-all duration-700 ease-in-out"
              // onPlay={handlePlay}
              // onPause={handlePause}

              />
            </div>
            <p className='text-[#B3322F] font-bold text-md px-4 flex -ml-4'>View Full Transcript <ChevronDownIcon className="h-6 mt-0.5" /></p>
            <p>
              Finding the right place to live while studying in Ottawa just got easier. NextRoom, the go-to platform for student rentals, has introduced a fresh update packed with features designed specifically for students navigating the rental market.

            </p>
            <div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={` bg-[#B3322F] mb-5 mt-5 px-20 mx-auto text-center py-2 text-white rounded-full flex justify-center items-center`}
              >

                Close
              </motion.button>
            </div>
          </div>


          {/* Blogs Slider */}
          <h2 className="text-xl pl-3 font-bold text-[#B3322F] mb-3 mt-5 md:ml-2 md:text-left text-center">
            Section Header
          </h2>
          <div className='  mx-1 md:mx-5   bg-white shadow-xl rounded-2xl mb-15 py-5'>
            <p className='text-[#B3322F] font-bold text-xl px-4'>Site Updates Now Live!</p>
            <p className='font-semibold text-sm px-4 mb-3'>September 1, 2025</p>
            {/* Vedio */}
            <div className="relative rounded-xl z-20 overflow-hidden w-full my-10 md:px-10 px-4"  >

              <video
                src="https://v.ftcdn.net/04/59/59/49/700_F_459594974_4I9zM2soy7Pe8GmT7vdreiFmugErs6h7_ST.mp4"
                controls
                className="w-screen md:h-[90vh] h-[30vh] object-cover shadow-none rounded-4xl transition-all duration-700 ease-in-out"
              // onPlay={handlePlay}
              // onPause={handlePause}

              />
            </div>
            <div className="py-5 px-3 ">

              <BlogSliderComponent />
            </div>
          </div>


          <div className="bg-[#C32026] py-15 md:text-6xl text-3xl font-bold text-white text-center z-50 w-screen  md:-ml-[76px] -ml-[15px]">
            Find Your Next Home
          </div>

          {/* Button */}
          <div className="  sticky bottom-4 z-30 -mt-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={` bg-black hover:bg-[#B3322F]' lg:w-[40%]  md:w-[50%]  px-20 mx-auto text-center py-2 text-white rounded-full flex justify-center items-center`}
            >

              Sign-Up Or Login <ArrowRightIcon className="h-4 mt-1 ml-2" />
            </motion.button>
          </div>


        </div>
        {/* Cards */}
      </div>


    </SearchPropertyLayout>
  )
}

export default Blogs


const blogsList = [
  {
    image: `slider_1.png`,
    title: "What’s Driving Ottawa’s Rising Rental Prices in 2025?",
    date: "September 1, 2025",
    trending: true,
  },
  {
    title: "What’s Driving Ottawa’s Rising Rental Prices in 2025?",
    date: "September 1, 2025",
    trending: true,
    image: `slider_2.png`,
  },
  {
    title: "What’s Driving Ottawa’s Rising Rental Prices in 2025?",
    date: "September 1, 2025",
    trending: true,
    image: `slider_3.png`,
  },
  {
    title: "What’s Driving Ottawa’s Rising Rental Prices in 2025?",
    date: "September 1, 2025",
    trending: true,
    image: `slider_4.png`,
  },
];

export const BlogSliderComponent = () => {
  return (
    <>
      <div className="w-full 
      
      ">
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
          className="blogSlider"
        >
          {blogsList.map((item, index) => (
            <SwiperSlide key={index}>

              <div

                className={`z-10 overflow-hidden relative`}
              >


                {/* Image section */}
                <div className="relative w-full md:w-4/4">
                  <img
                    src={`${APP_INFO.IMG_BASE_URL}images/${item.image}`}
                    alt={"title"}
                    className="w-full md:h-[250px] h-[200px] object-cover rounded-xl md:rounded-4xl"
                  />

                </div>

                {/* Content section */}
                <div className="w-fullflex flex-col justify-top">


                  {/* Details */}
                  <div className="mt-5 space-y-1 md:text-md text-md">
                    <p className='  text-white'>
                      {item.trending && <span className="bg-[#B3322F] flex w-fit justify-center items-center rounded-sm px-4 text-xs py-0.5 ">

                        Trending
                        <img
                          src="/assets/img/icons/trending.svg"
                          alt="Like"
                          className="h-3 ml-1 "
                        />
                      </span>}
                    </p>
                    <p className='text-[#B3322F] font-bold text-xl'>Site Updates Now Live!</p>
                    <p className='font-semibold text-sm '>September 1, 2025</p>

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