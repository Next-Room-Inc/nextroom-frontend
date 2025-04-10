import { APP_INFO } from "../../utils/constants";

interface RentFreeModalProps {
  showModalHandler: (name: string, value: boolean) => void; // Assuming this is a function without parameters that returns void
}

// Apply the props interface to the component
const RentFreeModal: React.FC<RentFreeModalProps> = ({ showModalHandler }) => {
  const closeHandler = () => showModalHandler("rentFree", false);
  const interestedHandler = () => {
    showModalHandler("rentFree", false);
    showModalHandler("selectCompanies", true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-lg overflow-hidden max-w-3xl w-full flex flex-col md:flex-row shadow-2xl">
        <div
          className="relative w-full h-100 bg-cover bg-center flex items-center justify-end"
          style={{
            backgroundImage: `url(${APP_INFO.IMG_BASE_URL}/images/rent-free-modal-bg.png)`, // update path as needed
          }}
        >
          {/* Oval Left Content */}
          <div></div>
          <div className="flex bg-red-800 h-[100%] flex-col justify-center items-center text-white p-8 md:w-1/2 w-full">
            <h3 className="text-lg md:text-xl font-medium mb-2">ENJOY A</h3>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-2 text-center">
              RENT-FREE SUMMER
            </h2>
            <p className="text-base md:text-lg mb-6">4 MONTHS FREE</p>

            {/* Buttons */}
            <div className="w-full flex flex-col gap-3">
              <button
                onClick={interestedHandler}
                className="bg-white text-black shadow-white shadow-sm py-3 rounded-md font-semibold hover:bg-gray-100 transition"
              >
                Yes, I’m Interested
              </button>
              <button
                onClick={closeHandler}
                className="bg-red-900 shadow-black shadow-sm text-white py-3 rounded-md font-semibold hover:bg-[#841717] transition"
              >
                No, Thanks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentFreeModal;
