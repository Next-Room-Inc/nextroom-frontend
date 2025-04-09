import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Loader from "../../components/Loader";
import { useStudentLoginMutation } from "../../redux/services/auth.service";
import { APP_INFO, ROUTES } from "../../utils/constants";
import { LoginSchema } from "../../utils/schemas/auth.schema";
import useAuth from "./Auth";
import { STUDENT_IMAGES } from "../../utils/constants/app-info.constant";

const inputClass = `block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6`;

const Login = () => {
  const { handleLogin } = useAuth();
  const [studentLogin, { isLoading }] = useStudentLoginMutation();

  const handleSubmit = async (values: any) => {
    try {
      const response = await studentLogin(values);
      console.log("🚀 ~ handleSubmit ~ response:", response);
      if (response.error) {
        toast.error("Login Failed");
      } else {
        toast.success("Login successfully!");
        handleLogin(response?.data?.token);
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

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }
  // if (error) {
  //   return <h1>ERRROR </h1>;
  // }
  return (
    <>
      {isLoading && <Loader />}
      <div
        className="flex  min-h-[100vh] flex-1 flex-row bg-red-800"
        // style={{
        //   backgroundImage: `url(${APP_INFO.BACKGROUND_3})`,
        //   backgroundSize: "contain", // Ensures the image covers the entire container
        //   backgroundPosition: "right", // Centers the image
        // }}
      >
        <div className=" bg-white w-full md:max-w-md min-h-[100vh] items-center flex">
          <div className="w-full">
            <img
              alt="Your Company"
              src={APP_INFO.PRIMARY_LOGO}
              className="mx-auto h-30 w-auto"
            />

            <div className="px-6 pb-6    sm:px-12">
              <form onSubmit={formik.handleSubmit}>
                <h2 className="text-2xl/9  mb-8 font-bold   text-[#B3322F]">
                  Login
                </h2>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2 flex">
                    <input
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
                    <div className="text-sm text-red-600">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                {/* Password */}
                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputClass} ${
                        formik.touched.password && formik.errors.password
                          ? "outline-red-600"
                          : ""
                      }`}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-sm text-red-600">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Login Link */}
                <p className="my-4 text-center text-sm/6 text-gray-500">
                  Create a new account?{" "}
                  <Link
                    to={ROUTES.SIGNUP}
                    className="font-semibold text-[#B3322F]"
                  >
                    Signup
                  </Link>
                </p>

                {/* Signup Button */}
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#7C221F] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#B3322F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="h-[100vh] hidden md:flex sm:max-w-md text-white pl-4  justify-between align-middle items-center">
          <div style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)" }}>
            <h1 className="text-6xl   font-bold  ">
              Your Search for Better{" "}
              <span className="text-red-400 "> Student Housing </span> Ends Here
              —
            </h1>
            <h4 className="text-2xl mt-5  tracking-tight">
              {/* <span className="text-red-400 font-bold">"Nextroom.ca"</span>, */}
              {APP_INFO.TAGLINE}
            </h4>
          </div>

          <img
            alt="Your Company"
            src={STUDENT_IMAGES.SQUARE_A_2}
            className="mx-auto h-50 w-auto hidden lg:flex absolute right-10 top-10 rounded-2xl opacity-90 shadow-red-950 shadow-2xl "
          />
          <img
            alt="Your Company"
            src={STUDENT_IMAGES.SQUARE_A_3}
            className="mx-auto h-50 w-auto hidden xl:flex absolute right-65 2xl:top-25 top-10 rounded-2xl opacity-90 shadow-red-950 shadow-2xl "
          />
          <img
            alt="Your Company"
            src={STUDENT_IMAGES.SQUARE_A_4}
            className="mx-auto h-50 w-auto hidden xl:flex absolute right-65 2xl:top-80 bottom-10 rounded-2xl opacity-90 shadow-red-950 shadow-2xl "
          />
          <img
            alt="Your Company"
            src={STUDENT_IMAGES.SQUARE_A_5}
            className="mx-auto h-50 w-auto hidden lg:flex absolute right-10 2xl:top-65 bottom-10 rounded-2xl  opacity-90 shadow-red-950 shadow-2xl  "
          />
        </div>
      </div>
    </>
  );
};

export default Login;
