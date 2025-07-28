import { ArrowUpTrayIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react'
import { CircleStencil, Cropper, CropperRef } from 'react-advanced-cropper';
import { APP_INFO } from '../../../utils/constants';

const options = [
    "Roommate Preferences",
    "Guarantor Preferences",
    "Reset Password",
    "Change Profile Picture",
    "Change Name or Email",
    "Change Onboarding Answers",
    "Upcoming Events",
];

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
                                className={`${selectedOption === option ? "bg-[#B3322F] text-white" : "text-black"} rounded-full px-4 py-2 my-2 cursor-pointer font-semibold`}
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
                        className="text-center bg-[#B3322F] text-white shadow-md px-5 py-2 w-full rounded-full text-sm font-medium cursor-pointer relative"
                    >
                        {selectedOption}
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
                                {options.map((tab, index) => (
                                    <div
                                        key={tab}
                                        className={`text-center py-2 cursor-pointer hover:text-[#B3322F] ${selectedOption === tab ? "text-[#B3322F] font-semibold" : ""
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


const RoommatePreferences = () => {
    const Roommates = [
        { name: "Rae E" },
        { name: "Jessica R" },
        { name: "Pamela F" }
    ]

    return (
        <div className='p-6'>
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
                                <li >Edit</li>
                                <li className='border-r border-l px-2'>Remove</li>
                                <li>Report</li>
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

                Invite Roommate

            </motion.button>

        </div>
    )
}
const GuarantorPreferences = () => {
    const Roommates = [
        { name: "Rae E (Mother)" },
        { name: "John Doe (Father)" },
    ]

    return (
        <div className='p-6'>
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
                                <li >Edit</li>
                                <li className='border-r border-l px-2'>Remove</li>
                                <li>Report</li>
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
    return <>
        <div className='h-full w-full flex items-center justify-center  '>
            <div className='text-center py-20 px-4'>

                <p className="bg-[#B3322F] flex items-center w-fit gap-1 px-3 -py-4 rounded-full mx-auto">
                    <span className="text-3xl text-white font-bold mt-2">*</span>
                    <span className="text-3xl text-white font-bold mt-2">*</span>
                    <LockClosedIcon className="text-white h-4" />
                </p>

                <p className='px-4 my-4 md:mt-2 md:mb-0'>You can reset your password at anytime by clicking below:</p>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`hover:bg-black bg-[#B3322F]   md:w-[180px] text-center py-2 text-white rounded-full mt-5 w-full`}
                >

                    Reset Password
                </motion.button>

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
    return <>
        <div className='h-full w-full flex items-center justify-center  '>

        </div>
    </>
}

const UpcomingEvents = () => {
    return <>
        <div className='h-full w-full p-8'>
            <h1 className='text-lg font-bold'>Your Upcoming Event(s)</h1>
            <div className='flex flex-wrap gap-10 mt-5'>
             {[1,2,3,4,5,6].map(event=> <div>
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