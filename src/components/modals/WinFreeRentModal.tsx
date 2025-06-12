import { APP_INFO } from "../../utils/constants";


const WinFreeRentModal: React.FC<{
  nextStepHandler: () => void;
  daysLeft: string
}> = ({ nextStepHandler, daysLeft }) => {
  console.log(daysLeft)
  return (
    <div className="fixed inset-0   flex items-center justify-center bg-black/50 px-4" style={{ zIndex: '99' }}>
      <div className=" flex gap-5 flex-col bg-[url(assets/img/backgrounds/win_free_rent_bg.png)] text-white bg-cover bg-center rounded-5xl md:rounded-2xl text-center md:w-150 md:h-150 h-100 w-100 pt-5"
      >
        <div className="flex justify-center items-center gap-1 text-black md:mt-10 mt-6">
          <span className="bg-black text-white font-bold md:text-4xl w-7 h-7 md:w-11 md:h-11 flex items-center justify-center rounded-md pb-1">{daysLeft[0] || 0}</span>
          <span className="bg-black text-white font-bold md:text-4xl w-7 h-7 md:w-11 md:h-11 flex items-center justify-center rounded-md pb-1">{daysLeft[1] || 0}</span>
          <span className="text-black md:text-2xl font-extrabold md:leading-6 leading-4 -mt-1">DAYS <br />LEFT</span>
        </div>
        {/* <h2 className="md:text-5xl text-4xl font-bold">ONE LAST STEP</h2> */}

        <img
          src={`${APP_INFO.IMG_BASE_URL}/icons/win_free_rent_summer_logo_mobile.svg`}
          className=" md:w-70 w-40 mx-auto "
          alt="Overlay circle"
        />

        <button className="bg-white text-[#B00000] md:w-60 w-30 mx-auto font-semibold py-2 md:px-12 px-4 rounded-full md:text-xl hover:bg-black hover:text-white cursor-pointer" onClick={nextStepHandler}>
          Enter Now
        </button>


      </div>

    </div>

  );
};

export default WinFreeRentModal;
