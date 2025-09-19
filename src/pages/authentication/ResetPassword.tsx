import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Popover } from "react-tiny-popover";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Loader from "../../components/Loader";
import PasswordChecklist from "../../components/PasswordChecklist";
import AuthLayout from "@src/layouts/Auth.Layout";
import { useResetPasswordMutation } from "@src/redux/services/auth.service";
import { APP_INFO, ROUTES } from "@src/utils/constants";
import {
  ResetPasswordSchema,
} from "@src/utils/schemas/auth.schema";
import { motion } from "framer-motion";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { generatePassword } from "@src/utils/functions";

const inputClass = `block w-full rounded-full shadow-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6`;

const ResetPassword = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // const { handleLogin } = useAuth();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (values: any) => {

    const token = searchParams.get('token');
    if (!token) {
      return toast.error('Reset Token not Found');
    }
    const payload = { token, newPassword: values.password }
    try {
      const response = await resetPassword(payload);

      if (response.error) {
        const errorMessage = (response.error as any)?.data ?? "Request Failed";
        toast.error(errorMessage);
      } else {
        toast.success(response?.data?.message || "Password reset successfully!");
        navigate(ROUTES.LOGIN);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred");
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(ResetPasswordSchema),
    onSubmit: handleSubmit,
  });

  const PopOverComponent = () => {
    return (
      <div className="  w-[80vw] max-w-[280px] md:max-w-[350px] bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg py-2 px-3  text-xs leading-relaxed break-words text-left ">
        Can’t remember your password? Input your registered email address and
        we’ll send you a reset link.
      </div>
    );
  };

  const validationError: boolean = !!formik.errors.password || !!formik.errors.confirmPassword;
  const [passwordType, setPasswordType] = useState(true)
  const [confirmPasswordType, setConfirmPasswordType] = useState(true)
  const PasswordEyeToggleIcon = passwordType ? EyeIcon : EyeSlashIcon;
  const ConfirmPasswordEyeToggleIcon = confirmPasswordType ? EyeIcon : EyeSlashIcon;

  const passwordGenerateHandler = () => {
    const password = generatePassword(20)
    formik.setFieldValue("password", password);
    formik.setFieldValue("confirmPassword", password);
    setPasswordType(false)
    setConfirmPasswordType(false)

  }


  return (
    <>
      {isLoading && <Loader />}
      <AuthLayout>
        <form onSubmit={formik.handleSubmit}>
          <Popover
            isOpen={isPopoverOpen}
            positions={["bottom", "right"]} // preferred positions by priority
            content={<PopOverComponent />}
          >
            <h1 className="text-[#B3322F] md:-mt-8 mb-5 flex justify-center">
              Reset Password
              <img
                src={`${APP_INFO.IMG_BASE_URL}/icons/question_mark_circle.png`}
                className="ml-2 h-5 mt-1"
                onMouseEnter={() => setIsPopoverOpen(true)}
                onMouseLeave={() => setIsPopoverOpen(false)}
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              />
            </h1>
          </Popover>
          {/*  */}
          <div className="mb-2">
            <div className="mt-2">
              <div className={`${inputClass} relative ${formik.values.password && formik.touched.password && formik.errors.password
                ? "  outline-1 outline-red-600"
                : "  outline-1 outline-gray-300"} `}>
                <input
                  placeholder="Password"
                  id="password"
                  name="password"
                  type={passwordType ? "password" : "text"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full pr-40 rounded-md bg-white py-0.5  pl-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none}`}
                />

                <span className="absolute right-11 text-[#B3322F] font-semibold underline text-[10px] top-1/2 -translate-y-1/2 z-10 group cursor-pointer" onClick={passwordGenerateHandler}>
                  Generate Password For Me
                  <span className="absolute font-light bottom-full mb-2 left-1/2 -translate-x-1/2 w-70 bg-white text-black rounded-md shadow-md text-[10px] leading-tight px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    By using this tool, a secure password will be generated for you. Save it in a password manager — we do not store or recover passwords.
                  </span>
                </span>

                <PasswordEyeToggleIcon
                  onClick={() => setPasswordType(!passwordType)}
                  aria-hidden="true"
                  className="absolute right-5 top-1/2 -translate-y-1/2 size-5 text-gray-500  z-10"
                />
              </div>

              {formik.values.password && formik.touched.password && formik.values.password.length ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <PasswordChecklist password={formik.values.password} />
                </motion.div>
              ) : null}
            </div>
          </div>


          {/* Confirm Password */}
          <div className="mb-2">
            <div className="mt-4">
              <div className={`${inputClass} relative ${formik.values.confirmPassword && formik.touched.password && formik.errors.password
                ? "  outline-1 outline-red-600"
                : "  outline-1 outline-gray-300"} `}>
                <input
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type={confirmPasswordType ? "password" : "text"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full pr-10 rounded-md bg-white py-0.5  pl-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none}`}

                />
                <ConfirmPasswordEyeToggleIcon
                  onClick={() => setConfirmPasswordType(!confirmPasswordType)}
                  aria-hidden="true"
                  className="absolute right-5 top-1/2 -translate-y-1/2 size-5 text-gray-500  z-10"
                />
              </div>
              {formik.values.confirmPassword && formik.touched.confirmPassword &&
                formik.values.password !== formik.values.confirmPassword ? (
                <div className="text-sm text-white pl-5 pt-2">
                  Passwords do not match
                </div>
              ) : null}
            </div>
          </div>
          {/*  Button */}
          {/* <button
            disabled={validationError}
            type={"submit"}
            className={`px-20 mt-5 rounded-full ${validationError ? "opacity-20" : ""
              } bg-[#B3322F] py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}
          >
            Reset
          </button> */}

          <motion.button
            disabled={validationError}
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`px-20 mt-5 rounded-full ${validationError ? "bg-[#b3312f5e]" : ""
              }  bg-[#B3322F] py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}
          >
            Forgot Password
          </motion.button>
          {/* Links  */}
          {/* <p className="mt-4 text-center text-sm/6 text-gray-500 font-semibold underline">
            <Link to={ROUTES.LOGIN}>Log in</Link>
          </p>  */}
        </form>
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
