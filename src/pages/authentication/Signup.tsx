import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Loader from "../../components/Loader";
import { useStudentSignupMutation } from "../../redux/services/auth.service";
import { APP_INFO, ROUTES } from "../../utils/constants";
import { SignupSchema } from "../../utils/schemas/auth.schema";
import { STUDENT_IMAGES } from "../../utils/constants/app-info.constant";
import useAuth from "./Auth";

const inputClass = `block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6`;
const domain = "@uottawa.ca";

const Signup = () => {
  const { handleLogin } = useAuth();

  // const [isPersonalEmail, setIsPersonalEmail] = useState(false);
  const [studentSignup, { data, error, isLoading }] =
    useStudentSignupMutation();

  const handleSubmit = async (values: any) => {
    try {
      // Prepare payload
      const payload = {
        ...values,
        // email: isPersonalEmail ? values.email : values.email + domain,
        email: values.email + domain,
      };
      const response = await studentSignup(payload);
      console.log("🚀 ~ handleSubmit ~ response:", response);
      if (response.error) {
        toast.error("Account Creation Failed");
      } else {
        toast.success("Account Created successfully!");
        handleLogin(response?.data?.token);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred");
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(
      // isPersonalEmail ? SignupFromPersonalEmailSchema : SignupSchema
      SignupSchema
    ),
    onSubmit: handleSubmit,
  });

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }
  // if (error) {
  //   return <h1>ERRROR </h1>;
  // }
  console.log(data, isLoading, error);
  return (
    <>
      {isLoading && <Loader />}
      <div
        className="flex  min-h-[100vh] flex-1 flex-row bg-red-800"
        // style={{
        //   backgroundImage: `url(${APP_INFO.BACKGROUND_1})`,
        //   backgroundSize: "contain", // Ensures the image covers the entire container
        //   backgroundPosition: "right", // Centers the image
        // }}
      >
        <div className=" bg-white w-full md:max-w-md min-h-[100vh] items-center flex">
          <div className="w-full">
            {/* <Link to={ROUTES.HOME}> */}
            <img
              alt="Your Company"
              src={APP_INFO.PRIMARY_LOGO}
              className="mx-auto h-30 w-auto"
            />
            {/* </Link> */}

            <div className="px-6 pb-6    sm:px-12">
              <form onSubmit={formik.handleSubmit}>
                <h2 className=" text-2xl/9 font-bold mb-8  text-[#B3322F]">
                  Sign up
                </h2>

                {/* First Name */}
                <div className="mb-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputClass} ${
                        formik.touched.firstName && formik.errors.firstName
                          ? "outline-red-600"
                          : ""
                      }`}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="text-sm text-red-600">
                        {formik.errors.firstName}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Last Name */}
                <div className="mb-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputClass} ${
                        formik.touched.lastName && formik.errors.lastName
                          ? "outline-red-600"
                          : ""
                      }`}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="text-sm text-red-600">
                        {formik.errors.lastName}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Radio button */}
                {/* <div className="mt-5 mb-2">
                <Switch
                  checked={isPersonalEmail}
                  onChange={setIsPersonalEmail}
                  className="group pt-2  relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute size-full rounded-md bg-white"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out group-data-[checked]:bg-[#B3322F]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 inline-block size-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out group-data-[checked]:translate-x-5"
                  />
                </Switch>
                <span className="ml-3 text-sm">
                  <span className="text-gray-500">using personal email?</span>
                </span>
              </div> */}
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
                    <div className="flex shrink-0 items-center rounded-l-md bg-gray-100 px-3 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 sm:text-sm/6">
                      {domain}
                    </div>
                    {/* {!isPersonalEmail && (
                      <div className="flex shrink-0 items-center rounded-l-md bg-gray-100 px-3 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 sm:text-sm/6">
                        {domain}
                      </div> */}
                    {/* )} */}
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

                {/* Confirm Password */}
                <div className="mb-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputClass} ${
                        formik.touched.confirmPassword &&
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

                {/* Login Link */}
                <p className="my-4 text-center text-sm/6 text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to={ROUTES.LOGIN}
                    className="font-semibold text-[#B3322F]"
                  >
                    login
                  </Link>
                </p>

                {/* Signup Button */}
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#7C221F] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#B3322F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  >
                    Sign up
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
              <span className="text-red-400 font-bold">"Nextroom.ca"</span>,
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

export default Signup;
