import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import Loader from "../../components/Loader";
import GiveAwayModal from "../../components/modals/GiveAwayModal.tsx";
import { useLocalStorage } from "../../hooks/useLocalStorage.tsx";
import { useStudentSignupMutation } from "../../redux/services/auth.service";
import { APP_INFO, ROUTES } from "../../utils/constants";
import { ICONS, STUDENT_IMAGES } from "../../utils/constants/app-info.constant";
import { StudentSignupPayload } from "../../utils/interfaces";
import { SignupSchema } from "../../utils/schemas/auth.schema";
import useAuth from "../../custom-hooks/useAuth.tsx";

const inputClass =
  "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6";

const universities = [
  "The University of Ottawa",
  "Carleton University",
  "Algonquin College and Collège La Cité",
];

const Signup = () => {
  const { handleLogin } = useAuth();
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState<string>("");
  const [studentSignup, { isLoading }] = useStudentSignupMutation();
  const [, setAuth] = useLocalStorage("auth");
  const [submitStep, setSubmitStep] = useState(false);

  const handleSubmit = async (values: StudentSignupPayload) => {
    try {
      const response = await studentSignup(values);
      if (response.error) toast.error("Account Creation Failed");
      else {
        setOpen(true);
        setAuth({
          email: values.email,
          lastName: values.lastName,
          firstName: values.firstName,
        });
        setResponse(response?.data?.token);
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
      university: "",
      age: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(SignupSchema),
    onSubmit: handleSubmit,
  });

  // const handleClose = () => setOpen(false);
  const handleNext = async () => await handleLogin(response);

  const personalInfoValidationError: boolean =
  !formik?.touched?.firstName ||
  !!formik.errors.firstName ||
  !!formik.errors.lastName ||
  !!formik.errors.university;

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex min-h-[100vh] flex-1 flex-row bg-red-800">
        {/* Left Section */}
        <div className="bg-white w-full md:max-w-md min-h-[100vh] flex items-center">
          <div className="w-full px-6 pb-6 sm:px-12">
            <img
              alt="Your Company"
              src={APP_INFO.PRIMARY_LOGO}
              className="mx-auto h-30 w-auto mb-6"
            />

            <form onSubmit={formik.handleSubmit}>
              <h2 className=" text-2xl/9 font-bold mb-8  text-[#B3322F]">
                Sign up
              </h2>
              {submitStep && (
                <div
                  className="text-sm font-bold flex cursor-pointer items-center justify-end text-blue-700 hover:text-blue-400"
                  onClick={() => setSubmitStep(false)}
                >
                  <ArrowLeftIcon className="h-5 mr-2" />
                  <span>Previous Step</span>
                </div>
              )}
              {submitStep ? (
                <>
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

                  {/* Signup Button */}
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#7C221F] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#B3322F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                      Sign up
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Personal Info Form */}
                  <>
                    {" "}
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
                    {/* Universty */}
                    <div className="mb-2">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        University/college
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="university"
                          name="university"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          value={formik.values.university}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value={""}>
                            Select your university/college
                          </option>

                          {universities.map((university) => (
                            <option>{university}</option>
                          ))}
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />

                        {formik.touched.university &&
                        formik.errors.university ? (
                          <div className="text-sm text-red-600">
                            {formik.errors.university}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    {/* Age */}
                    <div className="mb-2">
                      <label
                        htmlFor="age"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Age
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="age"
                          name="age"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          value={formik.values.age}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value={""}>Select your age</option>
                          {[
                            "17",
                            "18",
                            "19",
                            "20",
                            "21",
                            "22",
                            "23",
                            "24",
                            "25",
                            "26+",
                          ].map((age) => (
                            <option>{age}</option>
                          ))}
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />

                        {formik.touched.age && formik.errors.age ? (
                          <div className="text-sm text-red-600">
                            {formik.errors.age}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    {/* phoneNumber */}
                    <div className="mb-2">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Phone Number{" "}
                        <span className="font-light">(optional)</span>
                      </label>
                      <div className="mt-2">
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="text"
                          value={formik.values.phoneNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`${inputClass} ${
                            formik.touched.phoneNumber && formik.errors.phoneNumber
                              ? "outline-red-600"
                              : ""
                          }`}
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                          <div className="text-sm text-red-600">
                            {formik.errors.phoneNumber}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    {/* Signup Button */}
                    <div>
                      <button
                        disabled={personalInfoValidationError}
                        onClick={() => setSubmitStep(true)}
                        className={`${
                          personalInfoValidationError ? "opacity-20" : ""
                        } flex w-full mt-4 justify-center rounded-md bg-[#7C221F] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#B3322F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}
                      >
                        Next Step
                      </button>
                    </div>
                  </>
                  {/* Personal Info Form */}
                </>
              )}

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
            </form>
          </div>
        </div>

        {/* Right section with images */}
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
            className="mx-auto h-45 w-auto hidden xl:flex absolute right-10 top-10 rounded-2xl opacity-90 shadow-red-950 shadow-2xl "
          />
          <img
            alt="Your Company"
            src={STUDENT_IMAGES.SQUARE_A_3}
            className="mx-auto h-45 w-auto hidden 2xl:flex absolute right-60  top-20 rounded-2xl opacity-90 shadow-red-950 shadow-2xl "
          />
          <img
            alt="Your Company"
            src={STUDENT_IMAGES.SQUARE_A_4}
            className="mx-auto h-45 w-auto hidden 2xl:flex absolute right-60  top-70 bottom-10 rounded-2xl opacity-90 shadow-red-950 shadow-2xl "
          />
          <img
            alt="Your Company"
            src={STUDENT_IMAGES.SQUARE_A_5}
            className="mx-auto h-45 w-auto hidden xl:flex absolute right-10  top-60 bottom-10 rounded-2xl  opacity-90 shadow-red-950 shadow-2xl  "
          />

          {/* Give Away circle */}
          <div
            className="shadow-2xl shadow-black font-semibold text-xl bg-red-700 h-[210px] w-[210px] pt-6 fixed bottom-0 right-0 transform flex flex-col items-center justify-center text-center"
            style={{ borderTopLeftRadius: "80%" }} // Inline style for border-top-left-radius
          >
            <img alt="" className="h-15 pr-2" src={ICONS.GIFT} />
            <span>
              Sign-Up to Enter <br /> Our Giveaway!
            </span>
          </div>
        </div>
      </div>
      {open && <GiveAwayModal {...{ handleNext }} />}
      {/* <Dialog open={open} onClose={handleClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              style={{
                backgroundImage: `url(${APP_INFO.BACKGROUND_3})`,
                backgroundSize: "contain",
                backgroundPosition: "right",
              }}
              transition
              className="relative transform overflow-hidden rounded-lg bg-red-200 px-6 pt-6 pb-6 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-8 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)" }}>
                <div>
                  <img
                    alt="Your Company"
                    src={APP_INFO.CLV_LOGO_BLUE}
                    className="h-10 w-auto"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-semibold text-white"
                  >
                    👋 Welcome to Nextroom!
                  </DialogTitle>
                  <div className="mt-4">
                    <p className="text-lg text-white">
                      This web application is currently in development.
                    </p>
                    <p className="mt-2 text-sm text-gray-100">
                      You're invited to explore the platform and browse through
                      the existing offers. Thank you for being part of our early
                      journey!
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex w-full justify-center rounded-md bg-red-700 px-4 py-3 text-lg font-semibold text-white shadow-lg shadow-red-900 hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Enter our give away →
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog> */}
    </>
  );
};

export default Signup;
