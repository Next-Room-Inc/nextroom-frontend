import { Button } from "@src/components/Button";
import Loader from "@src/components/Loader";
// import { ProfilePhotoUploader } from "@src/components/ProfilePhotoUploader";
import { ProfilePhotoUploader } from "@src/components/ProfilePhotoUploader";
import useAuth from "@src/custom-hooks/useAuth";
import { useGetProfilePhotoQuery, useGetProfileProgressQuery, useUpdateProfileDetailsMutation } from "@src/redux/services/auth.service";
import { StudentUpdatePayload } from "@src/utils/interfaces";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import 'react-advanced-cropper/dist/style.css';
import { toast } from "react-toastify";
import { FormStepper } from "../../../../components/FormStepper";

const inputClass = `block w-full rounded-full  drop-shadow-md shadow-lg bg-white px-3 py-2 text-base text-gray-900 outline  placeholder:text-gray-400 sm:text-sm/6`;
const buttonClass = `w-[100%] bg-[#B3322F] hover:bg-[#C94541] mt-5 py-2 text-white rounded-full `;


export const AccountDetails = () => {
    const { user } = useAuth()

    const { data: profileProgress } = useGetProfileProgressQuery(user?.userId ?? null);
    const { data: profileImage } = useGetProfilePhotoQuery(user?.userId ?? null);
    const [updateProfileDetails, { isLoading }] = useUpdateProfileDetailsMutation();
    const [section, setSection] = useState('Password')
    const steps = [
        { label: "Image", name: "Image" },
        { label: "General", name: "General" },
        { label: "Contact", name: "Contact" },
    ];


    const handleSubmit = async (values: StudentUpdatePayload) => {

        try {
            const payload = {
                ...values,
                email: user?.email || ""
            }
            const res = await updateProfileDetails(payload);
            const errorMessage = (res.error as any)?.data ?? "Account Updation Failed";

            if (res.error) toast.error(errorMessage);
            else {

                const message = res.data || "Account Updated Successfully"
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
                // nextStepHandler()
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            toast.error("An unexpected error occurred");
        }

    }

    const formik = useFormik({
        initialValues: {
            age: "",
            gender: "",
            phoneNumber: "",
            pronouns: "",
            alternativeEmail: "",
            alternativePhoneNumber: "",
            profilePhoto: "",
            step: 0,
        },
        // validationSchema: toFormikValidationSchema(),
        onSubmit: handleSubmit,
    });


    const nextStepHandler = () => {
        const { step } = formik.values;
        const nextStep = step <= 3 ? step + 1 : step;
        formik.setValues({ ...formik.values, step: nextStep });
    };

    // const prevStepHandler = () => {
    //     const { step } = formik.values;
    //     const nextStep = step > 1 ? step - 1 : step;
    //     formik.setValues({ ...formik.values, step: nextStep });
    // };

    useEffect(() => {
        formik.setFieldValue("gender", profileProgress?.age || "");
        formik.setFieldValue("gender", profileProgress?.gender || "");
        formik.setFieldValue("pronouns", profileProgress?.pronouns || "");
        formik.setFieldValue("alternativeEmail", profileProgress?.alternativeEmail || "");
        formik.setFieldValue("alternativePhoneNumber", profileProgress?.alternativePhoneNumber || "");
    }, [profileProgress])

    return (
        <>
            {isLoading && <Loader />}

            <div className="md:py-10 pb-10 px-10">
                <form onSubmit={formik.handleSubmit}>
                    {formik?.values?.step > 0 && <FormStepper {...{ formik, section, setSection, steps }} />}
                    {formik?.values?.step === 0 && <Welcome {...{ nextStepHandler }} />}

                    <div className="px-5 md:px-0 w-full md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto mt-10">
                        {/* {formik.values.step === 1 && <PasswordForm {...{ formik, nextStepHandler, handleSubmit }} />} */}
                        {formik.values.step === 1 && <ImageUploadComponent {...{ formik, nextStepHandler, profileImage }} />}
                        {formik.values.step === 2 && <NameForm {...{ formik, nextStepHandler, profileProgress }} />}
                        {formik.values.step === 3 && <AlternateContactInformation {...{ formik, handleSubmit }} />}
                    </div>
                </form>
            </div>
        </>
    )
}
export const Welcome: React.FC<{
    nextStepHandler: () => void;
}> = ({ nextStepHandler }) => {
    return (
        <div className="text-center w-full md:w-[80%] py-15 shadow-md mx-auto rounded-2xl">
            <p className="text-[#B3322F] text-xl">Welcome To Your Student Dashboard</p>
            <Button onClick={nextStepHandler} className="bg-[#B3322F] text-white w-full md:w-fit py-2 px-10 rounded-full mt-5">Finish Account Creation</Button>
            <p className=" mt-10">You’ve also been successfully added to the launch waitlist!</p>
        </div>)
}




const AlternateContactInformation: React.FC<{ formik: any; }> = ({ formik }) => {

    const isError = false
    return (
        <div>
            <div className="flex items-start gap-3  mx-auto mt-3">
                {/* Icon Circle */}
                <div className="w-6 h-6 min-w-6 bg-[#B3322F] rounded-full shadow-lg border-6 border-white flex-shrink-0" />
                {/* Notification Text */}
                <p className="text-[14px] tracking-tight leading-snug text-gray-700">
                    I wish to receive notifications via an alternative email address or phone number.
                    Please note:  Your student email address will always be used for verification.
                </p>
            </div>

            <div className="flex flex-col gap-4 pt-8 pb-4">
                <input
                    placeholder="Alternative Email Address"
                    id="alternativeEmail"
                    name="alternativeEmail"
                    type="alternativeEmail"
                    value={formik.values.alternativeEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputClass} outline-white`}
                />
                <input
                    placeholder="Alternative Phone Number"
                    id="alternativePhoneNumber"
                    name="alternativePhoneNumber"
                    type="alternativePhoneNumber"
                    value={formik.values.alternativePhoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputClass} outline-white  `}
                />
            </div>

            <div className="text-center flex  gap-0 md:gap-5 flex-col md:flex-row">
                <button className={`${isError ? "bg-gray-300 hover:bg-gray-300 " : ""} ${buttonClass}`} type="submit">
                    Submit
                </button>
                <button className={`${isError ? "bg-gray-300 hover:bg-gray-300 " : ""} ${buttonClass}`}  >
                    Skip
                </button>
            </div>
        </div>
    )
}

// const PasswordForm: React.FC<{
//     formik: any; // ideally use Formik type
//     nextStepHandler: () => void;
// }> = ({ formik, nextStepHandler }) => {
//     const isError = formik.errors.password || formik.values.password !== formik.values.confirmPassword
//     const [passwordType, setPasswordType] = useState(true)
//     const [confirmPasswordType, setConfirmPasswordType] = useState(true)
//     const PasswordEyeToggleIcon = passwordType ? EyeIcon : EyeSlashIcon;
//     const ConfirmPasswordEyeToggleIcon = confirmPasswordType ? EyeIcon : EyeSlashIcon;

//     return (
//         <>
//             <h1 className="text-[#B3322F] text-2xl ml-2 mb-4 text-center ">Select a password </h1>
//             {/* Password */}
//             <div className="mb-2">
//                 <div className="mt-2">
//                     <div className={`${inputClass} relative ${formik.values.password && formik.touched.password && formik.errors.password
//                         ? "  outline-1 outline-red-600"
//                         : "  outline-1 outline-gray-300"} `}>
//                         <input
//                             placeholder="Password"
//                             id="password"
//                             name="password"
//                             type={passwordType ? "password" : "text"}
//                             value={formik.values.password}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             className={`block w-full pr-10 rounded-md bg-white py-0.5  pl-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none}`}
//                         />
//                         <PasswordEyeToggleIcon
//                             onClick={() => setPasswordType(!passwordType)}
//                             aria-hidden="true"
//                             className="absolute right-5 top-1/2 -translate-y-1/2 size-5 text-gray-500  z-10"
//                         />
//                     </div>
//                     {formik.values.password && formik.touched.password && formik.values.password.length ? (
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, ease: "easeOut" }}
//                         >
//                             <PasswordChecklist password={formik.values.password} />
//                         </motion.div>
//                     ) : null}
//                 </div>
//             </div>

//             {/* Confirm Password */}
//             <div className="mb-2">
//                 <div className="mt-4">
//                     <div className={`${inputClass} relative ${formik.values.confirmPassword && formik.touched.password && formik.errors.password
//                         ? "  outline-1 outline-red-600"
//                         : "  outline-1 outline-gray-300"} `}>
//                         <input
//                             placeholder="Confirm Password"
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             type={confirmPasswordType ? "password" : "text"}
//                             value={formik.values.confirmPassword}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             className={`block w-full pr-10 rounded-md bg-white py-0.5  pl-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none}`}

//                         />
//                         <ConfirmPasswordEyeToggleIcon
//                             onClick={() => setConfirmPasswordType(!confirmPasswordType)}
//                             aria-hidden="true"
//                             className="absolute right-5 top-1/2 -translate-y-1/2 size-5 text-gray-500  z-10"
//                         />
//                     </div>
//                     {formik.values.confirmPassword && formik.touched.confirmPassword &&
//                         formik.values.password !== formik.values.confirmPassword ? (
//                         <div className="text-sm text-red-600">
//                             Passwords do not match
//                         </div>
//                     ) : null}
//                 </div>
//             </div>

//             <div className="text-center">
//                 <button className={`${isError ? "bg-gray-300 hover:bg-gray-300 " : ""} ${buttonClass}`} disabled={isError} onClick={nextStepHandler}>
//                     Next
//                 </button>
//             </div>
//         </>
//     )

// }

const ImageUploadComponent: React.FC<{
    formik: any; // ideally use Formik type
    nextStepHandler: () => void;
    profileImage: string | null
}> = ({ formik, nextStepHandler, profileImage: image }) => {

    const [profileImage, setProfileImage] = useState<string | null>(image || null);

    const saveImageHandler = () => {

        formik.setFieldValue("profilePhoto", profileImage);
        nextStepHandler()
    }

    return (
        <>

            <div>
                <h1 className="text-[#B3322F] text-center text-2xl ml-2 mb-8">Say Cheese!</h1>

                {/* <img
                    src={profileImage || ""}
                    alt="Cropped Preview"
                    className="w-40 h-40 rounded-full object-cover border-2 border-gray-300 shadow"
                /> */}

                <ProfilePhotoUploader profileImage={profileImage} setProfileImage={setProfileImage} />

                {!profileImage && <p className="text-center text-[12px] ">Adding a profile photo is optional, but recommended — <br className="md:flex hidden" />
                    it helps landlords put a face to your name and can make your rental <br className="md:flex hidden" />
                    application feel more personal and trustworthy.</p>}
                {/* Button */}

                <div className="text-center">
                    <button type="button" className={` ${buttonClass}`} onClick={profileImage ? saveImageHandler : nextStepHandler} >
                        {profileImage ? "Done" : "Skip"}
                    </button>
                </div>
            </div>
        </>
    );
};

const NameForm: React.FC<{
    formik: any; // ideally use Formik type
    nextStepHandler: () => void;
}> = ({ formik, nextStepHandler }) => {
    const isError = formik?.values?.pronouns?.trim() === "" || formik?.values?.gender?.trim() === "" || formik?.values?.age?.trim() === ""

    return (
        <>


            <h1 className="text-[#B3322F] text-2xl ml-2 mb-4 text-center ">Tell Us More!</h1>

            <div className="  my-6">
                <div className=" grid grid-cols-1">
                    <select
                        id="pronouns"
                        name="pronouns"
                        className="rounded-full col-start-1 row-start-1 w-full appearance-none bg-white py-2.5 pr-8 pl-3 text-base text-gray-900 drop-shadow-md shadow-lg outline-white sm:text-sm/6"
                        value={formik.values.pronouns}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        {/* Placeholder */}
                        <option value="" disabled hidden className="text-gray-100">
                            Pronouns
                        </option>

                        {/* Pronoun options */}
                        {["He/Him", "She/Her", "They/Them", "Prefer Not To Say"].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>


                </div>
                {formik?.errors?.pronouns ? (
                    <div className="text-sm text-red-600 ml-3 mt-2">
                        {formik.errors.pronouns}
                    </div>
                ) : null}
            </div>
            {/* Gender */}

            <div className="my-6">
                <div className=" grid grid-cols-1">
                    <select
                        id="gender"
                        name="gender"
                        className="rounded-full col-start-1 row-start-1 w-full appearance-none bg-white py-2.5 pr-8 pl-3 text-base text-gray-900 drop-shadow-md shadow-lg outline-white sm:text-sm/6"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        {/* Placeholder */}
                        <option value="" disabled hidden className="text-gray-100">
                            Gender
                        </option>

                        {/* Pronoun options */}
                        {["Male", "Female", "Prefer Not To Say", "Other"].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                </div>
                {formik.errors.gender ? (
                    <div className="text-sm text-red-600 ml-3 mt-2">
                        {formik.errors.gender}
                    </div>
                ) : null}
            </div>
            {/* Age */}

            <div className="my-6">
                <div className=" grid grid-cols-1">
                    <select
                        id="age"
                        name="age"
                        className="rounded-full col-start-1 row-start-1 w-full appearance-none bg-white py-2.5 pr-8 pl-3 text-base text-gray-900 drop-shadow-md shadow-lg outline-white sm:text-sm/6"
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        {/* Placeholder */}
                        <option value="" disabled hidden className="text-gray-100">
                            Age
                        </option>

                        {/* Pronoun options */}
                        {["17", "18", "19", "20", "21", "22", "23", "24", "25", "26+"].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>



                </div>
                {formik.errors.age ? (
                    <div className="text-sm text-red-600 ml-3 mt-2">
                        {formik.errors.age}
                    </div>
                ) : null}
            </div>
            {/* Button */}
            <div className="text-center">
                <button className={`${isError ? "bg-gray-300 hover:bg-gray-300 " : ""} ${buttonClass}`} onClick={nextStepHandler} disabled={isError}>
                    Next
                </button>
            </div>




        </>
    )
};
