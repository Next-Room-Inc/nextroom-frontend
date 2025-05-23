import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Popover } from "react-tiny-popover";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Loader from "../../components/Loader";
import PasswordChecklist from "../../components/PasswordChecklist";
import AuthLayout from "../../layouts/Auth.Layout";
import { useResetPasswordMutation } from "../../redux/services/auth.service";
import { APP_INFO, ROUTES } from "../../utils/constants";
import {
  ResetPasswordSchema,
} from "../../utils/schemas/auth.schema";

const inputClass = `block w-full rounded-full shadow-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6`;

const ResetPassword = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // const { handleLogin } = useAuth();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (values: any) => {
    console.log(values);
    const payload = values;
    const token = searchParams.get('token');
    if (token) {
      payload['token'] = token
    }
    try {
      const response = await resetPassword(values);
      console.log("🚀 ~ handleSubmit ~ response:", response);
      if (response.error) {
        const errorMessage = (response.error as any)?.data ?? "Request Failed";
        toast.error(errorMessage);
      } else {
        toast.success("Password reset successfully!");
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
          {/* Password */}
          <div className="mb-2">
            <div className="mt-2">
              <input
                placeholder="Password"
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${inputClass} ${formik.touched.password && formik.errors.password
                  ? "outline-red-600"
                  : ""
                  }`}
              />


              {formik.touched.password || formik.errors.password || formik.values.password ? (
                <PasswordChecklist password={formik.values.password} />
              ) : null}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-2">
            <div className="mt-2">
              <input
                placeholder="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${inputClass} ${formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                  ? "outline-red-600"
                  : ""
                  }`}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                <div className="text-sm text-red-600">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
          </div>
          {/*  Button */}
          <button
            disabled={validationError}
            type={"submit"}
            className={`px-20 mt-5 rounded-full ${validationError ? "opacity-20" : ""
              } bg-[#B3322F] py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}
          >
            Reset
          </button>
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
