import { useFormik } from "formik";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import AuthLayout from "../../layouts/Auth.Layout";
import { ForgotPasswordSchema } from "../../utils/schemas/auth.schema";
import { APP_INFO } from "../../utils/constants";
import { Popover } from "react-tiny-popover";
import { useState } from "react";

const inputClass = `block w-full rounded-full shadow-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6`;

const ForgotPassword = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // const { handleLogin } = useAuth();
  // const [studentLogin, { isLoading }] = useStudentLoginMutation();

  const handleSubmit = async (values: any) => {
    console.log(values);
    // try {
    //   const response = await studentLogin(values);
    //   console.log("🚀 ~ handleSubmit ~ response:", response);
    //   if (response.error) {
    //     const errorMessage = (response.error as any)?.data ?? "Login Failed";
    //     toast.error(errorMessage);
    //   } else {
    toast.success("successfully!");
    //     handleLogin(response?.data?.token);
    //   }
    // } catch (err) {
    //   console.error("Unexpected error:", err);
    //   toast.error("An unexpected error occurred");
    // }
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

  const emailValidationError: boolean =
    !!formik.errors.email || !formik.values.email;

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <AuthLayout>
        <form onSubmit={formik.handleSubmit}>
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
                className={`${inputClass} ${
                  formik.touched.email && formik.errors.email
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
            className={`px-20 mt-5 rounded-full ${
              emailValidationError ? "opacity-20" : ""
            } bg-[#B3322F] py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}
          >
            Reset Password
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

export default ForgotPassword;
