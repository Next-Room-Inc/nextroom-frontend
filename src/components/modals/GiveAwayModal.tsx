import { APP_INFO } from "../../utils/constants";

interface GiveAwayModalProps {
  handleNext: () => void;
}

const GiveAwayModal: React.FC<GiveAwayModalProps> = ({ handleNext }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-lg overflow-hidden max-w-3xl w-full flex flex-col md:flex-row shadow-2xl">
        <div
          className="relative w-full h-100 bg-cover bg-center flex items-center justify-start"
          style={{
            backgroundImage: `url(${APP_INFO.IMG_BASE_URL}/images/give-away-modal-bg.png)`, // update path as needed
          }}
        >
          {/* Oval Left Content */}
          <div></div>
          <div className="flex bg-red-800 h-[100%] flex-col justify-center items-center text-white p-8 md:w-1/2 w-full">
            {/* Curved top-right shape */}
            <div className="absolute top-0 right-0 w-32 h-32  rounded-bl-full" />

            <h3 className="text-md tracking-wider font-medium mb-2 z-10">
              WELCOME TO NEXTROOM
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 z-10">
              ENTER & WIN!
            </h2>
            <p className="text-sm pb-4 font-light">
              Our website is currently in development.
            </p>
            <p className="text-sm text-center font-light">
              In the meantime, you’re invited to explore our current offers and
              <span className="font-semibold ">
                {" "}
                enter our giveaway with tons of prizes to be won!
              </span>
            </p>

            <button
              onClick={handleNext}
              className="bg-white mt-6 text-black py-2 px-6 rounded-md font-semibold hover:bg-gray-100 transition z-10"
            >
              ENTER GIVEAWAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiveAwayModal;
