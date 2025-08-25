import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./ComponComponents";
import { ROUTES } from "@src/utils/constants";

const AdvertismentBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[450px] md:h-[210px] w-full bg-cover bg-center flex md:justify-end md:items-center bg-[url('/assets/img/search-property/bg_1_mobile.png')] md:bg-[url('/assets/img/search-property/bg_1.png')]">
      <div className="flex flex-col items-center md:items-start text-center md:text-left px-6 md:px-10 gap-4 md:mt-0 mt-5 w-full md:w-auto">
        <img
          src="/assets/img/search-property/zibi-logo.svg"
          alt="Zibi Logo"
          className="h-[40px] mx-auto"
        />
        <p className="text-xl md:text-2xl leading-snug">
          <strong>Student Housing</strong> – <br className="md:hidden" /> Just a
          Zip-Line Away.
        </p>
        <div className="flex justify-center w-[100%]">
          <PrimaryButton
            color="black"
            onClick={() => navigate(`${ROUTES.SEARCH_PROPERTY}/explore`)}
          >
            View Available Units
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default AdvertismentBanner;
