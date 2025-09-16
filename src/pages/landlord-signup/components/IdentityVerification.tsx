import { useEffect, useState } from "react";
import { ArrowUpTrayIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import { PrimaryButton } from "@src/components/Button";

interface IdentityVerificationFormProps {
  formik: any;
  onNext: () => void;
}

export const IdentityVerification: React.FC<IdentityVerificationFormProps> = ({
  formik,
  onNext,
}) => {
  const [updateForm, setUpdateForm] = useState("passport");
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [selfieImage, setSelfieImage] = useState<File | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<
    "success" | "failed" | null
  >(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    side: "front" | "back" | "selfie"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (side === "front") setFrontImage(file);
    else if (side === "back") setBackImage(file);
    else setSelfieImage(file);
  };

  const getImageURL = (file: File | null) => {
    return file ? URL.createObjectURL(file) : "";
  };

  // Simulate verification process after selfie is uploaded
  useEffect(() => {
    if (frontImage && backImage && selfieImage && !verificationStatus) {
      // Simulate verification result
      setTimeout(() => {
        const isSuccess = true;
        setVerificationStatus(isSuccess ? "success" : "failed");
      }, 1000);
    }
  }, [frontImage, backImage, selfieImage, verificationStatus]);

  if (verificationStatus === "success") {
    return (
      <div className="mt-6">
        <span className="text-[22px] font-normal text-[#000000]">
          Success! Your identity has been verified.
        </span>
      </div>
    );
  }

  if (verificationStatus === "failed") {
    return (
      <div className="mt-6">
        <span className="block text-[22px] font-normal text-[#000000]">
          Identity Verification Failed.
        </span>
        <button
          className="bg-[#000000] text-[12px] mt-4 text-white py-2 px-20 rounded-full font-semibold hover:bg-gray-100 transition z-10"
          onClick={() => {
            // Reset verification steps
            setSelfieImage(null);
            setVerificationStatus(null);
          }}
        >
          Review Steps
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className="font-[500] text-[#B3322F] sm:text-[22px] mt-10">
        Identity Verification
      </h2>
      <p className="font-normal text-[#040404] sm:text-[18px] mt-6 w-150">
        Once you’ve successfully verified your company, you can start listing
        your properties right away.
      </p>
      <h2 className="font-[500] text-[#040404] sm:text-[22px] mt-6">
        Select Document Type?
      </h2>
      <div className="mt-4 flex flex-col md:flex-row">
        {["passport", "driverLicense", "idCard"].map((type) => (
          <div
            key={type}
            onClick={() => setUpdateForm(type)}
            className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md transition px-5 cursor-pointer"
          >
            <span
              className={`${
                updateForm === type
                  ? "bg-[#B3322F]"
                  : "border-[#B3322F] border-2"
              } w-4 h-4 rounded-full flex items-center justify-center text-white font-bold text-lg`}
            ></span>
            <span className="text-gray-800 font-medium">
              {type === "driverLicense"
                ? "Driver’s License"
                : type === "idCard"
                ? "ID Card"
                : "Passport"}
            </span>
          </div>
        ))}
      </div>

      {/* === Upload Front/Back === */}
      <h2 className="font-normal text-[#040404] sm:text-[22px] mt-6">
        Upload Document
      </h2>
      <div className="flex gap-5 mt-6">
        {/* Front */}
        <div className="flex flex-col gap-3">
          <label>Front</label>
          {!frontImage ? (
            <>
              <input
                type="file"
                id="front-upload"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "front")}
              />
              <label
                htmlFor="front-upload"
                className="cursor-pointer shadow-md bg-white border border-transparent w-full md:w-60 flex rounded-full py-2 px-5 items-center justify-center gap-2 hover:shadow-lg transition duration-150"
              >
                <ArrowUpTrayIcon className="h-5 fill-[#B3322F]" />
                <span className="text-[#B3322F]">Upload</span>
              </label>
            </>
          ) : (
            <>
              <input
                type="file"
                id="front-retake"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "front")}
              />
              <label
                htmlFor="front-retake"
                className="cursor-pointer shadow-md bg-white border border-transparent w-full md:w-60 flex rounded-full py-2 px-5 items-center justify-center gap-2 hover:shadow-lg transition duration-150"
              >
                <ArrowUpTrayIcon className="h-5 fill-[#B3322F]" />
                <span className="text-[#B3322F]">Retake Image</span>
              </label>
              <div className="rounded-md bg-[#333333] w-60 h-40 overflow-hidden">
                <img
                  src={getImageURL(frontImage)}
                  alt="Front preview"
                  className="object-cover w-full h-full"
                />
              </div>
            </>
          )}
        </div>

        {/* Back */}
        <div className="flex flex-col gap-3">
          <label>Back</label>
          {!backImage ? (
            <>
              <input
                type="file"
                id="back-upload"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "back")}
              />
              <label
                htmlFor="back-upload"
                className="cursor-pointer shadow-md bg-white border border-transparent w-full md:w-60 flex rounded-full py-2 px-5 items-center justify-center gap-2 hover:shadow-lg transition duration-150"
              >
                <ArrowUpTrayIcon className="h-5 fill-[#B3322F]" />
                <span className="text-[#B3322F]">Upload</span>
              </label>
            </>
          ) : (
            <>
              <input
                type="file"
                id="back-retake"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "back")}
              />
              <label
                htmlFor="back-retake"
                className="cursor-pointer shadow-md bg-white border border-transparent w-full md:w-60 flex rounded-full py-2 px-5 items-center justify-center gap-2 hover:shadow-lg transition duration-150"
              >
                <ArrowUpTrayIcon className="h-5 fill-[#B3322F]" />
                <span className="text-[#B3322F]">Retake Image</span>
              </label>
              <div className="rounded-md bg-[#333333] w-60 h-40 overflow-hidden">
                <img
                  src={getImageURL(backImage)}
                  alt="Back preview"
                  className="object-cover w-full h-full"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <p className="font-normal text-[#040404] sm:text-[14px] mt-4">
        *For your security, uploaded documents are not stored by NextRoom.
        Verification is processed securely through Trulioo to help protect both
        landlords and students.
      </p>
      <button className="bg-[#000000] text-[14px] text-white mt-6 py-2 px-10 rounded-full font-semibold hover:bg-gray-100 transition z-10">
        I Have Questions
      </button>
      {/* === Selfie Check === */}
      {backImage && frontImage && (
        <div className="mt-6">
          <h2 className="font-normal text-[#040404] sm:text-[22px]">
            Selfie Check
          </h2>
          <div className="flex items-end mt-2 mb-5">
            <img
              className="w-60"
              src="/assets/img/landlord-signup/selfie.png"
              alt="Selfie"
            />
            <div className="mb-8 ml-[-10px]">
              <p className="text-[16px] text-[#000000] mb-2">Tips</p>
              <span className="flex items-center gap-1 text-[14px] text-[#000000]">
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
                Find a well lit place
              </span>
              <span className="flex items-center gap-1 text-[14px] text-[#000000]">
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
                Ensure your face is within frame
              </span>
              <span className="flex items-center gap-1 text-[14px] text-[#000000]">
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
                Don’t wear hats, glasses and/or masks
              </span>
            </div>
          </div>

          {!selfieImage ? (
            <>
              <input
                type="file"
                id="selfie-upload"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "selfie")}
              />
              <label
                htmlFor="selfie-upload"
                className="bg-[#000000] text-[12px] text-white py-2 px-20 rounded-full font-semibold hover:bg-gray-100 transition z-10 cursor-pointer"
              >
                Take A Photo
              </label>
            </>
          ) : (
            <div className="rounded-md bg-[#333333] w-60 h-40 overflow-hidden mt-2">
              <img
                src={getImageURL(selfieImage)}
                alt="Selfie preview"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
      )}
      <div className="mt-6">
        <PrimaryButton
          onClick={onNext}
          disabled={verificationStatus === "success"}
          className="bg-[#B3322F] mt-8 text-white py-4 px-40 rounded-full font-semibold transition z-10"
        >
          Next
        </PrimaryButton>
      </div>
    </>
  );
};
