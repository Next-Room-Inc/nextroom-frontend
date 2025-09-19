import { Button } from "@src/components/Button";
import Loader, { LoaderComponent } from "@src/components/Loader";
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
    // console.log("==>", user)
    const userId = user?.userId || null
    const email = user?.email
    // const userId = 279
    // const email = "mekomi@uottawa.ca"
    const { data: profileProgress, isLoading: isloadingProfileProgress } = useGetProfileProgressQuery(userId);
    const { data: profileImage, isLoading: isloadingProfilePhoto } = useGetProfilePhotoQuery(userId);
    // const { data: profileProgress, isLoading: isloadingProfileProgress } = useGetProfileProgressQuery(user?.userId ?? null);
    // const { data: profileImage } = useGetProfilePhotoQuery(user?.userId ?? null);
    const [updateProfileDetails, { isLoading }] = useUpdateProfileDetailsMutation();
    const [section, setSection] = useState('Password')
    // const [stepsComponent, setStepComponents] = useState<any[]>([]);
    const [stepToAnswer, stepsToAnswer] = useState<any[]>([]);
    const [loader, setLoader] = useState<boolean>(true);

    const steps = [
        { label: "Image", name: "Image" },
        { label: "General", name: "General" },
        { label: "Contact", name: "Contact" },
    ];


    const handleSubmit = async (values: Partial<StudentUpdatePayload>) => {
        console.log('handleSubmit hit')
        try {
            const payload = { ...values, email }
            const res = await updateProfileDetails(payload);

            if (res.error) {
                const errorMessage = (res.error as any)?.data ?? "Account Updation Failed";
                toast.error(errorMessage);
            }
            else {
                console.log('res', res)
                const message = res.data || "Account Updated Successfully"
                toast.success(message);
                nextStepHandler()
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
        onSubmit: handleSubmit,
    });


    const nextStepHandler = () => {
        const { step } = formik.values;
        const nextStep = step < 4 ? step + 1 : step;
        console.log(formik.values, 'next step handler', step, nextStep)
        formik.setValues({ ...formik.values, step: nextStep });
    };

    useEffect(() => {
        if (!profileProgress) return;

        // const { age, gender, pronouns, alternativeEmail, alternativePhoneNumber, profileCompletionStep = 0 } = profileProgress;
        const { age, gender, pronouns, alternativeEmail, alternativePhoneNumber, } = profileProgress;
        const profileCompletionStep = 0
        formik.setFieldValue("age", age || "");
        formik.setFieldValue("gender", gender || "");
        formik.setFieldValue("pronouns", pronouns || "");
        formik.setFieldValue("alternativeEmail", alternativeEmail || "");
        formik.setFieldValue("alternativePhoneNumber", alternativePhoneNumber || "");
        formik.setFieldValue("step", profileCompletionStep || 0);

        const slicedSteps = steps.slice((profileCompletionStep) - 4);
        console.log(steps, "==>", profileCompletionStep, slicedSteps)

        stepsToAnswer(slicedSteps)
    }, [profileProgress]);

    // useEffect(() => {
    //     buildSteps();
    // }, [profileProgress, profileImage]);

    useEffect(() => {
        if (!isloadingProfileProgress && !isloadingProfilePhoto) setLoader(false)
    }, [isloadingProfileProgress, isloadingProfilePhoto]);


    const props = { formik, nextStepHandler, profileImage, profileProgress, handleSubmit, email };


    // const buildSteps = () => {

    //     // console.log("profileProgress==>", profileProgress)
    //     console.log("test 1 ==>", profileProgress?.alternativeEmail?.trim() !== "",)
    //     console.log("test 2 ==>", profileProgress?.alternativePhoneNumber?.trim() !== "")
    //     console.log("test 3 ==>", profileProgress?.skipAlternateContact)

    //     console.log("test==>", (profileProgress?.alternativeEmail?.trim() !== "" ||
    //         profileProgress?.alternativePhoneNumber?.trim() !== "" ||
    //         profileProgress?.skipAlternateContact))

    //     const steps = [
    //         (profileProgress?.skipProfilePhoto || profileImage)
    //             ? null : { label: "Image", name: "Image", component: ImageUploadComponent }
    //         ,

    //         !profileProgress?.pronouns && !profileProgress?.gender && !profileProgress?.age
    //             ? { label: "General", name: "General", component: NameForm }
    //             : null,

    //         (!profileProgress?.alternativeEmail?.trim() &&
    //             !profileProgress?.alternativePhoneNumber?.trim() &&
    //             !profileProgress?.skipAlternateContact)
    //             ? {
    //                 label: "Contact",
    //                 name: "Contact",
    //                 component: AlternateContactInformation
    //             }
    //             : null
    //         ,
    //     ].filter(Boolean); // removes null entries

    //     if (!steps.length) formik.setFieldValue("step", 1);
    //     setStepComponents(steps);

    // };


    // console.log("formik==>", formik.values)
    // console.log("steps==>", stepsComponent)
    // const CurrentStep = stepsComponent[formik.values.step - 1]?.component;


    return (
        <>
            {isLoading && <Loader />}

            <div className="md:py-10 pb-10 px-10">
                {loader ? <Loading /> :
                    // {(isloadingProfileProgress || isloadingProfilePhoto) ? <Loading /> :
                    <form onSubmit={formik.handleSubmit}>
                        {formik?.values?.step > 0 && formik?.values?.step < 4 && <FormStepper {...{ formik, section, setSection, steps: stepToAnswer }} />}
                        {formik?.values?.step === 0 && <Welcome {...{ nextStepHandler }} />}

                        <div className="px-5 md:px-0 w-full md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto mt-10">
                            {/* {formik.values.step === 1 && <PasswordForm {...{ formik, nextStepHandler, handleSubmit }} />} */}

                            {/* {formik?.values?.step > 0 ? stepsComponent?.length ? stepsComponent[formik.values.step - 1]?.component || <></> : <div className="h-50 flex items-center justify-center">
                                <p>You’ve also been successfully submmitted your details!</p>
                            </div> : ""} */}
                            {/* <>
                                {formik.values.step > 0 ? (
                                    CurrentStep ? (
                                        <CurrentStep {...props} />
                                    ) : (
                                        <div className="h-50 flex items-center justify-center text-[#B3322F] text-xl text-center">
                                            <p>Thank you! We’ve already received your details.</p>
                                        </div>
                                    )
                                ) : null}
                            </> */}

                            {formik.values.step === 1 && <ImageUploadComponent {...props} />}
                            {formik.values.step === 2 && <NameForm {...props} />}
                            {formik.values.step === 3 && <AlternateContactInformation {...props} />}
                            {formik.values.step === 4 && <div className="h-50 flex items-center justify-center text-[#B3322F] text-xl text-center">
                                <p>Thank you! We’ve already received your details.</p>
                            </div>}
                        </div>
                    </form>}
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




const AlternateContactInformation: React.FC<{ formik: any; handleSubmit: (values: Partial<StudentUpdatePayload>) => void; }> = ({ formik, handleSubmit }) => {

    const isError = false

    const submitHandler = () => {
        const { alternativeEmail, skipProfilePhoto } = formik.values
        handleSubmit({ alternativeEmail, skipProfilePhoto, profileCompletionStep: 2 })
    }
    const skipHandler = () => handleSubmit({ skipAlternateContact: true, profileCompletionStep: 2 })

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
                <button type="button" className={`${isError ? "bg-gray-300 hover:bg-gray-300 " : ""} ${buttonClass}`} onClick={submitHandler}>
                    Submit
                </button>
                <button type="button" className={`${isError ? "bg-gray-300 hover:bg-gray-300 " : ""} ${buttonClass}`} onClick={skipHandler} >
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
    handleSubmit: (values: Partial<StudentUpdatePayload>) => void;
    profileImage: string | null
    email?: string | null
}> = ({ formik, handleSubmit, profileImage: image, email }) => {
    const [profileImage, setProfileImage] = useState<string | null>(image || null);

    console.log("-->", profileImage)

    // Helper: Convert image URL to base64
    const urlToBase64 = async (url: string): Promise<string> => {
        const response = await fetch(url);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob); // converts to base64 string
        });
    };

    const saveImageHandler = async () => {
        if (!profileImage) return
        let imagePayload = profileImage
        // If the initial image (from props) is a URL, convert it to base64
        if (image && image.startsWith("http")) {
            imagePayload = await urlToBase64(image);
        }

        formik.setFieldValue("profilePhoto", imagePayload);
        handleSubmit({ profilePhoto: imagePayload, skipProfilePhoto: false, email, profileCompletionStep: 2 })
    }

    const skipImageHandler = () => handleSubmit({ skipProfilePhoto: true, email, profileCompletionStep: 2 })


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
                    <button type="button" className={` ${buttonClass}`} onClick={profileImage ? saveImageHandler : skipImageHandler} >
                        {profileImage ? "Done" : "Skip"}
                    </button>
                </div>
            </div>
        </>
    );
};

const NameForm: React.FC<{
    formik: any; // ideally use Formik type
    email: any; // ideally use Formik type
    handleSubmit: (values: Partial<StudentUpdatePayload>) => void;
}> = ({ formik, handleSubmit, email }) => {
    const isError = formik?.values?.pronouns?.trim() === "" || formik?.values?.gender?.trim() === "" || formik?.values?.age?.trim() === "";
    const submit = () => {
        const { pronouns, gender, age } = formik.values
        handleSubmit({ pronouns, gender, age, email, profileCompletionStep: 3 })
    }

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
                <button type="button" className={`${isError ? "bg-gray-300 hover:bg-gray-300 " : ""} ${buttonClass}`} onClick={submit} disabled={isError}>
                    Next
                </button>
            </div>




        </>
    )
};


const Loading = () => {
    return (
        <div className="flex items-center justify-center h-50">
            <LoaderComponent />
        </div>
    )
}