import {useFormik} from "formik";
import {Link} from "react-router-dom";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {toast} from "react-toastify";
import {useState} from "react";

import useAuth from "./Auth";
import Loader from "../../components/Loader";
import {APP_INFO, ROUTES} from "../../utils/constants";
import {StudentSignupPayload} from "../../utils/interfaces";
import {SignupSchema} from "../../utils/schemas/auth.schema";
import {STUDENT_IMAGES} from "../../utils/constants/app-info.constant";
import {useStudentSignupMutation} from "../../redux/services/auth.service";

import {Dialog, DialogBackdrop, DialogPanel, DialogTitle,} from "@headlessui/react";
import {useLocalStorage} from "../../hooks/useLocalStorage.tsx";

const inputClass =
    "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6";

const Signup = () => {
    const {handleLogin} = useAuth();
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState<string>('');
    const [studentSignup, {isLoading}] = useStudentSignupMutation();
    const [, setAuth] = useLocalStorage('auth');

    const handleSubmit = async (values: StudentSignupPayload) => {
        try {
            const response = await studentSignup(values);
            if (response.error)
                toast.error("Account Creation Failed");
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
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: toFormikValidationSchema(SignupSchema),
        onSubmit: handleSubmit,
    });


    const handleClose = () => setOpen(false);
    const handleNext = async () => await handleLogin(response);

    return (
        <>
            {isLoading && <Loader/>}
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

                {/* Right section with images */}
                <div
                    className="h-[100vh] hidden md:flex sm:max-w-md text-white pl-4  justify-between align-middle items-center">
                    <div style={{textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)"}}>
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

            <Dialog open={open} onClose={handleClose} className="relative z-10">
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
                            <div style={{textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'}}>
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
                                            You're invited to explore the platform and browse through the
                                            existing offers. Thank you for being part of our early journey!
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
            </Dialog>
        </>
    );
};

export default Signup;
