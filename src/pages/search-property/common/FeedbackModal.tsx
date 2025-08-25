import { AnimatePresence, motion } from "framer-motion";
import { PrimaryButton } from "./ComponComponents";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

export const FeedbackModal = ({ onClose }: { onClose: () => void }) => {
  const [rating, setRating] = useState<number>(0);

  const handleStarClick = (index: number) => setRating(index);

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="feedback-modal"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="md:w-[450px] w-full bg-white py-6 px-5 fixed left-0 bottom-20 rounded-tr-3xl rounded-br-3xl z-50"
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

          {/* Title */}
          <p className="text-center text-sm font-medium text-gray-800">
            How satisfied are you with these results?
          </p>

          {/* Star Rating */}
          <div className="flex justify-center gap-2 my-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                onClick={() => handleStarClick(i)}
                className="h-6  hover:scale-110 transition-transform"
                src={
                  i <= rating
                    ? "/assets/img/search-property/star_fill.svg"
                    : "/assets/img/search-property/start_outline.svg"
                }
                alt={`Star ${i}`}
              />
            ))}
          </div>

          {/* Optional Message */}
          <textarea
            className="bg-gray-100 text-sm text-gray-700 px-4 py-3 rounded-md shadow-sm  w-full resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Your opinion matters! Let us know how we're doing or what you'd like to see next. (Optional)"
            rows={4}
          />
          {/* Submit Button */}
          <div className="flex justify-center mt-5">
            <PrimaryButton
              color="black"
              className="w-24 h-7 text-xs"
              onClick={onClose}
            >
              Submit
            </PrimaryButton>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
