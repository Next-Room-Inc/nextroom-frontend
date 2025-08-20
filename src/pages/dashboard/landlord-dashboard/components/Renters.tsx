import { ArrowUpTrayIcon, CheckIcon } from '@heroicons/react/20/solid'
import { motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { Button, PrimaryButton } from '../../../../components/Button'
import { DropDownSelector } from '../../../../components/DropDownSelector'
import { ModalOverlay } from '../../../../components/ModalOverLay'
import Chat from '../../../chat/Chat'

const Renters = () => {


    return (
        <div>

            <PropertyCard
                propertyName={"Alma"}
                imageDesktop={"/assets/img/events/event_1.png"}
                imageMobile={"/assets/img/events/event_1_mobile.png"}
            />


            <UnitHeader>Unit 304</UnitHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {rentersData.map((renter) => <RenterStudentCard {...renter} />)}
            </div>
            <UnitHeader>Unit 408</UnitHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {rentersData.map((renter) => <RenterStudentCard {...renter} />)}
            </div>

            <PropertyCard
                propertyName={"Theo"}
                imageDesktop={"/assets/img/events/event_1.png"}
                imageMobile={"/assets/img/events/event_1_mobile.png"}
            />

            <UnitHeader>Unit 408</UnitHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {rentersData.map((renter) => <RenterStudentCard {...renter} />)}
            </div>

        </div>
    )
}

export default Renters


// Renter Card (Dynamic)
const RenterStudentCard = ({
    name,
    university,
    year,
    monthsCompleted,
    totalMonths,
    image
}: {
    name: string;
    university: string;
    year: string;
    monthsCompleted: number;
    totalMonths: number;
    image: string;
}) => {
    const [modal, setModal] = useState<string | null>(null)

    const closeHandler = () => setModal(null)

    return (
        <>
            {/* Modals */}
            {modal === "chat" ?
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/40"
                >
                    <div className="w-[100%]  bg-white rounded-xl shadow-xl overflow-hidden">
                        <Chat closeChat={closeHandler} chatModal={true} />
                    </div>
                </motion.div>
                : modal && <ModalOverlay onClose={closeHandler}>
                    {modal === "profile" && < StudentDetailsModal close={closeHandler} />}
                    {modal === "report" && < ReportActionHandler close={closeHandler} />}
                </ModalOverlay>
            }


            <div className="bg-[#B3322F] p-5 rounded-xl py-8 pb-12">
                <img
                    src={image}
                    alt={name}
                    className="w-30 rounded-full mx-auto"
                />

                <div className="text-center text-white flex flex-col gap-1 my-8">
                    <p className="font-bold">{name}</p>
                    <p className="font-light">{university} - {year}</p>
                    <p className="font-light">{monthsCompleted}/{totalMonths} Months Complete</p>
                </div>

                <div className="flex flex-col gap-5 mt-5 px-5 font-semibold">
                    <Button className="bg-white w-full text-[#B3322F] py-2 rounded-full" onClick={() => setModal("profile")}>
                        View Full Profile
                    </Button>
                    <Button className="bg-white w-full text-[#B3322F] py-2 rounded-full" onClick={() => setModal("chat")}>
                        Message
                    </Button>
                    <Button className="bg-white w-full text-[#B3322F] py-2 rounded-full" onClick={() => setModal("report")}>
                        Report
                    </Button>
                </div>
            </div>
        </>
    );
};

// Unit Header
const UnitHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="rounded-full bg-white shadow-md py-3 px-5 font-semibold my-10">
            {children}
        </div>
    );
}

// Property Card (Dynamic)
const PropertyCard = ({
    propertyName,
    imageDesktop,
    imageMobile
}: {
    propertyName: string;
    imageDesktop: string;
    imageMobile: string;
}) => {
    return (
        <div
            className='my-10 rounded-2xl md:rounded-xl shadow-md bg-white flex flex-col md:flex-row overflow-hidden'>
            <div className={` md:bg-[url('${imageDesktop}')] bg-[url('${imageMobile}')] bg-center bg-cover h-60 md:w-[50%] `}>

            </div>
            <div className='bg-white text-[#B3322F] md:h-60 h-30 md:w-[50%] flex justify-center items-center text-center'>
                <div>
                    <div className='text-2xl md:text-3xl font-bold'>{propertyName} Properties</div>
                </div>
            </div>
        </div>
    );
};



// ===================== Sample Data =====================
const rentersData = [
    {
        name: "Anna G.",
        university: "Carleton University",
        year: "First Year",
        monthsCompleted: 3,
        totalMonths: 12,
        image: "/assets/img/search-property/student_profile (2).png"
    },
    {
        name: "John M.",
        university: "University of Ottawa",
        year: "Second Year",
        monthsCompleted: 5,
        totalMonths: 12,
        image: "/assets/img/search-property/student_profile (3).png"
    },
    {
        name: "Sophia L.",
        university: "Carleton University",
        year: "Third Year",
        monthsCompleted: 9,
        totalMonths: 12,
        image: "/assets/img/search-property/student_profile (4).png"
    },
    {
        name: "Mike T.",
        university: "University of Ottawa",
        year: "First Year",
        monthsCompleted: 1,
        totalMonths: 12,
        image: "/assets/img/search-property/student_profile (5).png"
    }
];


// ===================== Sample Data =====================
const ReportActionHandler: React.FC<{ close: () => void }> = ({ close }) => {
    const [urgency, setUrgency] = useState<string | number | null>('');
    const [roommate, setRoommate] = useState<string | number | null>('');
    const [, setImages] = useState<FileList | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileClick = () => { fileInputRef.current?.click(); };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(e.target.files);
        }
    };

    const urgencyOptions = [
        "Urgent",
        "Moderate",
        "Low",
    ]

    const ImageComponent = () => <img src="/assets/img/search-property/student_profile (1).png" alt={"loading..."} className="w-8 rounded-full" />

    const roommatesOptions: any[] = [
        <div className='flex items-center gap-4'> <ImageComponent /> Anna G</div>,
        <div className='flex items-center gap-4'> <ImageComponent /> Rae L.</div>,
        <div className='flex items-center gap-4'> <ImageComponent /> Sam H.</div>
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        // className=" rounded-xl px-5"
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between gap-4 text-[#B3322F] font-semibold mb-4">
                {/* Urgency Dropdown */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                    <label htmlFor="urgency">Urgency</label>

                    <DropDownSelector
                        options={urgencyOptions}
                        selected={urgency}
                        onSelect={setUrgency}
                        className="py-3 md:ml-5 px-6 w-60 bg-white text-[#B3322F] flex justify-between"
                    />

                </div>

                {/* Image Upload */}
                <div className="flex flex-col md:flex-row items-center gap-3">
                    <label>Images</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                    />
                    <div
                        onClick={handleFileClick}
                        className="shadow-md bg-white border border-transparent w-full md:w-60 flex   rounded-full py-2 px-5 ml-4 items-center gap-2 hover:shadow-lg transition duration-150"
                    >
                        <ArrowUpTrayIcon className="h-5" />
                        <span>Upload</span>
                    </div>
                </div>
            </div>
            {/* Roommates */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 mb-6 font-semibold text-[#B3322F]">
                <label htmlFor="urgency">Roommate</label>

                <DropDownSelector
                    options={roommatesOptions}
                    selected={roommate}
                    onSelect={setRoommate}
                    className="py-2 px-6 w-60 bg-white text-[#B3322F] flex justify-between items-center"
                />

            </div>
            {/* subject */}
            <textarea
                className="mb-3 bg-gray-100 text-sm text-gray-700 px-4 py-3 rounded-md shadow-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Subject line"
                rows={1}
            />
            {/* Description Textarea */}
            <textarea
                className="bg-gray-100 text-sm text-gray-700 px-4 py-3 rounded-md shadow-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Start Typing..."
                rows={10}
            />

            {/* Submit Button */}
            <PrimaryButton color="red" className="w-60 py-3 text-xs mt-4 mx-auto" onClick={close}>
                Submit
            </PrimaryButton>


            {/* warning */}
            <div className="text-center mt-20 px-5">
                <img
                    alt="Warning Icon"
                    src="/assets/img/icons/warningicon.svg"
                    className="h-16 mx-auto mb-5"
                />

                <h2 className="text-lg font-bold mb-2">Thank you for reporting.</h2>

                <p className="mx-auto w-full md:w-[50%] xl:[40%] text-sm md:text-base">
                    We take all incidents seriously and work with landlords,
                    post-secondary institutions, and even the police when necessary.
                    <br className="hidden md:inline" />
                    <span className="font-bold">
                        Always call 911 first if your situation puts you in immediate danger.
                    </span>
                </p>
            </div>
        </motion.div>
    )
}


const StudentDetailsModal: React.FC<{ close: () => void }> = ({ close }) => {
    return (
        <div className="md:px-5">
            {/* Profile Image */}
            <img
                src="/assets/img/search-property/student_profile (2).png"
                alt="loading"
                className="w-30 rounded-full mx-auto"
            />

            {/* Student Name & Unit */}
            <div className="text-center text-black flex flex-col gap-1 my-8">
                <p className="font-bold">Mike T.</p>
                <p className="font-light">Alma - Unit 506</p>
            </div>

            {/* Details Section */}
            <div className="my-8 flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-center">
                {/* Status timeline */}
                <div className="w-full md:w-1/2 border-b-1 pb-8 md:pb-0 md:border-b-0 md:border-r-1 border-[#CCCCCC] md:px-8 md:mr-8">
                    <StepComponent />
                </div>

                {/* Contact & Guarantors */}
                <div className="w-full md:w-1/2 flex flex-col justify-between gap-8 md:px-8">
                    <div>
                        <h1 className="font-semibold text-lg">Email</h1>
                        <p className="text-[#B3322F]">annag@uottawa.com</p>
                    </div>

                    <div>
                        <h1 className="font-semibold text-lg">Phone Number</h1>
                        <p className="text-[#B3322F]">613-123-4567</p>
                    </div>

                    <div>
                        <h1 className="font-semibold text-lg">Guarantor(s)</h1>
                        {[
                            { name: "Rae E (Mother)" },
                            { name: "John Doe (Father)" },
                        ].map((guarantor, idx) => (
                            <div
                                key={idx}
                                className="flex my-4 items-center gap-x-3 text-[#B3322F]"
                            >
                                <img
                                    src="/assets/img/search-property/student_profile (1).png"
                                    alt="loading..."
                                    className="w-12 h-12 rounded-full"
                                />
                                {guarantor.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Review & Reports Section */}
            <div className="my-8 flex flex-col md:flex-row gap-8 md:gap-0 font-semibold">
                {/* Review */}
                <div className="w-full md:w-1/2">
                    <h1 className="font-semibold text-lg border-y-1 border-[#CCCCCC] py-2">
                        Review
                    </h1>
                    <div className="w-full md:w-[80%]">
                        <h1 className="font-semibold text-md my-5">From Landlord</h1>
                        <ul className="flex flex-col gap-5">
                            <li className="flex justify-between items-center">
                                <p className="text-[#B3322F]">Alma - Unit 506</p>
                                <p className="underline text-xs">View Details</p>
                            </li>
                            <li className="flex justify-between items-center">
                                <p className="text-[#B3322F]">Alma - Unit 506</p>
                                <p className="underline text-xs">View Details</p>
                            </li>
                        </ul>

                        <h1 className="font-semibold text-md my-5">From Landlord</h1>
                        <ul className="flex flex-col gap-5">
                            <li className="flex justify-between items-center">
                                <p className="text-[#B3322F]">Alma - Unit 506</p>
                                <p className="underline text-xs">View Details</p>
                            </li>
                            <li className="flex justify-between items-center">
                                <p className="text-[#B3322F]">Alma - Unit 506</p>
                                <p className="underline text-xs">View Details</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Reports */}
                <div className="w-full md:w-1/2">
                    <h1 className="font-semibold text-lg border-y-1 border-[#CCCCCC] py-2">
                        Review
                    </h1>
                    <div className="w-full md:w-[80%]">
                        <h1 className="font-semibold text-md my-5">From Tenant</h1>
                        <ul className="flex flex-col gap-5">
                            <li className="flex justify-between items-center">
                                <p className="text-[#B3322F]">Alma - Unit 506</p>
                                <p className="underline text-xs">View Details</p>
                            </li>
                            <li className="flex justify-between items-center">
                                <p className="text-[#B3322F]">Alma - Unit 506</p>
                                <p className="underline text-xs">View Details</p>
                            </li>
                        </ul>

                        <h1 className="font-semibold text-md my-5">From Tenant</h1>
                        <ul className="flex flex-col gap-5">
                            <li className="flex justify-between items-center">
                                <p className="text-[#B3322F]">Alma - Unit 506</p>
                                <p className="underline text-xs">View Details</p>
                            </li>
                            <li className="flex justify-between items-center">
                                <p className="text-[#B3322F]">Alma - Unit 506</p>
                                <p className="underline text-xs">View Details</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Landlord Comments Section */}
            <hr className="text-gray-300" />
            <div className="mt-8">
                <p className="font-semibold mb-4">Landlord Comments</p>
                <textarea
                    className="bg-gray-100 text-sm text-gray-700 px-4 py-3 rounded-xl shadow-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                    placeholder="Start Typing..."
                    rows={6}
                />
                <PrimaryButton
                    color="red"
                    className="w-full md:w-60 py-3 text-xs mt-4 mx-auto"
                    onClick={close}
                >
                    Submit
                </PrimaryButton>
            </div>
        </div>
    );
};



function StepComponent() {
    const steps = [
        { title: "Tour Booked", description: "Aug 5, 2025", completed: true },
        { title: "Lease Signed", description: "September 1, 2025", completed: true },
        { title: "Lease End Date", description: "September 1, 2026", completed: false }
    ];

    return (
        <div className={`flex flex-col space-y-20`}>
            {steps.map((step, index) => (
                <div key={index} className="flex items-start relative">
                    {/* Connector line */}
                    {index !== steps.length - 1 && (
                        <div className={`absolute left-[16px] top-8 h-25 w-[2px] bg-[#B3322F]`} />
                    )}

                    {/* Circle with check */}
                    <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step.completed
                            ? "bg-[#B3322F] border-[#B3322F] text-white"
                            : "bg-white border-[#B3322F] text-[#B3322F]"
                            } z-10`}
                    >
                        <CheckIcon className='w-5' />
                    </div>

                    {/* Text content */}
                    <div className="ml-6">
                        <h3 className="font-medium text-black">{step.title}</h3>
                        <p className="text-sm text-[#B3322F]">{step.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};