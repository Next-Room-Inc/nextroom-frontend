import { APP_INFO, STUDENT_IMAGES } from "../utils/constants/app-info.constant";

export const HeroSection = () => {
  return (
    <div
      className="  h-[80vh] text-white text-left bg-red-900 flex  pl-15 justify-center md:justify-start items-center relative"
      // style={{
      //   backgroundImage: `url(${APP_INFO.BACKGROUND_3})`,
      //   backgroundSize: 'cover',  // Ensures the image covers the entire container
      //   backgroundPosition: 'center',  // Centers the image
      // }}
    >
      <div className="text-left">
        <div className="sm:max-w-md" style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)" }}>
          <h1 className=" text-3xl md:text-6xl w-[90%] md:w-100 font-bold ">
            Your Search for Better{" "}
            <span className="text-red-400"> Student Housing </span> Ends Here —
          </h1>
          <h4 className="text-lg md:text-2xl mt-5  tracking-tight">
            <span className="text-red-400 font-bold">"Nextroom.ca"</span>,
            {APP_INFO.TAGLINE}
          </h4>
        </div>
      </div>
      {/* Right */}
      <img
        alt="Your Company"
        src={STUDENT_IMAGES.SQUARE_A_2}
        className="mx-auto h-40 w-auto hidden md:flex absolute right-20 top-10 rounded-2xl opacity-90 shadow-red-950 shadow-2xl"
      />
      <img
        alt="Your Company"
        src={STUDENT_IMAGES.SQUARE_A_3}
        className="mx-auto h-40 w-auto hidden lg:flex absolute right-65 top-20 rounded-2xl opacity-90 shadow-red-950 shadow-2xl"
      />
         {/* <img
        alt="Your Company"
        src={STUDENT_IMAGES.SQUARE_A_3}
        className="mx-auto h-40 w-auto hidden lg:flex absolute right-110 top-10 rounded-2xl opacity-90 shadow-red-950 shadow-2xl"
      />
        <img
        alt="Your Company"
        src={STUDENT_IMAGES.SQUARE_A_4}
        className="mx-auto h-40 w-auto hidden lg:flex absolute right-110 bottom-10 rounded-2xl opacity-90 shadow-red-950 shadow-2xl"
      /> */}
      
      <img
        alt="Your Company"
        src={STUDENT_IMAGES.SQUARE_A_4}
        className="mx-auto h-40 w-auto hidden lg:flex absolute right-65 bottom-30 rounded-2xl opacity-90 shadow-red-950 shadow-2xl"
      />

    
      <img
        alt="Your Company"
        src={STUDENT_IMAGES.SQUARE_A_5}
        className="mx-auto h-40 w-auto hidden md:flex absolute right-20 bottom-10 rounded-2xl opacity-90 shadow-red-950 shadow-2xl "
      />
    </div>
  );
};
