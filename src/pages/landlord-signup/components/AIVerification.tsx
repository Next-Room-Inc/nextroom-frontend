import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";
import { PrimaryButton } from "@src/components/Button";
import { useState } from 'react'

interface AIVerificationFormProps {
  formik: any;
  onNext: () => void;
}

export const AIVerification: React.FC<AIVerificationFormProps> = ({
  onNext,
}) => {
  const [updateFormTerms, setUpdateFormTerms] = useState(false);
  const [updateFormPolicy, setUpdateFormPolicy] = useState(false);
  return (
    <>
      <h2 className="xl:text-[34px] leading-[58px] font-normal text-[#B3322F] sm:text-[26px] mt-10">
        AI Verification
      </h2>
      <p className="font-normal text-[#040404] sm:text-[18px] mt-4">
        To verify property ownership, please upload an official document (e.g.,
        utility bill, municipal statement). Our system will securely scan the
        document to check for key details.
      </p>
      <div className="mt-4">
        <span className="text-[#B3322F] text-[18px]">Tips:</span>
        <ul className="list-disc mt-4 pl-4 w-100">
          <li className="text-[#040404] text-[18px] mt-3">
            Utility/city logo (i.e., Enbridge, Hydro Ottawa, City of
            Ottawa/Ville D'Gatineau)
          </li>
          <li className="text-[#040404] text-[18px] mt-3">
            Correct property address on the document
          </li>
          <li className="text-[#040404] text-[18px] mt-3">
            Optional: name of person on document
          </li>
          <li className="text-[#040404] text-[18px] mt-3">
            We look for temperament, such as Photoshop, font differences, etc.
          </li>
          <li className="text-[#040404] text-[18px] mt-3">
            No screenshots or blurry document allowed. Pictures can be accepted
            if only the following above applies.
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-3 mt-6">
        <input type="file" className="hidden" />
        <div className="shadow-md bg-white border border-transparent w-full md:w-100 flex rounded-full py-4 px-12 items-center justify-center gap-2 hover:shadow-lg transition duration-150">
          <ArrowUpTrayIcon className="h-5 fill-[#B3322F]" />
          <span className="text-[#B3322F] font-[600]">Upload Document</span>
        </div>
      </div>
      <p className="text-[#040404] text-[16px] mt-4">
        File must be a PDF or PNG, and cannot be larger than 5 MB.
      </p>
      <div className="sm:w-full">
        <div className="mb-2">
          <PrimaryButton
            onClick={onNext}
            className="bg-[#B3322F] mt-8 text-white py-4 px-40 rounded-full font-semibold transition z-10"
          >
            Submit
          </PrimaryButton>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <div
          onClick={() => setUpdateFormTerms(!updateFormTerms)}
          className="flex items-center gap-2  hover:bg-gray-100 p-2 rounded-md transition px-5"
        >
          <span
            className={`${updateFormTerms
                ? "bg-[#B3322F]"
                : "border-[#B3322F] border-2"
              }  w-4 h-4 rounded-full flex items-center justify-center text-white font-bold text-lg`}
          ></span>
          <span className="text-[#040404] font-normal text-[14px]">I have read and accept the Next Room Terms & Conditions</span>
        </div>
        <div
          onClick={() => setUpdateFormPolicy(!updateFormPolicy)}
          className="flex items-center gap-3  hover:bg-gray-100 p-2 rounded-md transition px-5"
        >
          <span
            className={`${updateFormPolicy
                ? "bg-[#B3322F]"
                : "border-[#B3322F] border-2"
              }  w-4 h-4 rounded-full flex items-center justify-center text-white font-bold text-lg`}
          ></span>
          <span className="text-[#040404] font-normal text-[14px]">I have read and accept the Next Room Privacy Policy</span>
        </div>
      </div>
    </>
  );
};
