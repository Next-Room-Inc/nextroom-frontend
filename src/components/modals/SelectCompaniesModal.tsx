import { CheckCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { APP_INFO } from "../../utils/constants";

const mailingLists = [
  {
    id: 1,
    logo: `${APP_INFO.IMG_BASE_URL}/groups/Byward_Market/logo.png`,
  },
  {
    id: 2,
    logo: `${APP_INFO.IMG_BASE_URL}/groups/Theo/logo.png`,
  },
  {
    id: 3,
    logo: `${APP_INFO.IMG_BASE_URL}/groups/1Eleven/logo.png`,
  },
];

// Define the props interface
interface SelectCompaniesModalProps {
  showModalHandler: (name: string, value: boolean) => void;
  submitValueHandler:()=> void;
}

const SelectCompaniesModal: React.FC<SelectCompaniesModalProps> = ({
  showModalHandler,
  submitValueHandler
}) => {
 
  const closeHandler = () => showModalHandler("selectCompanies", false);

  const interestedHandler = () => {
    submitValueHandler();
    toast.success("Request submitted successfully");
    showModalHandler("selectCompanies", false);
  };

  const [selectedLists, setSelectedLists] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
  });

  const toggleSelection = (id:number) =>
    setSelectedLists((prev) => ({ ...prev, [id]: !prev[id] as any }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-red-900 rounded-lg overflow-hidden max-w-3xl w-full flex flex-col md:flex-row shadow-2xl p-5 justify-center">
        {/* Modal */}
        <fieldset>
          <legend className="text-sm font-semibold text-white text-center">
            Select Companies you are interested
          </legend>
          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4 justify-center ">
            {mailingLists.map((mailingList) => {
              const isSelected = selectedLists[mailingList.id] || false;
              
              return (
                <button
                  key={mailingList.id}
                  type="button"
                  onClick={() => toggleSelection(mailingList.id)}
                  className={clsx(
                    "group relative flex flex-col cursor-pointer rounded-lg border bg-red-800 p-4 shadow-xs focus:outline-none",
                    isSelected
                      ? "border-red-400 ring-2 ring-red-400"
                      : "border-red-800 hover:border-red-800"
                  )}
                >
                  <span className="flex-1 text-left">
                    <div className="mt-10 mb-6">
                      <img
                        alt="Your Company"
                        src={mailingList.logo}
                        className="h-15 w-auto mx-auto"
                      />
                    </div>
                  </span>
                  <CheckCircleIcon
                    aria-hidden="true"
                    className={clsx(
                      "size-5 absolute top-3 right-3 transition-opacity",
                      isSelected ? "text-red-400 opacity-100" : "opacity-0"
                    )}
                  />
                </button>
              );
            })}
          </div>
          <div className="mt-5 text-red-500">
  <strong>Disclaimer:</strong> By submitting this form, you consent to receive emails from the selected companies.
</div>
          <div className=" flex flex-col lg:flex-row gap-3 mt-10 justify-center items-center">
            {Object.values(selectedLists).filter(Boolean).length > 0 && (
              <button
                onClick={interestedHandler}
                className="bg-white hover:bg-gray-200 w-50  text-black shadow-black shadow-sm py-3 rounded-md font-semibold hover:bg-gray-100 transition"
              >
                Yes, I’m Interested
              </button>
            )}

            <button
              onClick={closeHandler}
              className="bg-red-900 hover:bg-red-800 w-50 shadow-black shadow-sm text-white py-3 rounded-md font-semibold hover:bg-[#841717] transition"
            >
              No, Thanks
            </button>
          </div>
        </fieldset>
        {/* Modal */}
      </div>
    </div>
  );
};

export default SelectCompaniesModal;
