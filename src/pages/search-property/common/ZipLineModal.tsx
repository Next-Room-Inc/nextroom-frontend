import { XMarkIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import { PrimaryButton } from "./ComponComponents";
import { ROUTES } from "@src/utils/constants";
import { useNavigate } from "react-router-dom";

export const ZipLineModal = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      <motion.div
        key="feedback-modal"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="md:w-[450px] w-full bg-white py-6 px-5 fixed right-0 top-30 rounded-tl-3xl rounded-bl-3xl z-50"
        style={{
          boxShadow:
            "4px -4px 10px rgba(0, 0, 0, 0.1), 4px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Close Icon */}
        <XMarkIcon
          className="w-5 h-5 absolute right-5 top-4 text-gray-500 "
          onClick={onClose}
        />

        <div className="flex flex-col items-center md:items-start text-center md:text-left px-6 md:px-10 gap-4 md:mt-0 mt-5 w-full md:w-auto">
          <img
            src="/assets/img/search-property/bg_1_mobile_small.png"
            alt="Zibi Logo"
            className="w-full mx-auto"
          />

          <img
            src="/assets/img/search-property/zibi-logo.svg"
            alt="Zibi Logo"
            className="h-[30px] mx-auto"
          />

          <p className="text-lg  text-center w-full">
            <strong>Student Housing</strong> – <br /> Just a Zip-Line Away.
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
      </motion.div>
    </AnimatePresence>
  );
};
