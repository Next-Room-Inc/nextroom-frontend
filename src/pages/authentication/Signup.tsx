import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Loader from "../../components/Loader";
import AlwaysWinnerModal from "../../components/modals/AlwaysWinnerModal.tsx";
import FollowInstagramModal from "../../components/modals/FollowInstagramModal.tsx";
import useAuth from "../../custom-hooks/useAuth.tsx";
import { useLocalStorage } from "../../hooks/useLocalStorage.tsx";
import SignupLayout from "../../layouts/Signup.Layout.tsx";
import { useStudentSignupMutation } from "../../redux/services/auth.service";
import { ROUTES } from "../../utils/constants";
import { StudentSignupPayload } from "../../utils/interfaces";
import { SignupSchema } from "../../utils/schemas/auth.schema";

const inputClass = `block w-full rounded-full shadow-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6`;

const universities = [
  "The University of Ottawa",
  "Carleton University",
  "Algonquin College",
  "Collège La Cité",
];

const Signup = () => {
  const [searchParams] = useSearchParams();
  const { handleLogin } = useAuth();
  const [open, setOpen] = useState<number | null>(null);
  const [response, setResponse] = useState<string>("");
  const [studentSignup, { isLoading }] = useStudentSignupMutation();
  const [, setAuth] = useLocalStorage("auth");
  const [submitStep, setSubmitStep] = useState(false);

  const handleSubmit = async (values: StudentSignupPayload) => {
    try {
      console.log("searchParams=>", searchParams)
      const payload = values;
      const refTag = searchParams.get('refTag');
      if (refTag) {
        payload['tag'] = refTag
      }
      console.log("payload=>", payload)
      // const properties = searchParams.getAll('property'); // ['alma', 'theo']
      const res = await studentSignup(values);
      const errorMessage = (res.error as any)?.data ?? "Account Creation Failed";
      if (res.error) toast.error(errorMessage);
      else {
        setOpen(1);
        setAuth({
          email: values.email,
          lastName: values.lastName,
          firstName: values.firstName,
        });
        setResponse(res?.data?.token);
        // await handleLogin(response)
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const nextStepHandler = () => { setOpen(2) }

  return (
    <>
      {open === 1 && <FollowInstagramModal {...{ nextStepHandler }} />}
      {open === 2 && <AlwaysWinnerModal {...{ handleNext }} />}
      {isLoading && <Loader />}
      <SignupLayout>
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

                <div className="mt-2 flex">
                  <input
                    placeholder="Email address"
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
                  <div className="text-sm text-red-600">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
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
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-sm text-red-600">
                      {formik.errors.password}
                    </div>
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

              {/* Signup Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-50 justify-center rounded-full mx-auto bg-[#7C221F] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#B3322F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
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

                  <div className="mt-2">
                    <input
                      placeholder="First Name"
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputClass} ${formik.touched.firstName && formik.errors.firstName
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

                  <div className="mt-2">
                    <input
                      placeholder="Last Name"
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputClass} ${formik.touched.lastName && formik.errors.lastName
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
                  <div className="mt-2 grid grid-cols-1">
                    <select

                      id="university"
                      name="university"
                      className=" rounded-full shadow-md col-start-1 row-start-1 w-full appearance-none bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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

                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="age"
                      name="age"
                      className="rounded-full shadow-md col-start-1 row-start-1 w-full appearance-none bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                  <div className="mt-2">
                    <input
                      placeholder="Phone Number (Optional)"
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${inputClass} ${formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                          ? "outline-red-600"
                          : ""
                        }`}
                    />
                    {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber ? (
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
                    className={`${personalInfoValidationError ? "opacity-20" : ""
                      } flex w-60 mx-auto mt-4 justify-center rounded-full bg-[#7C221F] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#B3322F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}
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

      </SignupLayout>

    </>
  );
};

export default Signup;
