import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import Loader from "@src/components/Loader";
import useAuth from "@src/custom-hooks/useAuth";
import { useStudentLoginMutation } from "@src/redux/services/auth.service";
import { ROUTES } from "@src/utils/constants";
import { LoginSchema } from "@src/utils/schemas/auth.schema";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";

const inputClass = `block w-full rounded-full shadow-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6`;

const LoginForm = () => {
    const { handleLogin } = useAuth();
    const [studentLogin, { isLoading }] = useStudentLoginMutation();
    const [passwordType, setPasswordType] = useState(true)
    const PasswordEyeToggleIcon = passwordType ? EyeIcon : EyeSlashIcon;


    const handleSubmit = async (values: any) => {
        try {
            const response = await studentLogin(values);

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

    // const emailValidationError: boolean = !!formik.errors.email || !formik.values.email
    const buttonClass = `w-[100%] bg-[#4D1614]  mt-5 py-2 text-white rounded-full `;
    const isError = !!(formik?.errors?.password || formik?.errors?.email)

    return (
        <div className="w-full  ">
            {isLoading && <Loader />}
            <form onSubmit={formik.handleSubmit}>
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
                            className={`px-5 ${inputClass} ${formik.touched.email && formik.errors.email
                                ? "outline-red-600"
                                : ""
                                }`}
                        />
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-sm text-white pl-5 pt-2">{formik.errors.email}</div>
                    ) : null}
                </div>
                {/* Password */}
                <div className="mb-2 mt-5">
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
                                className="absolute right-5 top-1/2 -translate-y-1/2 size-5 text-gray-500  z-10"
                            />
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-sm text-white  pl-5 pt-2">
                                {formik.errors.password}
                            </div>
                        ) : null}
                    </div>
                </div>



                {/*  Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    disabled={isError}
                    type={"submit"}
                    className={`${isError ? "bg-gray-300 hover:bg-gray-300 " : ""} ${buttonClass}`}
                // className={`px-20 w-full mt-5 rounded-full   bg-[#4D1614] py-2 text-lg  font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}
                // className={`px-20 w-full mt-5 rounded-full   bg-[#4D1614] py-2 text-lg  font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}
                >
                    Login
                </motion.button>

                <p className="mt-5 text-center text-sm/6 text-white font-semibold underline">
                    <Link to={ROUTES.FORGOT_PASSWORD}>Forgot Password</Link>
                </p>
            </form>
        </div>
    )
}

export default LoginForm