import Wave from 'react-wavify'
import useAuth from '../../custom-hooks/useAuth'
import { APP_INFO } from '../../utils/constants'
import { CompaniesSlider } from './CompaniesSlider'
import { GiveAwaySlider } from './GiveAwaySlider'

const GiveAwayComponents = () => {
  const { handleSignupRedirect } = useAuth()
  const handleRedirect = (url: string) => {
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  };

  return (
    <>

      <div
        className="relative bg-[url(/assets/img/backgrounds/backpackanimation-mobile.gif)] md:bg-[url(/assets/img/backgrounds/backpackanimation.gif)] bg-cover bg-center 
             min-h-[550px] md:min-h-[750px] mt-30 md:mt-40  "
      >
        <div className="relative top-0 md:-mt-40 -ml-1">
          <img
            src={`${APP_INFO.IMG_BASE_URL}backgrounds/giveaway_background_1.png`}
            alt="Giveaway promotional background"
            className="-mb-1 w-full  min-h-100vh hidden md:flex "
            loading="lazy"
          />
          <img
            src={`${APP_INFO.IMG_BASE_URL}backgrounds/giveaway_background_1_mobile.png`}
            alt="Giveaway promotional background"
            className="-mb-1 w-full -mt-30 min-h-100vh flex md:hidden"
            loading="lazy"
          />
        </div>
      </div>

      {/* Companies Slider */}
      <CompaniesSlider />
      {/* div for sticky button */}
      <div className='text-center  pb-20'>
        {/* <button className='bg-black w-[250px] md:w-[500px] font-bold  mx-auto text-center py-3 text-white  rounded-full -mt-6 sticky top-0'>
        Enter Now - It’s Free
      </button> */}
        <div className="text-center z-100 bg-transparent sticky top-[97%] ">
          <button onClick={() => handleSignupRedirect()} className="hover:bg-red-800  bg-black text-white font-medium py-3 w-[250px] md:w-[500px] mx-auto rounded-full shadow-md z-10 -top-5 relative -mt-10 transition-all 200 ease-in-out">
            Enter Now - It’s Free
          </button>
        </div>

        {/* GiveAway Slider */}
        <h1 className='text-center text-2xl lg:text-4xl font-bold md:font-semibold mt-15 mb-10'>You Don't Want To Miss Out <br />On This Giveaway</h1>
        <GiveAwaySlider />
        {/* How to Enter */}

        <p className=' text-2xl md:text-3xl w-full mt-10 px-10 text-center mx-auto font-bold'>How To Enter </p>


        <WavyCircle {...{
          number: 1, options: {
            height: 120,
            amplitude: 10,
            speed: 0.5,
            points: 3
          }
        }} />

        <p className='text-2xl md:text-3xl text-[#B3322F]  w-full mt-10 px-10 text-center mx-auto font-bold'> Signup  On NextRoom.ca </p>
        <button className='hover:bg-red-800 transition-all 200 ease-in-out bg-black w-[250px]  font-bold mx-auto text-center py-3 text-white  rounded-full my-5' onClick={() => handleSignupRedirect()}>
          Sign Up Now
        </button>

        <WavyCircle {...{
          number: 2, options: {
            height: 60,
            amplitude: 10,
            speed: 0.5,
            points: 3
          }
        }} />

        <p className=' text-2xl md:text-3xl text-[#B3322F]  w-full mt-10 px-10 text-center mx-auto font-bold'> Follow Us On Social Media </p>
        <button className='hover:bg-red-800 transition-all duration-200 ease-in-out bg-black w-[250px] font-bold  mx-auto text-center py-3 text-white  rounded-full my-5' onClick={() => handleRedirect(APP_INFO.INSTAGRAM)}>
          Follow @nextroom_ca
        </button>

        <WavyCircle {...{
          number: 3, options: {
            height: 0,
            amplitude: 10,
            speed: 0.5,
            points: 3
          }
        }} />

        <p className=' text-2xl md:text-3xl text-[#B3322F]  w-full mt-10 px-10 text-center mx-auto font-bold'> Multiple Entries Allowed </p>
        <div className=' text-lg md:text-xl    w-full mt-10 px-10 text-center mx-auto font-semibold flex flex-col gap-4'>
          <p> Each comment and like = 1 bonus entry </p>
          <p> Tag your friends in the comments. Every tag = 1 entry  </p>
          <p>  Follow @nextroom_ca on Instagram = 2 bonus entries  </p>
          <p> Share post to your story (1 share every 24 hours) = 3 bonus entries </p>
        </div>
        <button className='hover:bg-red-800 transition-all duration-200 ease-in-out bg-black w-[250px] font-bold  mx-auto text-center py-3 text-white  rounded-full mt-15 mb-20' onClick={() => handleRedirect(APP_INFO.INSTAGRAM)}>
          Follow @nextroom_ca
        </button>

        {/* What is Next Room? Section */}
        <div
          className="  
      flex md:justify-end md:items-center items-start justify-center text-center md:text-left
      md:h-[800px]  h-[980px] w-full bg-cover md:bg-top bg-bottom bg-[url(/assets/img/backgrounds/giveaway_background_3_mobile.png)] md:bg-[url(/assets/img/backgrounds/giveaway_background_3.png)]"
        >
          <div className="md:w-[50%] md:pl-20 w-[80%] pt-5 mt-10">
            <h2 className="text-3xl md:text-5xl font-semibold text-white md:mb-4 mb-2">
              What is Next Room?
            </h2>
            <p className="text-white text-sm md:text-xl md:leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6 mt-8">
              Next Room was built to solve what student housing forgot. Tired of scam listings, mismatched roommates, and long leases that don’t fit student lives? So were we.
              <br />
              <br />
              The future of student housing is almost here. Soon, Next Room will allow you to swipe right on your next apartment and roommates. We're not just another listing site—it’s a platform where every part of the experience is designed for students: smart roommate matching, trusted sublets, verified properties, and real human support.
              <br />
              <br />

              It’s everything student housing should have been from the start. And it’s almost here—<span className='font-bold'>secure your spot now!</span>
            </p>


          </div>
        </div>
        {/* No Ghosting section */}
        <div className='text-center mt-20 mb-10 '>
          <p className=' text-3xl lg:text-4xl px-4'>Swipe Right on Your Next Student Apartment</p>
          <p className='italic text-2xl md:text-3xl lg:text-4xl font-bold '>No Ghosting - Guaranteed</p>
          <p className='text-[#C32026] text-3xl lg:text-4xl font-bold mb-12 mt-5'>COMING FALL 2025</p>
        </div>

        {/* Ready to enter section */}
        <p className='font-bold text-white bg-[#C32026] text-center text-3xl md:text-3xl lg:text-5xl py-15 mb-10'>
          Ready To Enter, And Win?
        </p>
      </div>
    </>
  )
}

export default GiveAwayComponents


interface WavyCircleProps {
  number: number | string;
  options: { height: number; amplitude: number; speed: number; points: number; };
}

const WavyCircle: React.FC<WavyCircleProps> = ({ number, options }) => {
  return (
    <div className="relative w-[200px] h-[200px] mx-auto mt-5 rounded-full border-2 border-[#A00001] overflow-hidden rotate-180 shadow-xl shadow-[#D9D9D9] bg-white">
      <Wave
        fill="#A00001"
        paused={false}
        className="w-full h-full"
        options={options}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-9xl text-white font-bold z-10 rotate-180 drop-shadow-[1px_5px_4px_#D9D9D9]">
          {number}
        </p>
      </div>
    </div>
  );
};