import { Swiper, SwiperSlide } from 'swiper/react'
import SignupOrLoginModal from '../../components/modals/SignupOrLoginModal'
import SearchPropertyLayout from '../../layouts/SearchProperty.Layout'
import { Navigation, Pagination } from 'swiper/modules'
import { APP_INFO } from '../../utils/constants'
import useAuth from '../../custom-hooks/useAuth'

const NewsRoom = () => {
  const { isLoggedIn } = useAuth();
  return (
    <SearchPropertyLayout>
      {!isLoggedIn && <SignupOrLoginModal text="Read Full Article" />}


      <div className='py-15 md:mx-15 '>
        <div className='mx-4'>
          {/* title */}
          <h2 className="text-xl font-bold text-[#B3322F] mb-3 flex md:ml-2 justify-center md:justify-start">
            <img
              src="/assets/img/icons/newsroom.svg"
              alt="Like"
              className="h-12 mr-2  -mt-2"
            />
            Newsroom
          </h2>

          <h2 className="text-xl  font-bold text-[#B3322F] mb-3 mt-6 md:ml-2 md:text-left text-center">
            What’s New
          </h2>
        </div>
        {/* Slider */}

        <div className=' mx-5   bg-white shadow-xl rounded-2xl    my-4'>
          <FlowSliderComponent />
        </div>
        {/* Info  */}

        <ReadMoreComponent />
      </div>


    </SearchPropertyLayout>
  )
}

export default NewsRoom




const slidersList = [
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

export const FlowSliderComponent = () => {
  return (
    <>
      <div className="w-full py-5">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="mySwiper1"
        >
          {slidersList.map((feature, index) => (
            <SwiperSlide key={index}>

              <div

                className={`z-10 md:flex  overflow-hidden relative mx-10`}
              >


                {/* Image section */}
                <div className="relative w-full md:w-2/4">
                  <img
                    src={`${APP_INFO.IMG_BASE_URL}images/${feature.image}`}
                    alt={"title"}
                    className="w-full h-[250px] object-cover rounded-2xl"
                  />

                </div>

                {/* Content section */}
                <div className="w-full md:w-1/2 md:pl-6 md:mt-0 mt-6 flex flex-col justify-top">


                  {/* Details */}
                  <div className="mt-5 space-y-1 md:text-md text-md">
                    <p className='text-[#B3322F] font-bold text-xl'>Site Updates Now Live!</p>
                    <p className='font-semibold '>September 1, 2025</p>
                    <p className='md:text-xs text-md mt-4'>NextRoom is now better than ever, with
                      new tools and student-focused features
                      that make it easier to find trusted rentals
                      near Ottawa campuses while you study.</p>

                    <div className='md:text-left text-center'>
                      <button
                        className='bg-[#B3322F]  mt-4 text-white text-sm md:px-15 px-20 py-3 rounded-full cursor-pointer mx-auto'>Read More</button>
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

const ReadMoreComponent = () => {
  return (
    <div className='mx-5   bg-white shadow-xl rounded-2xl px-5 py-4'>
      <h1 className='text-[#B3322F] text-2xl font-bold'>Site Updates Now Live!</h1>
      <p className='font-semibold'> <span className='mr-3 '>September 1, 2025</span> Written By Aidan Fitzmaurice — Founder</p>

      <div className='py-10'>
        Finding the right place to live while studying in Ottawa just got easier. NextRoom, the go-to platform for student rentals, has introduced a fresh update packed with features designed specifically for students navigating the rental market.
        <br /> <br />
        With school-specific search filters, updated neighbourhood maps, and verified listings near major campuses like uOttawa, Carleton, and Algonquin, NextRoom takes the guesswork out of finding a student-friendly rental. Whether you’re new to the city or moving into a new semester, the platform helps match your lifestyle, budget, and location needs.
        <br /> <br />
        The new update also includes practical guides on student leasing, insights into average rental prices, and a simplified application process—saving you time and stress so you can focus on what really matters: your education.
        <br /> <br />
        Whether you're looking for a cozy studio, shared housing, or an affordable place near transit, NextRoom is here to help make your Ottawa rental search simple, safe, and student-smart.
      </div>

      <img
        src="/assets/img/images/newsroom-banner.png"
        alt="Like"
        className=" w-full  "
      />
      <div className='text-center'>

        <button className="bg-[#B3322F] text-sm mt-6 py-2 px-10 rounded-full mx-auto  w-fit font-semibold text-white"   >
          Close
        </button>
      </div>
    </div>
  )
}