import { PrimaryButton } from "@src/components/Button";
import { useState } from "react";

interface BasicDetailsFormProps {
  formik: any;
  onNext: () => void;
}

const inputClass = `block w-full rounded-full  drop-shadow-md shadow-lg bg-white px-3 py-2 text-base text-gray-900 outline  placeholder:text-gray-400 sm:text-sm/6`;

export const BasicDetails: React.FC<BasicDetailsFormProps> = ({
  formik,
  onNext,
}) => {
  const [updateForm, setUpdateForm] = useState("manageProperties");
  return (
    <>
      <h2 className="xl:text-[26px] leading-[58px] font-normal text-[#B3322F] sm:text-[22px] mt-10">
        Basic Details
      </h2>
      <div className="sm:w-full">
        <div
          className={`mt-6 ${inputClass} ${
            formik.touched.email && formik.errors.email
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
            className={`block w-full pr-10 rounded-md bg-white py-0.5  pl-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none ${
              formik.touched.phoneNumber && formik.errors.phoneNumber
                ? "outline-red-600"
                : "outline-white"
            }`}
          />
        </div>
        <div className="mt-6">
          <div
            className={`${inputClass} relative ${
              formik.values.password &&
              formik.touched.password &&
              formik.errors.password
                ? "  outline-1 outline-red-600"
                : "  outline-1 outline-gray-300"
            } `}
          >
            <input
              placeholder="Title"
              id="title"
              name="title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full pr-10 rounded-md bg-white py-0.5  pl-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none ${
                formik.touched.title && formik.errors.title
                  ? "outline-red-600"
                  : "outline-white"
              }`}
            />
          </div>
        </div>
        <div className="mb-2">
          <div className="mt-6">
            <span className="text-[#B3322F] text-[14px]">*Optional</span>
            <div
              className={`${inputClass} relative ${
                formik.values.confirmPassword &&
                formik.touched.password &&
                formik.errors.password
                  ? "  outline-1 outline-red-600"
                  : "  outline-1 outline-gray-300"
              } `}
            >
              <input
                placeholder="Company Name"
                id="companyName"
                name="companyName"
                type="text"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full pr-10 rounded-md bg-white py-0.5  pl-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none ${
                  formik.touched.companyName && formik.errors.companyName
                    ? "outline-red-600"
                    : "outline-white"
                }`}
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row">
            <div
              onClick={() => setUpdateForm("manageProperties")}
              className="flex items-center gap-2  hover:bg-gray-100 p-2 rounded-md transition px-5"
            >
              <span
                className={`${
                  updateForm === "manageProperties"
                    ? "bg-[#B3322F]"
                    : "border-[#B3322F] border-2"
                }  w-4 h-4 rounded-full flex items-center justify-center text-white font-bold text-lg`}
              ></span>
              <span className="text-gray-800 font-medium">
                I Manage Properties
              </span>
            </div>
            <div
              onClick={() => setUpdateForm("ownProperties")}
              className="flex items-center gap-3  hover:bg-gray-100 p-2 rounded-md transition px-5"
            >
              <span
                className={`${
                  updateForm === "ownProperties"
                    ? "bg-[#B3322F]"
                    : "border-[#B3322F] border-2"
                }  w-4 h-4 rounded-full flex items-center justify-center text-white font-bold text-lg`}
              ></span>
              <span className="text-gray-800 font-medium">
                I Own Properties
              </span>
            </div>
            <div
              onClick={() => setUpdateForm("both")}
              className="flex items-center gap-3  hover:bg-gray-100 p-2 rounded-md transition px-5"
            >
              <span
                className={`${
                  updateForm === "both"
                    ? "bg-[#B3322F]"
                    : "border-[#B3322F] border-2"
                }  w-4 h-4 rounded-full flex items-center justify-center text-white font-bold text-lg`}
              ></span>
              <span className="text-gray-800 font-medium">Both</span>
            </div>
          </div>
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
