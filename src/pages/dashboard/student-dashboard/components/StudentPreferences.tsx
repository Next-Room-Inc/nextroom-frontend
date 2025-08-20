import { ArrowLeftIcon, ArrowUpTrayIcon, CheckIcon, ChevronDownIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { CircleStencil, Cropper, CropperRef } from 'react-advanced-cropper';
import { toast } from 'react-toastify';
import { Button } from '../../../../components/Button';
import Invite from '../../../../components/Invite';
import Loader from '../../../../components/Loader';
import { ModalOverlay } from '../../../../components/ModalOverLay';
import useAuth from '@src/custom-hooks/useAuth';
import { useForgotPasswordMutation } from '@src/redux/services/auth.service';
import { APP_INFO } from '@src/utils/constants';
import { PrimaryButton } from '../../../onboarding/components/CommonComponents';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const options = [
    "Roommate Preferences",
    "Guarantor Preferences",
    "Reset Password",
    "Change Profile Picture",
    "Change Name or Email",
    "Change Onboarding Answers",
    "Upcoming Events",
];
const inputClass = `block w-full md:w-2/4 rounded-full mx-auto  drop-shadow-md shadow-lg bg-white px-3 py-2 text-base text-gray-900 outline  placeholder:text-gray-400 sm:text-sm/6`;

const StudentPreferences = () => {
    const [selectedOption, setsSelectedOption] = useState(options[0])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    return (
        <>
            <div className=' flex flex-col md:flex-row gap-4 my-5'>
                <div className='hidden lg:flex w-full md:w-1/4 flex-col px-4 py-4 bg-white shadow-xl rounded-2xl'>
                    {
                        options.map(option =>
                            <div
                                className={`${selectedOption === option ? "bg-[#B3322F] text-white" : "text-black"} rounded-full px-4 py-2 my-2  font-semibold`}
                                onClick={() => setsSelectedOption(option)}
                            >
                                {option}</div>
                        )
                    }
                </div>

                <div className="flex lg:hidden -mt-5 relative w-full">
                    {/* Toggle Button */}
                    <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="text-center flex items-center justify-center bg-[#B3322F] text-white shadow-md px-5 py-3 w-full rounded-full text-sm font-medium  relative"
                    >
                        {selectedOption} <ChevronDownIcon className='h-7 ml-2 mt-1 text-white' />
                    </div>

                    {/* Dropdown */}
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                key="dropdown"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-0 right-0 top-8 mt-2 mx-6 bg-white shadow-xl rounded-2xl px-5 py-4 text-sm z-40"
                            >
                                {options.map((tab) => (
                                    <div
                                        key={tab}
                                        className={`text-center py-2  hover:text-[#B3322F] ${selectedOption === tab ? "text-[#B3322F] font-semibold" : ""
                                            }`}
                                        onClick={() => {
                                            setsSelectedOption(tab);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {tab}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>



                </div>
                <div className='w-full md:w-3/4 bg-white shadow-xl rounded-2xl'>
                    {selectedOption === "Roommate Preferences" && <RoommatePreferences />}
                    {selectedOption === "Guarantor Preferences" && <GuarantorPreferences />}
                    {selectedOption === "Reset Password" && <ResetPassword />}
                    {selectedOption === "Change Profile Picture" && <ProfilePicture />}
                    {selectedOption === "Change Name or Email" && <ChangeNameOrEmail />}
                    {selectedOption === "Change Onboarding Answers" && <ChangeOnboardingAnswers />}
                    {selectedOption === "Upcoming Events" && <UpcomingEvents />}
                </div>
            </div>
        </>
    )
}

export default StudentPreferences



const RoommateReportModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <>
            <ModalOverlay onClose={onClose}>

                {/* Title */}
                <p className="text-center text-sm font-medium text-gray-800 mb-4">
                    Please provide all details of your report
                </p>

                {/* Textarea */}
                <textarea
                    className="bg-gray-100 text-sm text-gray-700 px-4 py-3 rounded-md shadow-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="Start Typing..."
                    rows={6}
                />

                {/* Submit Button */}
                <div className="flex justify-center mt-5">
                    <PrimaryButton
                        selected={true}
                        className="w-20 py-3 text-xs"
                        onClick={onClose}
                    >
                        Submit
                    </PrimaryButton>
                </div>
            </ModalOverlay>



        </>
    );
};
const RoommateRemoveModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <>
            <ModalOverlay onClose={onClose}>

                {/* Title */}
                <p className="text-center text-sm font-medium text-gray-800 mb-4">
                    Are you sure you want to remove roommate?
                </p>


                {/* Submit Button */}
                <div className="flex justify-center mt-5 gap-5">
                    <PrimaryButton
                        selected={true}
                        className="w-20 py-3 text-xs"
                        onClick={onClose}
                    >
                        Cancel
                    </PrimaryButton>
                    <PrimaryButton
                        selected={true}
                        className="w-20 py-3 text-xs"
                        onClick={onClose}
                    >
                        Remove
                    </PrimaryButton>
                </div>
            </ModalOverlay>



        </>
    );
};
const EditRoommateModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <>
            <ModalOverlay onClose={onClose}>

                {/* Title */}
                <p className="text-center text-sm font-medium text-gray-800 mb-4">
                    Edit Roommate Details
                </p>
                <div className='flex gap-3 flex-col items-center gap-x-3 py-4'> <img
                    src="/assets/img/search-property/student_profile (1).png"
                    alt={"loading..."}
                    className="w-25 h-25 rounded-full"
                />
                    <p className='text-[#B3322F]'>Name</p>
                    <input
                        placeholder={`John Doe`}
                        id="email"
                        name="email"
                        type="email"
                        className={`${inputClass} outline-white`}
                    />
                </div>



                {/* Submit Button */}
                <div className="flex justify-center mt-5 gap-5">
                    <PrimaryButton
                        selected={true}
                        className="w-20 py-3 text-xs"
                        onClick={onClose}
                    >
                        Submit
                    </PrimaryButton>
                </div>
            </ModalOverlay>



        </>
    );
};
const RoommatePreferences = () => {
    const Roommates = [
        { name: "Rae E" },
        { name: "Jessica R" },
        { name: "Pamela F" }
    ]
    const [step, setStep] = useState("preferences")
    const [reportModal, setReportModal] = useState(false)
    const [removeModal, setRemoveModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const backButtonHandler = () => setStep("preferences")


    return (
        <div className='p-6'>
            {reportModal && <RoommateReportModal onClose={() => setReportModal(false)} />}
            {removeModal && <RoommateRemoveModal onClose={() => setRemoveModal(false)} />}
            {editModal && <EditRoommateModal onClose={() => setEditModal(false)} />}

            {step === "preferences" ?
                <>
                    <h1 className='text-lg font-bold'>Current Roommate(s) On File:</h1>
                    {
                        Roommates.map(roommate =>
                            <div className='flex flex-col md:flex-row gap-4 justify-between my-2 lg:w-2/4 md:3/4 w-full md:items-center'>
                                <div className='flex items-center gap-x-3'> <img
                                    src="/assets/img/search-property/student_profile (1).png"
                                    alt={"loading..."}
                                    className="w-12 h-12 rounded-full"
                                />
                                    {roommate.name}
                                </div>
                                <div>
                                    <ul className='flex text-[#B3322F] gap-x-2'>
                                        <li onClick={() => setEditModal(true)} className=''>Edit</li>
                                        <li onClick={() => setRemoveModal(true)} className='border-r border-l px-2 '>Remove</li>
                                        <li className='' onClick={() => setReportModal(true)}>Report</li>
                                    </ul>
                                </div>
                            </div>

                        )
                    }
                    <hr className='w-full md:w-[80%] mt-10' />



                    <motion.button
                        onClick={() => setStep("invite")}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.03 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className={`hover:bg-black bg-[#B3322F]   md:w-[180px] text-center py-2 text-white rounded-full mt-5 w-full`}
                    >

                        Invite Roommate

                    </motion.button>
                </>
                :
                <>
                    <div>                    <ArrowLeftIcon className={` w-6 text-[#B3322F] `} onClick={backButtonHandler} /></div>
                    <h1 className='text-center font-semibold text-xl'>No Roommate(s) Yet? <br />
                        Invite Now!</h1>
                    <Invite />
                </>

            }


        </div>
    )
}
const GuarantorReportModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <>
            <ModalOverlay onClose={onClose}>

                {/* Title */}
                <p className="text-center text-sm font-medium text-gray-800 mb-4">
                    Please provide all details of your report
                </p>

                {/* Textarea */}
                <textarea
                    className="bg-gray-100 text-sm text-gray-700 px-4 py-3 rounded-md shadow-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="Start Typing..."
                    rows={6}
                />

                {/* Submit Button */}
                <div className="flex justify-center mt-5">
                    <PrimaryButton
                        selected={true}
                        className="w-20 py-3 text-xs"
                        onClick={onClose}
                    >
                        Submit
                    </PrimaryButton>
                </div>
            </ModalOverlay>



        </>
    );
};
const GuarantorRemoveModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <>
            <ModalOverlay onClose={onClose}>

                {/* Title */}
                <p className="text-center text-sm font-medium text-gray-800 mb-4">
                    Are you sure you want to remove guarantor?
                </p>


                {/* Submit Button */}
                <div className="flex justify-center mt-5 gap-5">
                    <PrimaryButton
                        selected={true}

                        className="w-20 py-3 text-xs"
                        onClick={onClose}
                    >
                        Cancel
                    </PrimaryButton>
                    <PrimaryButton
                        selected={true}
                        className="w-20 py-3 text-xs"
                        onClick={onClose}
                    >
                        Remove
                    </PrimaryButton>
                </div>
            </ModalOverlay>



        </>
    );
};
const EditGuarantorModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <>
            <ModalOverlay onClose={onClose}>

                {/* Title */}
                <p className="text-center text-sm font-medium text-gray-800 mb-4">
                    Edit Guarantor Details
                </p>
                <div className='flex gap-3 flex-col items-center gap-x-3 py-4'> <img
                    src="/assets/img/search-property/student_profile (1).png"
                    alt={"loading..."}
                    className="w-25 h-25 rounded-full"
                />
                    <p className='text-[#B3322F]'>Name</p>
                    <input
                        placeholder={`John Doe`}
                        id="email"
                        name="email"
                        type="email"
                        className={`${inputClass} outline-white`}
                    />
                    <p className='text-[#B3322F]'>Role</p>
                    <input
                        placeholder={`(Father)`}
                        id="email"
                        name="email"
                        type="email"
                        className={`${inputClass} outline-white`}
                    />
                </div>



                {/* Submit Button */}
                <div className="flex justify-center mt-5 gap-5">
                    <PrimaryButton
                        selected={true}
                        className="w-20 py-3 text-xs"
                        onClick={onClose}
                    >
                        Submit
                    </PrimaryButton>
                </div>
            </ModalOverlay>



        </>
    );
};
const GuarantorPreferences = () => {
    const [reportModal, setReportModal] = useState(false)
    const [removeModal, setRemoveModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const Roommates = [
        { name: "Rae E (Mother)" },
        { name: "John Doe (Father)" },
    ]

    return (
        <div className='p-6'>

            {reportModal && <GuarantorReportModal onClose={() => setReportModal(false)} />}
            {removeModal && <GuarantorRemoveModal onClose={() => setRemoveModal(false)} />}
            {editModal && <EditGuarantorModal onClose={() => setEditModal(false)} />}


            <h1 className='text-lg font-bold'>Current Roommate(s) On File:</h1>
            {
                Roommates.map(roommate =>
                    <div className='flex flex-col md:flex-row gap-4 justify-between my-2 lg:w-2/4 md:3/4 w-full md:items-center'>
                        <div className='flex items-center gap-x-3'> <img
                            src="/assets/img/search-property/student_profile (1).png"
                            alt={"loading..."}
                            className="w-12 h-12 rounded-full"
                        />
                            {roommate.name}
                        </div>
                        <div>
                            <ul className='flex text-[#B3322F] gap-x-2'>
                                <li onClick={() => setEditModal(true)} className=''>Edit</li>
                                <li onClick={() => setRemoveModal(true)} className='border-r border-l px-2 '>Remove</li>
                                <li className='' onClick={() => setReportModal(true)}>Report</li>
                            </ul>
                        </div>
                    </div>

                )
            }
            <hr className='w-full md:w-[80%] mt-10' />



            <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`hover:bg-black bg-[#B3322F]   md:w-[180px] text-center py-2 text-white rounded-full mt-5 w-full`}
            >

                Invite Guarantor

            </motion.button>

        </div>
    )
}
const ResetPassword = () => {
    const { user } = useAuth()
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const handleSubmit = async () => {
        try {
            const { data, error } = await forgotPassword({ email: user?.['email'] || "" });
            if (error) {
                const errorMessage =
                    "data" in error
                        ? (error as FetchBaseQueryError).data as string
                        : "Password reset failed.";
                return toast.error(errorMessage);
            }
            toast.success(data?.message || "Password reset email sent!");
        } catch (err) {
            console.error("Unexpected error:", err);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return <>
        {isLoading && <Loader />}
        <div className='h-full w-full flex items-center justify-center  '>
            <div className='text-center py-20 px-4'>

                <p className="bg-[#B3322F] flex items-center w-fit gap-1 px-3 -py-4 rounded-full mx-auto">
                    <span className="text-3xl text-white font-bold mt-2">*</span>
                    <span className="text-3xl text-white font-bold mt-2">*</span>
                    <LockClosedIcon className="text-white h-4" />
                </p>

                <p className='px-4 my-4 md:mt-2 md:mb-0'>You can reset your password at anytime by clicking below:</p>
                <Button
                    onClick={handleSubmit}
                    className={`hover:bg-black bg-[#B3322F]   md:w-[180px] text-center py-2 text-white rounded-full mt-5 w-full`}
                >

                    Reset Password
                </Button>

            </div>

        </div>
    </>
}
const ProfilePhotoUploader: React.FC<{
    setProfileImage: (param: string) => void;
}> = ({ setProfileImage }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

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
            <Button onClick={handleButtonClick} className="text-[#B3322F]  hover:bg-gray-200   flex justify-center items-center shadow bg-white px-4 py-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px]">
                <ArrowUpTrayIcon className="w-4 mr-2 text-[#B3322F]  " />
                Upload Profile Photo
            </Button>

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
const ProfilePicture = () => {

    const [profileImage, setProfileImage] = useState<string | null>(null);
    return <>
        <div className='h-full w-full flex items-center justify-center  '>
            <div className='text-center py-20 px-4'>

                {/* upload image */}

                <div>
                    {/* <h1 className="text-[#B3322F] text-center text-2xl ml-2 mb-8">Say Cheese!</h1> */}

                    {profileImage === null ? <ProfilePhotoUploader {...{ setProfileImage }} /> : <ImageHandler {...{ profileImage, setProfileImage }} />}

                    {/*  */}
                    {!profileImage && <p className="text-center text-[12px] ">Adding a profile photo is optional, but recommended — <br className="md:flex hidden" />
                        it helps landlords put a face to your name and can make your rental <br className="md:flex hidden" />
                        application feel more personal and trustworthy.</p>}
                    {/* Button */}

                </div>

                {/* upload image */}
            </div>

        </div>
    </>
}

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
                    <Button
                        className="px-4 py-1 rounded-full bg-white border shadow-md hover:bg-gray-100 transition"
                        onClick={handleCropSubmit}
                    >
                        Crop
                    </Button>
                ) : (
                    <>
                        <Button
                            className="px-4 py-1 rounded-full bg-white border shadow hover:bg-gray-100"
                            onClick={handleEditAgain}
                        >
                            Edit
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

const ChangeOnboardingAnswers = () => {
    return <>
        <div className='h-full w-full flex items-center justify-center  '>
            <div className='text-center py-20 px-4'>

                <img alt="" className="h-25 pr-1 mx-auto -my-4" src="/assets/img/icons/survey_icon.svg" />


                <p className='px-4 my-4 md:mt-2 md:mb-0'>You can review and/or update your onboarding answers at anytime by clicking below:</p>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`hover:bg-black bg-[#B3322F]  md:w-fit px-5 text-center py-2 text-white rounded-full mt-5 w-full`}
                >

                    Launch Onboarding Questionnaire
                </motion.button>

            </div>

        </div>
    </>
}

const ChangeNameOrEmail = () => {
    const [updateForm, setUpdateForm] = useState("Name")
    const [formSubmitted, setFormSubmitted] = useState(false)
    return <>
        <div className='h-full w-full flex items-center justify-center  px-5 py-5'>
            {formSubmitted ?
                <div className='text-center px-4'>

                    <CheckIcon className='bg-[#B3322F] text-white h-10 mx-auto rounded-full p-2' />
                    <p className='text-xl text-[#B3322F] mb-4 mt-2'>Request Submitted</p>
                    <p>Your request to update your account information has been received and is currently under review. Please allow up to 5 business days for processing. You’ll receive a confirmation email once the changes are approved.</p>


                    <motion.button
                        onClick={() => setFormSubmitted(false)}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.03 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className={`hover:bg-black bg-[#B3322F]   md:w-[180px] text-center py-2 text-white rounded-full mt-5 w-full`}
                    >

                        Submit
                    </motion.button>

                </div>


                : <div className='text-center'>
                    <h1 className='font-bold text-lg'>What would you like to update?</h1>
                    {/* Radio Buttons */}
                    <div className="flex flex-col md:flex-row items-center justify-center">
                        <div
                            onClick={() => setUpdateForm("Name")}
                            className="flex items-center gap-3  hover:bg-gray-100 p-2 rounded-md transition px-5"
                        >
                            <span className={`${updateForm === "Name" ? "bg-[#B3322F]" : "border-[#B3322F] border-2"}  w-4 h-4 rounded-full flex items-center justify-center text-white font-bold text-lg`}>

                            </span>
                            <span className="text-gray-800 font-medium">Name</span>
                        </div>

                        <div
                            onClick={() => setUpdateForm("Email")}
                            className="flex items-center gap-3  hover:bg-gray-100 p-2 rounded-md transition px-5"
                        >
                            <span className={`${updateForm === "Email" ? "bg-[#B3322F]" : "border-[#B3322F] border-2"}  w-4 h-4 rounded-full flex items-center justify-center text-white font-bold text-lg`}>

                            </span>
                            <span className="text-gray-800 font-medium">Email</span>
                        </div>
                    </div>

                    <div className='flex gap-5 flex-col my-5'>
                        <input
                            placeholder={`Current ${updateForm}`}
                            id="email"
                            name="email"
                            type="email"
                            className={`${inputClass} outline-white`}
                        />
                        <input
                            placeholder={`New ${updateForm}`}
                            id="email"
                            name="email"
                            type="email"
                            className={`${inputClass} outline-white`}
                        />
                        <input
                            placeholder={`Confirm New ${updateForm}`}
                            id="email"
                            name="email"
                            type="email"
                            className={`${inputClass} outline-white`}
                        />
                    </div>

                    {/*  button */}
                    <motion.button
                        onClick={() => setFormSubmitted(true)}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.03 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className={`hover:bg-black bg-[#B3322F]   md:w-[180px] text-center py-2 text-white rounded-full mt-5 w-full`}
                    >

                        Submit
                    </motion.button>
                    {/* Note */}
                    <div className='text-[#B3322F] mt-4'>*Your Email Address and Name Change are being reviewed. You will receive an email once approved.</div>
                </div>}

        </div>
    </>
}
const UpcomingEvents = () => {
    return <>
        <div className='h-full w-full p-8'>
            <h1 className='text-lg font-bold'>Your Upcoming Event(s)</h1>
            <div className='flex flex-wrap gap-10 mt-5'>
                {[1, 2, 3, 4, 5, 6].map(() => <div>
                    <h1 className='text-[#B3322F] font-bold'>Nextroom Town Hall</h1>
                    <p><span className='text-[#B3322F] font-bold'>Date: </span>Thursday, August 28 </p>
                    <p><span className='text-[#B3322F] font-bold'>Time: </span>5:30 PM – 7:30 PM </p>
                    <p><span className='text-[#B3322F] font-bold'>Location: </span>Canadian Tire Centre</p>
                    <p><span className='text-[#B3322F] font-bold'>Cost: </span>Free Admission</p>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.03 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className={`hover:bg-black bg-[#B3322F]   md:w-[180px] text-center py-1 text-white rounded-full mt-5 w-full`}
                    >

                        Cancel Registration

                    </motion.button>
                </div>)}
            </div>


        </div>
    </>
}