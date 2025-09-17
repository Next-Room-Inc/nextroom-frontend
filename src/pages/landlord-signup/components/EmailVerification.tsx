import { PrimaryButton } from "@src/components/Button";
import { useState } from "react";

interface EmailVerificationFormProps {
  formik: any;
  onNext: () => void;
}

const inputClass = `block w-full rounded-full  drop-shadow-md shadow-lg bg-white px-3 py-2 text-base text-gray-900 outline  placeholder:text-gray-400 sm:text-sm/6`;

export const EmailVerification: React.FC<EmailVerificationFormProps> = ({
  formik,
  onNext,
}) => {
  const [alternativeDetails, setAlternativeDetails] = useState(false);
  return (
    <>
      <h2 className="font-normal text-[#B3322F] sm:text-[22px] mt-10">
        Email Verification
      </h2>
      <p className="font-normal text-[#040404] sm:text-[18px] mt-4">
        We’ve sent a confirmation link to your email.
      </p>
      <span className="font-normal text-[#040404] sm:text-[18px]">
        Please check your inbox and click the link to verify your account.
      </span>
      <h2 className="font-normal text-[#B3322F] sm:text-[22px] mt-6">
        Didn’t get the email?
      </h2>
      <p className="font-normal text-[#040404] sm:text-[18px] mt-4">
        Please check your spam or junk folder. If you still can’t find it, you
        can submit a support request, or chat with us directly.
      </p>
      <div className="flex gap-3 mt-6">
        <button className="bg-[#000000] text-[14px] text-white py-2 px-10 rounded-full font-semibold transition z-10">
          Submit Support Request
        </button>
        <button className="bg-[#000000] text-[14px] text-white py-2 px-12 rounded-full font-semibold transition z-10">
          Chat With Us
        </button>
      </div>
      <PrimaryButton className="bg-[#B3322F] mt-8 text-white py-3 px-25 rounded-full font-semibold transition z-10">
        Resend Email
      </PrimaryButton>
      <div
        onClick={() => setAlternativeDetails(!alternativeDetails)}
        className="flex gap-3 hover:bg-gray-100 p-2 rounded-md transition px-5 mt-6"
      >
        <span
          className={`${alternativeDetails ? "bg-[#B3322F]" : "border-[#B3322F] border-2"
            } mt-1 w-7 h-4 rounded-full flex items-center justify-center text-white font-bold text-lg`}
        ></span>
        <span className="text-[#040404] text-[16px]">
          I wish to receive notifications via an alternative email address or
          phone number. Please Note: Your company email address will always be
          used for verification.
        </span>
      </div>
      <div className="sm:w-full">
        {alternativeDetails && (
          <>
            <div
              className={`mt-6 ${inputClass} ${formik.touched.email && formik.errors.email
                  ? "outline-1 outline-red-600"
                  : "outline-1 outline-gray-300"
                }`}
            >
              <input
                placeholder="Email Address"
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full pr-10 rounded-md bg-white py-0.5  pl-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none ${formik.touched.email && formik.errors.email
                    ? "outline-red-600"
                    : "outline-white"
                  }`}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-sm text-red-600 ml-3 mt-2">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div
              className={`mt-6 ${inputClass} ${formik.touched.email && formik.errors.email
                  ? "outline-1 outline-red-600"
                  : "outline-1 outline-gray-300"
                }`}
            >
              <input
                placeholder="Phone Number"
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full pr-10 rounded-md bg-white py-0.5  pl-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none ${formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "outline-red-600"
                    : "outline-white"
                  }`}
              />
            </div>
          </>
        )}

        <div className="mt-6">
          <PrimaryButton
            onClick={onNext}
            className="bg-[#B3322F] mt-8 text-white py-4 px-40 rounded-full font-semibold transition z-10"
          >
            Next
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};
