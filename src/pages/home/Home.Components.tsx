// import BannerPage from "./components/BannerPage";
import { GiftBar } from "./components/GiftBar";
import { LoginAndSignup } from "./components/LoginAndSignup";
import { WhyJoinNextRoom } from "./components/WhyJoinNextRoom";

export const HomeComponent: React.FC<{
  showLoginForm: boolean,
  setShowLoginForm: (value: boolean) => void
}> = ({ showLoginForm, setShowLoginForm }) => {
  return (
    <>
      <div>
        <div
          className=" 
      flex md:justify-end md:items-center items-start justify-center text-center md:text-left
      h-[130vh] md:h-[150vh]  bg-cover bg-bottom  md:bg-center bg-[url(/assets/img/backgrounds/backgrounds_1_2.png)] md:bg-[url(/assets/img/backgrounds/backgrounds_1.png)]"
        >
          <div className="md:w-[50%] md:pl-20 w-[90%] pt-40 md:pt-10">
            {/* Heading */}
            <h2 className="text-2xl  md:text-6xl font-bold text-white  text-center mb-4 px-10 ">
              Better
              <br className="hidden md:inline" /> Student
              <br className=" " /> Housing
              <br className="hidden md:inline" /> Starts Here.
            </h2>
            {/* Description */}
            <div className="text-white text-lg md:text-xl md:mt-15 md:leading-relaxed w-full mx-auto lg:mx-0 mb-4 relative ">

              {/* <IconComponent name="chevron_double_down" className="w-25 mx-auto font-bold" /> */}
              <img
                alt="NextRoom Logo"
                src="/assets/gif/downarrow.gif"
                className="h-20 md:h-30 w-auto mx-auto"
              />
              <p className="font-bold text-2xl md:text-3xl text-center w-full absolute md:top-8 top-4 text-white" style={{ textShadow: ` 0 0 5px #ff1a1a, 0 0 10px #ff1a1a, 0 0 20px #ff1a1a, 0 0 40px #ff1a1a `, }} > Join the movement below. </p>
            </div>


          </div>
        </div>

        <div className="text-center z-100 bg-transparent sticky top-[95%] ">
          <button
            onClick={() => {
              const element = document.getElementById("loginAndSignupForm");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className=" bg-black text-white font-medium py-3 w-[320px]   md:w-[500px] mx-auto rounded-full shadow-md z-10  -top-3 relative -mt-10 transition-all duration-300 ease-in-out">
            Join The Student Housing Revolution
          </button>
        </div>
        {/* <BannerPage /> */}
        <GiftBar />
        <LoginAndSignup  {...{ showLoginForm, setShowLoginForm }} />
        <WhyJoinNextRoom />
      </div>
    </>
  );
};






