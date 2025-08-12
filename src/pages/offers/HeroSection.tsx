// `${APP_INFO.IMG_BASE_URL}/groups/Byward_Market/4.png`

import { Button } from "../../components/Button";
import { APP_INFO } from "../../utils/constants";


interface HeroSectionProps {
  showModalHandler: (name: string, value: boolean) => void,
}
export const HeroSection: React.FC<HeroSectionProps> = ({ showModalHandler }) => {
  return (
    <div
      className="relative w-full h-[90vh] bg-cover bg-center flex items-center justify-start"
      style={{
        backgroundImage: `url(${APP_INFO.IMG_BASE_URL}/groups/Byward_Market/4.png)`, // update path as needed
      }}
    >
      {/* Oval Left Content */}
      <div className="lg:w-[50%] h-full bg-[#7b1f1c] rounded-r-full flex flex-col justify-center px-10 text-white">
        {/* Logos */}
        <div className="flex justify-between w-[95%] lg:w-[80%] xl:w-[60%] mb-10">
          <img src={`${APP_INFO.IMG_BASE_URL}/groups/Byward_Market/white-logo.png`} className="w-20" />
          <img src={`${APP_INFO.IMG_BASE_URL}/groups/1Eleven/white-logo.png`} className="w-20" />
          <img src={`${APP_INFO.IMG_BASE_URL}/groups/Theo/white-logo.png`} className="w-20" />
          {/* <span className="font-bold text-lg">ALMA</span>
        <span className="font-bold text-lg">one <sup>1</sup> Eleven</span>
        <span className="font-bold text-lg">THÉO</span> */}
        </div>

        {/* Text Content */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight">
          ENJOY A<br />
          <span className="text-3xl sm:text-5xl md:text-7xl font-bold block mt-2">
            RENT-FREE <br />SUMMER
          </span>
        </h2>
        <p className="text-2xl sm:text-4xl mt-3 mb-6">4 MONTHS FREE</p>

        {/* Button */}
        <Button onClick={() => showModalHandler("rentFree", true)} className="bg-white w-50 text-black px-6 py-3 rounded-md font-semibold shadow hover:bg-gray-200 transition">
          Learn More
        </Button>
      </div>

    </div>
  );
};
