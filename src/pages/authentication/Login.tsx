import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Loader from "../../components/Loader";
import useAuth from "../../custom-hooks/useAuth";
import AuthLayout from "../../layouts/Auth.Layout";
import { useStudentLoginMutation } from "../../redux/services/auth.service";
import { ROUTES } from "../../utils/constants";
import { LoginSchema } from "../../utils/schemas/auth.schema";
import { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";


const inputClass = `block w-full rounded-full shadow-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6`;

const Login = () => {
  const [loginStep, setLoginStep] = useState(false)
  const { handleLogin } = useAuth();
  const [studentLogin, { isLoading }] = useStudentLoginMutation();
  const [passwordType, setPasswordType] = useState(true)
  const PasswordEyeToggleIcon = passwordType ? EyeIcon : EyeSlashIcon;


  const handleSubmit = async (values: any) => {
    try {
      const response = await studentLogin(values);
      console.log("🚀 ~ handleSubmit ~ response:", response);
      if (response.error) {
        const errorMessage = (response.error as any)?.data ?? "Login Failed";
        toast.error(errorMessage);
      } else {
        toast.success("Login successfully!");
        handleLogin(response?.data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(LoginSchema),
    onSubmit: handleSubmit,
  });

  const emailValidationError: boolean = !!formik.errors.email || !formik.values.email
  console.log(emailValidationError, formik)

  return (
    <>
      {isLoading && <Loader />}
      <AuthLayout>
        <form onSubmit={formik.handleSubmit}>
          <h1 className="text-[#B3322F] md:-mt-8 mb-5">Login</h1>
          {/* Email */}
          <div>
            <div className="mt-2 flex">
              <input
                placeholder="Email"
                id="email"
                name="email"
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${inputClass} ${formik.touched.email && formik.errors.email
                  ? "outline-red-600"
                  : ""
                  }`}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-sm text-red-600">{formik.errors.email}</div>
            ) : null}
          </div>
          {/* Password */}
          {
            loginStep && <div className="mb-2">
              <div className="mt-2">
                <div className={`${inputClass} relative ${formik.touched.password && formik.errors.password
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
                    className={`block w-full pr-10 rounded-md bg-white    pl-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none}`}

                  />
                  <PasswordEyeToggleIcon
                    onClick={() => setPasswordType(!passwordType)}
                    aria-hidden="true"
                    className="absolute right-5 top-1/2 -translate-y-1/2 size-5 text-gray-500 cursor-pointer z-10"
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>
          }


          {/*  Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => !emailValidationError && !loginStep ? setLoginStep(true) : ""}
            disabled={!formik?.touched?.email && !!formik.errors.email}
            type={!emailValidationError ? "submit" : "button"}
            className={`px-20 mt-5 rounded-full ${emailValidationError ? 'opacity-20' : ""} bg-[#B3322F] py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}
          >
            {loginStep ? "Login" : "Continue"}
          </motion.button>

          {/* Links  */}
          <p className="mt-4 text-center text-sm/6 text-gray-500 font-semibold underline">
            <Link to={ROUTES.SIGNUP}>Sign Up</Link>
          </p>
          <p className="my-0 text-center text-sm/6 text-gray-500 font-semibold underline">
            <Link to={ROUTES.FORGOT_PASSWORD}>Forgot Password</Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default Login;
