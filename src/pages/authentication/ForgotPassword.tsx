import { useFormik } from "formik";
import { useState } from "react";
import { Popover } from "react-tiny-popover";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Loader from "../../components/Loader";
import AuthLayout from "../../layouts/Auth.Layout";
import { useForgotPasswordMutation } from "../../redux/services/auth.service";
import { APP_INFO } from "../../utils/constants";
import { ForgotPasswordSchema } from "../../utils/schemas/auth.schema";

const inputClass = `block w-full rounded-full shadow-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6`;

const ForgotPassword = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // const { handleLogin } = useAuth();
  const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();

  const handleSubmit = async (values: any) => {
    console.log(values);
    try {
      const response = await forgotPassword(values);
      console.log("🚀 ~ handleSubmit ~ response:", response);
      if (response.error) {
        const errorMessage = (response.error as any)?.data ?? "Login Failed";
        toast.error(errorMessage);
      } else {
        toast.success("successfully!");

      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: toFormikValidationSchema(ForgotPasswordSchema),
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

  const emailValidationError: boolean = !!formik.errors.email || !formik.values.email;

  return (
    <>
      {isLoading && <Loader />}
      <AuthLayout>
        {isSuccess ? <>
          <div className="text-center "    >
            <img
              src={`${APP_INFO.IMG_BASE_URL}icons/receive_email_icon.svg`}
              className="h-15 mx-auto "

            />
            <h6 className="text-[#B3322F] text-md mt-4 mb-4">Check Your Email</h6>
            <p className="  mt-5 text-base  px-5 md:px-0">
              We've sent a password reset link to <span className="font-bold">{formik.values.email}</span>.
              <p className="py-4 md:py-1">
              Please check your inbox and follow the instructions to reset your password.
              </p>
              If you don’t see the email within a few minutes, be sure to check your spam or junk folder.
            </p>




          </div>
        </> : <form onSubmit={formik.handleSubmit}>
          <Popover
            isOpen={isPopoverOpen}
            positions={["bottom", "right"]} // preferred positions by priority
            content={<PopOverComponent />}
          >
            <h1 className="text-[#B3322F] md:-mt-8 mb-5 flex justify-center">
              Forgot Password
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
          {/*  Button */}
          <button
            disabled={emailValidationError}
            type={"submit"}
            className={`px-20 mt-5 rounded-full ${emailValidationError ? "opacity-20" : ""
              } bg-[#B3322F] py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}
          >
            Forgot Password
          </button>
          {/* Links  */}
          {/* <p className="mt-4 text-center text-sm/6 text-gray-500 font-semibold underline">
            <Link to={ROUTES.LOGIN}>Log in</Link>
          </p>  */}
        </form>}

      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
