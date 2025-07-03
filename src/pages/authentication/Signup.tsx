import { ArrowLeftIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useFormik } from "formik";
import * as motion from "motion/react-client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import GiveAwayModal from "../../components/modals/GiveAwayModal";
import PasswordChecklist from "../../components/PasswordChecklist";
import useAuth from "../../custom-hooks/useAuth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import StudentSignupLayout from "../../layouts/StudentSignup.Layout";
import { useStudentSignupMutation } from "../../redux/services/auth.service";
import { APP_INFO } from "../../utils/constants";
import { StudentSignupPayload } from "../../utils/interfaces";
import { SignupSchema } from "../../utils/schemas/auth.schema";
import { ArrowUpTrayIcon, EyeIcon } from "@heroicons/react/20/solid";
import { CropperRef, Cropper, CircleStencil } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'
// import { motion } from "framer-motion";

const inputClass = `block w-full rounded-full  drop-shadow-md shadow-lg bg-white px-3 py-2 text-base text-gray-900 outline  placeholder:text-gray-400 sm:text-sm/6`;
const buttonClass = `w-[100%] bg-[#B3322F] hover:bg-[#C94541] mt-5 py-2 text-white rounded-full cursor-pointer`;


const Signup = () => {
  const { handleLogin } = useAuth();
  const [searchParams] = useSearchParams();
  // const { handleLogin } = useAuth();
  // const [signupSuccess, setSignupSuccess] = useState<boolean>(false);
  const [studentSignup, { isLoading }] = useStudentSignupMutation();
  const [, setAuth] = useLocalStorage("auth");
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState<string>("");
  const handleNext = async () => await handleLogin(response);

  const handleSubmit = async (values: StudentSignupPayload) => {
    try {
      console.log("searchParams=>", searchParams)
      const payload = values;
      const refTag = searchParams.get('refTag');
      if (refTag) {
        payload['tag'] = refTag
      }
      console.log("payload=>", payload)
      const res = await studentSignup(values);
      const errorMessage = (res.error as any)?.data ?? "Account Creation Failed";
      if (res.error) toast.error(errorMessage);
      else {
        formik.setValues({ ...formik.values, step: 4 });
        setOpen(true);
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
      gender: "",
      phoneNumber: "",
      pronouns: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
      step: 1,
    },
    validationSchema: toFormikValidationSchema(SignupSchema),
    onSubmit: handleSubmit,
  });



  const nextStepHandler = () => {
    const { step } = formik.values;
    const nextStep = step < 4 ? step + 1 : step;
    formik.setValues({ ...formik.values, step: nextStep });
  };
  const prevStepHandler = () => {
    const { step } = formik.values;
    const nextStep = step > 1 ? step - 1 : step;
    formik.setValues({ ...formik.values, step: nextStep });
  };

  return (
    <>
      {open && <GiveAwayModal {...{ handleNext }} />}

      <StudentSignupLayout>
        <form onSubmit={formik.handleSubmit}>
          {isLoading ? <LoaderComponent /> : <>
            {formik.values.step > 1 && formik.values.step < 4 && (
              <div
                className="text-sm font-bold flex  items-center justify-end text-[#B3322F] hover:text-[#b3312f6b]"

              >
                <ArrowLeftIcon className="h-5 mr-2" />
                <span className="cursor-pointer" onClick={() => prevStepHandler()}>Previous Step</span>
              </div>
            )}
            {formik.values.step <= 1 && <NameForm {...{ formik, nextStepHandler }} />}
            {formik.values.step === 2 && <SchoolForm {...{ formik, nextStepHandler }} />}
            {formik.values.step === 3 && <ImageUploadComponent {...{ formik, nextStepHandler }} />}
            {formik.values.step === 4 && <PasswordForm {...{ formik, nextStepHandler, handleSubmit }} />}
            {formik.values.step === 5 && <EmailSentComponent />}

          </>}

        </form >
      </StudentSignupLayout >
    </>
  );
};

export default Signup;

const LoaderComponent = () => {
  const loaderImages = [
    `${APP_INFO.IMG_BASE_URL}icons/loader_icon_1.svg`,
    `${APP_INFO.IMG_BASE_URL}icons/loader_icon_2.svg`,
    `${APP_INFO.IMG_BASE_URL}icons/loader_icon_3.svg`,
    `${APP_INFO.IMG_BASE_URL}icons/loader_icon_4.svg`,
  ];
  const [currentFrame, setCurrentFrame] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % loaderImages.length);
    }, 100); // Change frame every 200ms
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>

      <img src={loaderImages[currentFrame]} alt="loader frame" className="h-16 w-16 mx-auto " />

    </>
  )
}

const EmailSentComponent = () => {
  return (
    <>
      <div className="text-center md:text-left"    >
        <h1 className="text-[#B3322F] text-2xl mb-8">Almost there! </h1>
        <img
          src={`${APP_INFO.IMG_BASE_URL}icons/receive_email_icon.svg`}
          className="h-15 mx-auto md:ml-0"

        />
        <p className="  mt-5 text-base ">
          We’ve sent a confirmation link to your email.
          Please check your inbox and click the link to
          verify your account.
        </p>

        <h6 className="text-[#B3322F] text-md mt-2 ">Didn’t get the email? </h6>

        <div className="text-center">
          <button type="button" className={buttonClass}  >
            Resend Email
          </button>
        </div>
      </div>


      {/*  */}
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
          id="email"
          name="email"
          type="email"
          className={`${inputClass} outline-white`}
        />
        <input
          placeholder="Alternative Phone Number"
          id="phone"
          name="phone"
          type="phone"
          className={`${inputClass} outline-white  `}
        />
      </div>

      <div className="text-center">
        <button type="button" className={buttonClass}  >
          Submit
        </button>
      </div>


    </>
  )
}

interface PasswordFormProps {
  formik: any; // ideally use Formik type
}
const PasswordForm: React.FC<PasswordFormProps> = ({ formik }) => {
  const isError = !formik.touched.confirmPassword || formik.errors.password || formik.errors.confirmPassword
  const [passwordType, setPasswordType] = useState(true)
  const [confirmPasswordType, setConfirmPasswordType] = useState(true)
  const PasswordEyeToggleIcon = passwordType ? EyeIcon : EyeSlashIcon;
  const ConfirmPasswordEyeToggleIcon = confirmPasswordType ? EyeIcon : EyeSlashIcon;

  return (
    <>
      <h1 className="text-[#B3322F] text-2xl ml-2 mb-4 text-center md:text-left">Select a password </h1>
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
              className={`block w-full pr-10 rounded-md bg-white py-0.5  pl-3 text-base text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none}`}
            />
            <PasswordEyeToggleIcon
              onClick={() => setPasswordType(!passwordType)}
              aria-hidden="true"
              className="absolute right-5 top-1/2 -translate-y-1/2 size-5 text-gray-500 cursor-pointer z-10"
            />
          </div>
          {formik.values.password && formik.touched.password   && formik.values.password.length ? (
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
          <div className={`${inputClass} relative ${formik.values.confirmPassword &&  formik.touched.password && formik.errors.password
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
              className="absolute right-5 top-1/2 -translate-y-1/2 size-5 text-gray-500 cursor-pointer z-10"
            />
          </div>
          {formik.values.confirmPassword && formik.touched.confirmPassword &&
            formik.errors.confirmPassword ? (
            <div className="text-sm text-red-600">
              {formik.errors.confirmPassword}
            </div>
          ) : null}
        </div>
      </div>

      <div className="text-center">
        <button className={`${isError ? "bg-gray-300 hover:bg-gray-300 " : ""} ${buttonClass}`} disabled={isError} type="submit">
          Sign Up
        </button>
      </div>
      <p className=" text-center mt-10 text-sm ">
        By clicking 'Sign Up,' you agree to our
        Terms of Service and Privacy Policy. You can access
        these at any time via the links in our footer.
      </p>
    </>
  )

}


interface SchoolFormProps {
  formik: any; // ideally use Formik type
  nextStepHandler: () => void;
}

const SchoolForm: React.FC<SchoolFormProps> = ({ formik, nextStepHandler }) => {
  const universityDomains: Record<string, string> = {
    "The University of Ottawa": "uottawa.ca",
    "Carleton University": "carleton.ca",
    "Algonquin College": "algonquinlive.ca",
    "Collège La Cité": "collegelacite.ca",
  };

  const isValidEmail = formik.values.email.split("@")[1]?.toLowerCase() === universityDomains[formik.values.university]
  const isError = !isValidEmail || !formik.touched.email || formik.errors.university || formik.errors.email

  console.log(formik)
  const schools = [
    { name: 'The University of Ottawa', icon: 'school_icon_1.svg' },
    { name: 'Carleton University', icon: 'school_icon_2.svg' },
    { name: 'Algonquin College', icon: 'school_icon_3.svg' },
    { name: 'Collège La Cité', icon: 'school_icon_4.svg' },
  ]

  return (
    <>

      <h1 className="text-[#B3322F] text-2xl ml-2 mb-4 text-center md:text-left">Choose your school</h1>

      <div className="grid gap-6 justify-center  grid-cols-2 md:grid-cols-2 lg:grid-cols-4 px-14 md:px-0">
        {schools.map((school, index) => (
          <div key={index} className={`flex justify-center items-center rounded-full md:w-20 md:h-20  h-25 w-25 ${formik.values.university === school.name ? "bg-[#B3322F]" : "bg-[#C9C1C1]"} hover:cursor-pointer `}
            onClick={() => formik.setFieldValue('university', school.name)} > <img src={`${APP_INFO.IMG_BASE_URL}icons/${school.icon}`}
              className={`md:w-20 md:h-20  h-25 w-25 md:p-4 p-5  `} alt={`School ${index}`} />
          </div>))}
      </div>
      {formik.errors.university ? (
        <div className="text-sm text-red-600 ml-3 mt-2">
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
          <div className="text-sm text-red-600 ml-3 mt-2">{formik.errors.email}</div>
        )}

        {!isValidEmail && !formik.errors.email ? (
          <div className="text-sm text-red-600 ml-3 mt-2">
            Email domain must match your selected university (e.g. uottawa.ca carleton.ca algonquinlive.ca collegelacite.ca for University of Ottawa)
          </div>
        ) : null}
      </div>
      {/* phoneNumber */}
      {/* <div className="mt-2 ">
        <p className="text-red-600 mt-4 ml-2">*Optional</p>
        <input
          placeholder="Phone Number"
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${inputClass} ${formik.touched.phoneNumber && formik.errors.phoneNumber
            ? "outline-red-600"
            : "outline-white"
            }`}
        />
      </div> */}
      {/* Pronouns */}

      <div className="mb-2">
        <p className="text-red-600 mt-4 ml-2">*Optional</p>
        <div className="mt-2 grid grid-cols-1">
          <select
            id="pronouns"
            name="pronouns"
            className="rounded-full col-start-1 row-start-1 w-full appearance-none bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 drop-shadow-md shadow-lg outline-white sm:text-sm/6"
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
          {/* <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          /> */}


        </div>
      </div>
      {/* Gender */}

      <div className="mb-2">
        <p className="text-red-600 mt-4 ml-2">*Optional</p>
        <div className="mt-2 grid grid-cols-1">
          <select
            id="gender"
            name="gender"
            className="rounded-full col-start-1 row-start-1 w-full appearance-none bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 drop-shadow-md shadow-lg outline-white sm:text-sm/6"
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
          {/* <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          /> */}


        </div>
      </div>
      {/* Age */}

      <div className="mb-2">
        <p className="text-red-600 mt-4 ml-2">*Optional</p>
        <div className="mt-2 grid grid-cols-1">
          <select
            id="age"
            name="age"
            className="rounded-full col-start-1 row-start-1 w-full appearance-none bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 drop-shadow-md shadow-lg outline-white sm:text-sm/6"
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
          {/* <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          /> */}


        </div>
      </div>

      {/* Button */}
      {/* Button */}
      <div className="text-center">
        <button className={`${isError ? "bg-gray-300 hover:bg-gray-300 " : ""} ${buttonClass}`} onClick={nextStepHandler} disabled={isError}>
          Next
        </button>
      </div>




    </>
  )
}


interface NameFormProps {
  formik: any; // ideally use Formik type
  nextStepHandler: () => void;
}

const NameForm: React.FC<NameFormProps> = ({ formik, nextStepHandler }) => {

  const isLastNameVisible = formik.values.firstName.length > 0 ? true : false;
  const isError = !formik.touched.firstName || (formik.errors.firstName || formik.errors.lastName)

  return (
    <>

      <div>
        <h1 className="text-[#B3322F] text-2xl ml-2 mb-8 font-semibold">Hey, what’s your name?</h1>

        {/* First Name */}
        <div>
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
            <div className="text-sm text-red-600 ml-3">{formik.errors.firstName}</div>
          )}
        </div>

        {/* Last Name always rendered but transition visibility */}

        <motion.div
          animate={{
            maxHeight: isLastNameVisible ? 100 : 0,
            opacity: isLastNameVisible ? 1 : 0,
            paddingTop: isLastNameVisible ? 16 : 0,
            paddingBottom: isLastNameVisible ? 16 : 0,
            pointerEvents: isLastNameVisible ? "auto" : "none",
          }}
          transition={{ duration: 0.8 }}
        // className="overflow-hidden"
        >
          {isLastNameVisible &&
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
            />}
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-sm text-red-600 mt-1 ml-3">{formik.errors.lastName}</div>
          )}
        </motion.div>


        {/* Button */}
        <div className="text-center">
          <button className={`${isError ? "bg-gray-300 hover:bg-gray-300 " : ""} ${buttonClass}`} onClick={nextStepHandler} disabled={isError}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};




const ImageUploadComponent: React.FC<{
  formik: any; // ideally use Formik type
  nextStepHandler: () => void;
}> = ({ formik, nextStepHandler }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const saveImageHandler = () => {
    formik.setValues({ ...formik.values, image: profileImage });
    nextStepHandler()
  }
  console.log(formik)
  return (
    <>

      <div>
        <h1 className="text-[#B3322F] text-center text-2xl ml-2 mb-8">Say Cheese!</h1>

        {profileImage === null ? <ProfilePhotoUploader {...{ formik, setProfileImage }} /> : <ImageHandler {...{ profileImage, setProfileImage }} />}

        {/*  */}
        {!profileImage && <p className="text-center text-[12px] ">Adding a profile photo is optional, but recommended — <br className="md:flex hidden" />
          it helps landlords put a face to your name and can make your rental <br className="md:flex hidden" />
          application feel more personal and trustworthy.</p>}
        {/* Button */}

        <div className="text-center">
          <button className={` ${buttonClass}`} onClick={profileImage ? saveImageHandler : nextStepHandler} >
            {profileImage ? "Done" : "Skip"}
          </button>
        </div>
      </div>
    </>
  );
};


const ProfilePhotoUploader: React.FC<{
  formik: unknown; // ideally use Formik type
  setProfileImage: (param: string) => void;
}> = ({ setProfileImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setProfileImage(imageUrl);
  //   }
  // };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64DataUrl = reader.result as string;
        setProfileImage(base64DataUrl);
      };

      reader.readAsDataURL(file); // Converts file to base64
    }
  }

  return (
    <div className="pb-5 relative">
      <img
        src={`${APP_INFO.IMG_BASE_URL}icons/owl_icon.svg`}
        className={`h-60 w-60 bg-[#CCCCCC] rounded-full p-5 mx-auto`}
      />
      <button onClick={handleButtonClick} className="text-[#B3322F]  hover:bg-gray-200 cursor-pointer  flex justify-center items-center shadow bg-white px-4 py-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px]">
        <ArrowUpTrayIcon className="w-4 mr-2 text-[#B3322F]  cursor-pointer" />
        Upload Profile Photo
      </button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
};

const ImageHandler: React.FC<{
  profileImage: string | null;
  setProfileImage: (image: string) => void;
}> = ({ profileImage, setProfileImage }) => {
  const cropperRef = useRef<CropperRef | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(true); // controls cropper or preview

  const handleCropSubmit = () => {
    const cropper = cropperRef.current;
    const canvas = cropper?.getCanvas();
    const imageDataUrl = canvas?.toDataURL();

    if (imageDataUrl) {
      setCroppedImage(imageDataUrl);
      setIsEditing(false); // move to preview mode
    }
  };

  const handleConfirm = () => {
    if (croppedImage) {
      setProfileImage(croppedImage);
      // Optionally, close modal or go to next step here
    }
  };

  const handleEditAgain = () => {
    setIsEditing(true);
  };

  console.log(handleConfirm)

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Cropper or Preview */}
      {isEditing ? (
        <div className="relative h-60 flex justify-center items-center">
          <Cropper
            ref={cropperRef}
            src={profileImage || ""}
            stencilComponent={CircleStencil}
            className="rounded-md shadow"
          />
        </div>
      ) : (
        <div className="flex justify-center items-center py-4">
          <img
            src={croppedImage || ""}
            alt="Cropped Preview"
            className="w-40 h-40 rounded-full object-cover border-2 border-gray-300 shadow"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-center gap-3 py-4">
        {isEditing ? (
          <button
            className="px-4 py-1 rounded-full bg-white border shadow-md hover:bg-gray-100 transition"
            onClick={handleCropSubmit}
          >
            Crop
          </button>
        ) : (
          <>
            <button
              className="px-4 py-1 rounded-full bg-white border shadow hover:bg-gray-100"
              onClick={handleEditAgain}
            >
              Edit
            </button>
            {/* <button
              className="px-4 py-1 rounded-full bg-green-500 text-white shadow hover:bg-green-600 transition"
              onClick={handleConfirm}
            >
              Confirm
            </button> */}
          </>
        )}
      </div>
    </div>
  );
};
