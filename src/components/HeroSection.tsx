import { APP_INFO } from "../utils/constants/app-info.constant";
import { FlowSlider } from "./FlowSlider";
// `${APP_INFO.IMG_BASE_URL}/groups/Byward_Market/4.png`

interface HeroSectionProps {
  // showModalHandler: (name: string, value: boolean) => void;
}
export const HeroSection: React.FC<HeroSectionProps> = ({}) => {
  return (
    <>
      {/* Automated Housing Searches */}
      <div
        className="
      flex md:justify-end md:items-center items-start justify-center text-center md:text-left
      h-[120vh] md:h-[100vh]  bg-cover bg-bottom  md:bg-center bg-[url(public/assets/img/backgrounds/backgrounds_1_2.png)] md:bg-[url(public/assets/img/backgrounds/backgrounds_1.png)]"
      >
        <div className="md:w-[50%] md:pl-20 w-[90%] pt-10">
          {/* Heading */}
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-4">
            The student
            <br className="hidden md:inline" /> housing
            <br className="hidden md:inline" /> revolution
            <br className="hidden md:inline" /> is now.
          </h2>
          {/* Description */}
          <p className="text-white text-lg md:text-xl md:mt-5 md:leading-relaxed max-w-xl mx-auto lg:mx-0 mb-4">
            Student housing was broken.
            <br />
            <span className="font-extrabold italic"> So we rewrote it.</span>
          </p>

          <button className="bg-[#000000] text-white font-medium px-8 py-3 rounded-full shadow-md">
            Get Started— <span className="font-extrabold">It’s Free</span>
          </button>
        </div>
      </div>

      {/* Automated Sublets */}
      <div
        className=" 
       bg-cover bg-top  md:bg-top bg-[url(public/assets/img/backgrounds/backgrounds_2_2.png)] md:bg-[url(public/assets/img/backgrounds/backgrounds_2.png)]"
      >
        <div className="text-center">
          <button className="bg-[#B3322F] text-white font-medium py-3 w-[347px] md:w-[500px] mx-auto rounded-full shadow-md relative -top-6">
            Start Your Housing Search
          </button>
        </div>

        <h1
          className="text-center text-2xl md:text-6xl text-white relative md:top-20 top-5 w-[70%] md:w-[100%]  mx-auto"
          style={{ textShadow: "0px 1px 1px #000000" }}
        >
          You’re Going to Love Next Room
        </h1>
        <div
          className="
      h-[70vh] md:h-[100vh] flex md:justify-start md:items-center items-start justify-center text-center md:text-left"
        >
          <div className="md:w-[50%] md:pl-20 w-[90%] pt-10">
            {/* Heading */}
            <h2
              className="text-3xl md:text-6xl font-bold text-white mb-4 md:mt-10"
              style={{ textShadow: "0px 1px 1px #000000" }}
            >
              Flexible Leases,
              <br /> For Big Moves
            </h2>
            {/* Description */}
            <p className="text-white text-lg md:text-2xl md:leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6">
              Automated Sublets
            </p>
          </div>
        </div>
      </div>

      {/* Automated Housing Searches */}
      <div
        className="
      flex md:justify-end md:items-center items-start justify-center text-center md:text-left
      h-[100vh] md:h-[100vh]  bg-cover bg-center  md:bg-center bg-[url(public/assets/img/backgrounds/backgrounds_3_2.png)] md:bg-[url(public/assets/img/backgrounds/backgrounds_3.png)]"
      >
        <div className="md:w-[50%] md:pl-20 w-[90%] pt-10">
          {/* Heading */}
          <h2
            className="text-3xl md:text-6xl font-bold text-black mb-4"
            style={{ textShadow: "0px 1px 1px #000000" }}
          >
            Student Housing
            <br /> Doesn’t Need
            <br /> To Suck
          </h2>
          {/* Description */}
          <p className="text-black text-lg md:text-3xl md:leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6">
            Automated Housing Searches{" "}
          </p>
        </div>
      </div>

      {/* AI Matching */}
      <div
        className="
      flex md:justify-start md:items-center items-start justify-center text-center md:text-left
      h-[80vh] md:h-[100vh]  bg-cover bg-center  md:bg-top bg-[url(public/assets/img/backgrounds/backgrounds_4_2.png)] md:bg-[url(public/assets/img/backgrounds/backgrounds_4.png)]"
      >
        <div className="md:w-[50%] md:pl-20 w-[90%] pt-10">
          {/* Heading */}
          <h2
            className="text-3xl md:text-6xl font-bold text-white mb-4"
            style={{ textShadow: "0px 1px 1px #000000" }}
          >
            Goodbye
            <br /> Bad Roommates
          </h2>
          {/* Description */}
          <p className="text-white text-lg md:text-3xl md:leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6">
            AI Matching
          </p>
        </div>
      </div>

      {/* Book Property */}
      <div
        className="
      flex md:justify-end md:items-center items-start justify-center text-center md:text-left
      h-[70vh] md:h-[100vh]  bg-cover bg-center  md:bg-top bg-[url(public/assets/img/backgrounds/backgrounds_5_2.png)] md:bg-[url(public/assets/img/backgrounds/backgrounds_5.png)]"
      >
        <div className="md:w-[50%] md:pl-20 w-[90%] pt-10">
          {/* Heading */}
          <h2
            className="text-3xl md:text-7xl font-bold text-black mb-4"
            style={{ textShadow: "0px 2px 2px #000000" }}
          >
            Book Property
            <br /> Tours
          </h2>
          {/* Description */}
          <p className="text-black text-lg md:text-3xl md:leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6">
            Everything—Connected..
          </p>
        </div>
      </div>
      {/* Vedio */}
      <div className="text-center">
        <h1 className="text-2xl w-[80%] mx-auto text-center font-bold mt-5">
          Demo
        </h1>

        <h1 className="text-[#B3322F] text-3xl md:text-5xl w-[80%] mx-auto text-center font-bold mb-10">
          Experience Next Room For Yourself
        </h1>
        <button className="bg-[#000000] text-white font-medium px-15 md:px-15 py-3 rounded-full mx-auto mb-10 shadow-sm shadow-black">
          Try It Now
        </button>
        {/* Vedio player */}
        <div className="relative rounded-xl overflow-hidden w-full my-10 md:px-10 px-4 rounded-full">
          <video
            src="https://v.ftcdn.net/04/59/59/49/700_F_459594974_4I9zM2soy7Pe8GmT7vdreiFmugErs6h7_ST.mp4"
            controls
            className="w-screen md:h-[100vh] h-[50vh] object-cover   shadow-none rounded-4xl"
            />

          {/* Overlay Content */}
        </div>
      </div>

      {/* How Next Room Works */}
      <div className="text-center">
        <h1 className="text-[#B3322F] text-3xl md:text-5xl w-[80%] mx-auto text-center font-bold mb-10">
          How Next Room Works
        </h1>

        <FlowSlider />
      </div>
      {/* Scam-Free Stress Free */}
      <div
        className="
      flex md:justify-end md:items-center items-start justify-center text-center md:text-left
      h-[100vh] md:h-[120vh] w-full bg-cover bg-center bg-[url(public/assets/img/backgrounds/backgrounds_6_2.png)] md:bg-[url(public/assets/img/backgrounds/backgrounds_6.png)]"
      >
        <div className="md:w-[50%] md:pl-20 w-[90%] pt-5">
          {/* Heading */}
          <h2 className="text-3xl md:text-6xl font-bold text-white md:mb-4 mb-2">
            Scam-Free,
            <br /> Stress-Free.
          </h2>
          {/* Description */}
          <p className="text-white text-sm md:text-xl md:leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6 ">
            NextRoom offers a safer alternative to platforms like Facebook
            Marketplace, where scams and unverified listings are common. Every
            landlord on our site is screened, and all listings are verified for
            accuracy and legitimacy. Plus, only students can join, creating a
            trusted, secure space tailored just for student housing.
          </p>

          {/* Call to Action */}
          <div>
            <button className="bg-[#B3322F] text-white font-medium px-22 py-3 rounded-full shadow-md">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Why I build Next Room Section */}
      <div
        className="py-20 bg-cover  text-center px-10 md:px-0"
        style={{
          backgroundImage: `url(${APP_INFO.IMG_BASE_URL}/backgrounds/backgrounds_7.png)`, // update path as needed
        }}
      >
        <h2 className="text-2xl md:text-4xl font-bold md:font-extrabold text-red-700 mb-6 ">
          Why I Built Next Room
        </h2>
        <p className="text-gray-700 max-w-3xl  mx-auto md:text-lg text-md leading-relaxed mb-6">
          Annoyed by lengthy leases, scams, and dead-end housing searches, I
          built Next Room with one thing in mind—<strong>connectivity</strong>.
          Like building a real home, the walls, the roof, the foundation—they
          all matter. At Next Room, every piece—housing, roommates, sublets,
          support—fits together to give students a platform that actually works.
        </p>
        <p className="text-gray-800 max-w-3xl mx-auto md:text-lg text-md leading-relaxed mb-8">
          We’re the platform that should have existed years ago—now, we’re
          building the future of student housing by removing uncertainty and
          leading the student housing revolution. <br />
          <span className="italic">
            To me, student housing matters; I love what I do.
          </span>
        </p>
        <div className="text-black font-semibold text-lg">
          Aidan Fitzmaurice
        </div>
        <div className="text-gray-600 text-sm">Founder</div>
        <div className="text-gray-600 text-sm">
          University of Ottawa Student
        </div>
      </div>
    </>
  );
};
