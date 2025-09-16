import { useState } from "react";
import { EyeSlashIcon } from "@heroicons/react/16/solid";
import { EyeIcon } from "@heroicons/react/20/solid";
import * as motion from "motion/react-client";
import PasswordChecklist from "../../../components/PasswordChecklist";
import { PrimaryButton } from "@src/components/Button";

interface AuthFormProps {
  formik: any;
  onNext: () => void;
}

const inputClass = `block w-full rounded-full  drop-shadow-md shadow-lg bg-white px-3 py-2 text-base text-gray-900 outline  placeholder:text-gray-400 sm:text-sm/6`;

export const LandlordSignUpAuth: React.FC<AuthFormProps> = ({
  formik,
  onNext,
}) => {
  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const PasswordEyeToggleIcon = passwordType ? EyeIcon : EyeSlashIcon;
  const ConfirmPasswordEyeToggleIcon = confirmPasswordType
    ? EyeIcon
    : EyeSlashIcon;
  return (
    <>
      <h2 className="xl:text-[34px] leading-[58px] font-normal text-[#B3322F] sm:text-[26px] mt-10">
        Let’s Get You Verified!
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
            placeholder="Email Address"
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`block w-full pr-10 rounded-md bg-white py-0.5  pl-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none ${
              formik.touched.email && formik.errors.email
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
              placeholder="Password"
              id="password"
              name="password"
              type={passwordType ? "password" : "text"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full pr-10 rounded-md bg-white py-0.5  pl-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none ${
                formik.touched.password && formik.errors.password
                  ? "outline-red-600"
                  : "outline-white"
              }`}
            />
            <PasswordEyeToggleIcon
              onClick={() => setPasswordType(!passwordType)}
              aria-hidden="true"
              className="absolute right-5 top-1/2 -translate-y-1/2 size-5 text-gray-500  z-10"
            />
          </div>
          {formik.values.password &&
          formik.touched.password &&
          formik.values.password.length ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <PasswordChecklist password={formik.values.password} />
            </motion.div>
          ) : null}
        </div>
        {/* Confirm Password */}
        <div className="mb-2">
          <div className="mt-6">
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
                placeholder="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type={confirmPasswordType ? "password" : "text"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full pr-10 rounded-md bg-white py-0.5  pl-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none ${
                  formik.touched.password && formik.errors.password
                    ? "outline-red-600"
                    : "outline-white"
                }`}
              />
              <ConfirmPasswordEyeToggleIcon
                onClick={() => setConfirmPasswordType(!confirmPasswordType)}
                aria-hidden="true"
                className="absolute right-5 top-1/2 -translate-y-1/2 size-5 text-gray-500  z-10"
              />
            </div>
            {formik.values.confirmPassword &&
            formik.touched.confirmPassword &&
            formik.errors.confirmPassword ? (
              <div className="text-sm text-red-600">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
          <PrimaryButton
            onClick={onNext}
            className="bg-[#B3322F] mt-8 text-white py-4 px-40 rounded-full font-semibold z-10"
          >
            Next
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};
