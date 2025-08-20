import { CheckCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import { APP_INFO } from "@src/utils/constants";
import { SendPromotionEmailPayload } from "@src/utils/interfaces";

const mailingLists = [
  {
    id: 1,
    logo: `${APP_INFO.IMG_BASE_URL}/groups/Byward_Market/logo.png`,
    name: "ALMA",
    address: "211 Rideau St, Ottawa, ON K1N 5Y3",
  },
  {
    id: 2,
    logo: `${APP_INFO.IMG_BASE_URL}/groups/Theo/logo.png`,
    name: "THEO",
    address: "305 Rideau St, Ottawa, ON K1N 9E5",
  },
  {
    id: 3,
    logo: `${APP_INFO.IMG_BASE_URL}/groups/1Eleven/logo.png`,
    name: "1eleven",
    address: "111 Cooper St, Ottawa, ON K2P 2E3",
  },
];

// Define the props interface
interface SelectCompaniesModalProps {
  showModalHandler: (name: string, value: boolean) => void;
  submitValueHandler: (
    sendPromotionEmailPayload: SendPromotionEmailPayload
  ) => void;
}

const SelectCompaniesModal: React.FC<SelectCompaniesModalProps> = ({
  showModalHandler,
  submitValueHandler,
}) => {
  const closeHandler = () => showModalHandler("selectCompanies", false);

  const [selectedLists, setSelectedLists] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
  });

  const interestedHandler = () => {
    const companies = mailingLists.filter((m) => selectedLists[m.id]);

    const selectedCompanies = companies.map((m) => m.name);
    const selectedProperties = companies.map((m) => m.address);

    submitValueHandler({ selectedCompanies, selectedProperties });
  };

  const toggleSelection = (id: number) =>
    setSelectedLists((prev) => ({ ...prev, [id]: !prev[id] as any }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-red-900 rounded-lg overflow-hidden max-w-3xl w-full flex flex-col md:flex-row shadow-2xl p-5 justify-center">
        {/* Modal */}
        <fieldset>
          <legend className="text-sm font-semibold text-white text-center">
            I'm Interested In...
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
                    "group relative flex flex-col  rounded-lg border bg-red-800 p-4 shadow-xs focus:outline-none",
                    isSelected
                      ? "border-red-400 ring-2 ring-red-400"
                      : "border-red-800 hover:border-red-800"
                  )}
                >
                  <span className="flex-1 text-left">
                    <div className="lg:mt-10 lg:mb-6">
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
            <strong>Disclaimer:</strong> By submitting this form, you consent to
            receive emails from the selected companies.
          </div>
          <div className=" flex flex-col lg:flex-row gap-3 mt-4 lg:mt-10 justify-center items-center">
            {Object.values(selectedLists).filter(Boolean).length > 0 && (
              <button
                onClick={interestedHandler}
                className="bg-white hover:bg-[#c4cddb] w-50  text-black shadow-black shadow-sm py-3 rounded-md font-semibold   transition"
              >
                Yes, I’m Interested
              </button>
            )}

            <button
              onClick={closeHandler}
              className="bg-red-900 hover:bg-[#B3322F] hover:shadow-[#B3322F] w-50 shadow-black shadow-sm text-white py-3 rounded-md font-semibold  transition"
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
