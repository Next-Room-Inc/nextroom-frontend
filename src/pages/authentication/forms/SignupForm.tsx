import { EyeSlashIcon } from "@heroicons/react/16/solid";
import { useFormik } from "formik";
import * as motion from "motion/react-client";
import { useState } from "react";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ChevronLeftIcon, EyeIcon } from "@heroicons/react/20/solid";
import { FormStepper } from "@src/components/FormStepper";
import Loader from "@src/components/Loader";
// import { useLocalStorage } from "@src/hooks/useLocalStorage";
import PasswordChecklist from "@src/components/PasswordChecklist";
import { useResendVerificationMutation, useStudentSignupMutation } from "@src/redux/services/auth.service";
import { APP_INFO } from "@src/utils/constants";
import { StudentSignupPayload } from "@src/utils/interfaces";
import { SignupSchema } from "@src/utils/schemas/auth.schema";
import { generatePassword } from "@src/utils/functions";
// import { motion } from "framer-motion";
// import { Popover } from 'react-tiny-popover'


const steps = [
    { label: "name", name: "name" },
    { label: "email", name: "email" },
    { label: "password", name: "password" },
    { label: "confirm", name: "confirm" },
];


const inputClass = `block w-full rounded-full  drop-shadow-md shadow-lg bg-white px-3 py-2 text-base text-gray-900 outline  placeholder:text-gray-400 sm:text-sm/6`;
const buttonClass = `w-[100%] bg-[#4D1614] hover:bg-[#C94541] mt-5 py-2 text-white rounded-full `;


const SignupForm = () => {
    const [studentSignup, { isLoading: isStudentSignUpLoading }] = useStudentSignupMutation();
    const [resendVerification, { isLoading: isResendVerificationLoading }] = useResendVerificationMutation();

    // const [, setAuth] = useLocalStorage("auth");
    const [section, setSection] = useState('name')

    // const handleSubmit = async (values: any) => {
    //     

    //     // nextStepHandler()
    // }

    const handleSubmit = async (values: StudentSignupPayload) => {
        try {
            const { step, ...payload } = values
            const res = await studentSignup(payload);
            const errorMessage = (res.error as any)?.data ?? "Account Creation Failed";

            if (res.error) toast.error(errorMessage);
            else {

                const message = res.data || "Registration successful. Please check your email to verify your account."
                toast.success(message);
                // formik.setValues({ ...formik.values, step: 3 });
                // setOpen(true);
                // setAuth({
                //     email: values.email,
                //     lastName: values.lastName,
                //     firstName: values.firstName,
                // });
                // setResponse(res?.data?.token);
                // await handleLogin(response)
                nextStepHandler()
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
            email: "",
            password: "",
            confirmPassword: "",
            step: 1,
            role: "student"

        },
        validationSchema: toFormikValidationSchema(SignupSchema),
        onSubmit: handleSubmit,
    });

    const nextStepHandler = () => {
        const { step } = formik.values as any;
        const nextStep = step < 4 ? step + 1 : step;
        formik.setValues({ ...formik.values, step: nextStep });
    };

    const prevStepHandler = () => {
        const { step } = formik.values as any;
        const nextStep = step > 1 ? step - 1 : step;
        formik.setValues({ ...formik.values, step: nextStep });
    };

    const resendEmailHandler = async () => {
        const { email = "" } = formik?.values as StudentSignupPayload;
        // 

        try {
            const res = await resendVerification({ email });
            const errorMessage = (res.error as any)?.data ?? "Resend Verification Failed";
            if (res.error) toast.error(errorMessage);
            else {
                toast.success("If your account is unverified, a new verification email has been sent!");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            toast.error("An unexpected error occurred");
        }

    }



    return (
        <div className=" ">
            {(isStudentSignUpLoading || isResendVerificationLoading) && <Loader />}
            <form onSubmit={formik.handleSubmit}>

                <div className="  mx-auto">
                    {formik.values.step === 1 && <Name {...{ formik, nextStepHandler }} />}
                    {formik.values.step === 2 && <Email {...{ formik, prevStepHandler, nextStepHandler }} />}
                    {formik.values.step === 3 && <PasswordForm {...{ formik, nextStepHandler, prevStepHandler }} />}
                    {formik.values.step === 4 && <Verify {...{ formik, resendEmailHandler }} />}
                </div>
                <div className="pt-20 px-5 md:px-10 ">
                    {<FormStepper {...{ formik, section, setSection, steps, color: "4D1614" }} />}

                </div>

            </form>
        </div>
    )
}

export default SignupForm

const PasswordForm: React.FC<{
    formik: any; // ideally use Formik type
    prevStepHandler: () => void
}> = ({ formik, prevStepHandler }) => {
    const isError = formik.errors.password || formik.values.password !== formik.values.confirmPassword
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
        <div className="w-full md:w-[50%] lg:w-[40%] xl:w-[30%] mx-auto">
            {/* <h1 className="text-white text-2xl ml-2 mb-4 text-center ">Select a password </h1> */}
            <h1 className="text-4xl text-center mb-10">Select a password</h1>
            {/* Password */}

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

            <div className="text-center">
                <button type="submit" className={`${isError ? "bg-gray-300 hover:bg-gray-300 " : ""} ${buttonClass}`} disabled={isError}  >
                    Next
                </button>
                <p className="text-white flex items-center justify-center mt-5" onClick={prevStepHandler}> <ChevronLeftIcon className="w-5 mt-1" /> Back</p>

            </div>
        </div>
    )

}

const Name: React.FC<{
    formik: any; // ideally use Formik type
    nextStepHandler: () => void;
}> = ({ formik, nextStepHandler }) => {
    const isError = !formik.touched.firstName || (formik.errors.firstName || formik.errors.lastName)

    return (
        <>

            <div className="w-full md:w-[50%] lg:w-[40%] xl:w-[30%] mx-auto">
                <h1 className="text-4xl text-center mb-10">Let’s Get You Signed Up!</h1>
                {/* First Name */}
                <div className="py-2">
                    <div className="mt-2 flex">
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
                                : "outline-white"
                                }`}
                        />
                    </div>
                    {formik.touched.firstName && formik.errors.firstName && (
                        <div className="text-sm text-white pl-5 pt-2">{formik.errors.firstName}</div>
                    )}
                </div>

                {/* Last Name always rendered but transition visibility */}
                <div className="py-2">
                    <div className="mt-2 flex">
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
                                : "outline-white"
                                }`}
                        />
                    </div>
                    {formik.touched.lastName && formik.errors.lastName && (
                        <div className="text-sm text-white pl-5 pt-2">{formik.errors.lastName}</div>
                    )}
                </div>

                {/* Button */}
                <div className="text-center">
                    <button type="button" className={`${isError ? "bg-gray-300 hover:bg-gray-300 " : ""} ${buttonClass}`} onClick={nextStepHandler} disabled={isError}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
const Email: React.FC<{
    formik: any; // ideally use Formik type
    prevStepHandler: () => void
    nextStepHandler: () => void
}> = ({ formik, prevStepHandler, nextStepHandler }) => {
    const universityDomains: Record<string, Array<string>> = {
        "The University of Ottawa": ["uottawa.ca"],
        "Carleton University": ["carleton.ca", "cmail.carleton.ca", "cunet.carleton.ca"],
        "Algonquin College": ["algonquinlive.ca"],
        "Collège La Cité": ["collegelacite.ca"],
    };

    const emailDomain = formik.values.email.split("@")[1]?.toLowerCase();

    const isValidEmail = universityDomains[formik.values.university]?.includes(emailDomain);
    // const isValidEmail = true
    const isError = !isValidEmail || !formik.touched.email || formik.errors.university || formik.errors.email

    // 
    const schools = [
        { name: 'The University of Ottawa', icon: 'school_icon_1.svg' },
        { name: 'Carleton University', icon: 'school_icon_2.svg' },
        { name: 'Algonquin College', icon: 'school_icon_3.svg' },
        { name: 'Collège La Cité', icon: 'school_icon_4.svg' },
    ]

    return (
        <div className="w-full md:w-[50%] lg:w-[40%] xl:w-[30%] mx-auto">
            <h1 className="text-4xl text-center mb-10">What’s your email?</h1>

            <div className="grid gap-6 justify-center  grid-cols-2 md:grid-cols-2 lg:grid-cols-4 px-14 md:px-0">
                {schools.map((school, index) => (
                    <div key={index} className={`flex justify-center items-center rounded-full md:w-20 md:h-20  h-25 w-25 ${formik.values.university === school.name ? "bg-[#4D1614]" : "bg-[#C9C1C1]"} hover: `}
                        onClick={() => formik.setFieldValue('university', school.name)} > <img src={`${APP_INFO.IMG_BASE_URL}icons/${school.icon}`}
                            className={`md:w-20 md:h-20  h-25 w-25 md:p-4 p-5  `} alt={`School ${index}`} />
                    </div>))}
            </div>
            {formik.errors.university ? (
                <div className="text-sm text-white ml-3 mt-2">
                    {formik.errors.university}
                </div>
            ) : null}


            {/* Email */}
            <div className="mt-6 ">
                <input
                    placeholder="Student Email Address"
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputClass} ${formik.touched.email && formik.errors.email
                        ? "outline-red-600"
                        : "outline-white"
                        }`}
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="text-sm text-white pl-5 pt-2">{formik.errors.email}</div>
                )}

                {!isValidEmail && !formik.errors.email ? (
                    <div className="text-sm text-white pl-5 pt-2">
                        Email domain must match your selected university (e.g. {Object.values(universityDomains)
                            .flat()
                            .map((domain, index, arr) => (
                                <span key={domain} className="font-semibold">
                                    {domain}
                                    {index < arr.length - 1 && ", "}
                                </span>
                            ))} for University of Ottawa)
                    </div>
                ) : null}
            </div>

            {/* Button */}
            <div className="text-center">
                <button onClick={nextStepHandler} className={`${isError ? "bg-gray-300 hover:bg-gray-300 " : ""} ${buttonClass}`} disabled={isError}>
                    Next
                </button>
                <p className="text-white flex items-center justify-center mt-5" onClick={prevStepHandler}> <ChevronLeftIcon className="w-5 mt-1" /> Back</p>
            </div>

        </div>
    )
}
const Verify: React.FC<{
    formik: any,
    resendEmailHandler: () => void
}> = ({ resendEmailHandler, formik }) => {
    return (
        <div className="text-center  w-full md:w-[50%] lg:w-[40%] xl:w-[30%] mx-auto"    >
            {/* <h1 className="text-white text-2xl mb-8">Almost there! </h1> */}
            <h1 className="text-4xl text-center mb-10">Almost there!</h1>

            <img
                src={`${APP_INFO.IMG_BASE_URL}icons/receive_email_icon.svg`}
                className="h-20 mx-auto "

            />
            <p className="  mt-5 text-base ">
                We’ve sent a confirmation link to your email <span className="font-bold">{formik?.values?.email || ""}</span>.
                Please check your inbox and click the link to
                verify your account.
            </p>

            <h6 className="text-white text-md mt-8 ">Didn’t get the email? </h6>

            <div className="text-center">
                <button type="button" className={buttonClass} onClick={resendEmailHandler} >
                    Resend Email
                </button>
            </div>
        </div>
    )
}