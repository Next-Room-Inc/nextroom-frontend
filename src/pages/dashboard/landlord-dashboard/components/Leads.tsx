import { ArrowUpTrayIcon, CalendarDateRangeIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { Button, PrimaryButton } from '../../../../components/Button';
import { DropDownSelector } from '../../../../components/DropDownSelector';
import { ModalOverlay } from '../../../../components/ModalOverLay';


const leadsData = [
    {
        section: "Property Matches",
        units: ["Alma - Unit 504", "Theo - Unit 608"],
        roommates: [
            { name: "Rae E" },
            { name: "Jessica R" },
            { name: "Pamela F" },
            { name: "John D" },
        ],
        actions: ["Message", "Accept", "Decline", "Report"],
    },
    {
        section: "Tours Booked",
        units: ["Alma - Unit 504", "Theo - Unit 608"],
        roommates: [
            { name: "Rae E" },
            { name: "Jessica R" },
            { name: "Pamela F" },
            { name: "John D" },
        ],
        actions: ["Message", "Reschedule", "Cancel"],
    },
    {
        section: "Inquiries",
        units: ["Alma - Unit 504", "Theo - Unit 608"],
        roommates: [
            { name: "Rae E" },
            { name: "Jessica R" },
            { name: "Pamela F" },
            { name: "John D" },
        ],
        actions: ["View Messages (2)"],
    },
];

const Leads = () => {

    const [currentScreen, setCurrentScreen] = useState('Welcome')

    return (
        <div>

            {/* Screens */}
            {currentScreen === 'Welcome' && (<WelcomeComponent onClick={() => setCurrentScreen('Lead')} />)}
            {currentScreen === 'Lead' && <LeadsComponent />}

        </div>
    )
}

export default Leads


const LeadsComponent = () => {
    const [modal, setModal] = useState<string | null>(null)

    const actionHandler = (action: string) => {
        setModal(action)
    }
    const closeHandler = () => setModal(null)
    return (
        <>
            {modal && <ModalOverlay onClose={closeHandler}>
                {modal === "Accept" && < AcceptActionHandler close={closeHandler} />}
                {modal === "Decline" && < DeclineActionHandler close={closeHandler} />}
                {modal === "Report" && < ReportActionHandler close={closeHandler} />}
                {modal === "Reschedule" && < RescheduleActionHandler close={closeHandler} />}
                {modal === "Cancel" && < CancelActionHandler close={closeHandler} />}
            </ModalOverlay>}
            <div>
                {leadsData.map(({ section, units, roommates, actions }, sectionIdx) => (
                    <div key={sectionIdx}>
                        <h1 className="text-[#B3322F] font-semibold py-5 text-2xl">{section}</h1>

                        <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-xl p-4">
                            {units.map((unit, unitIdx) => (
                                <div key={unitIdx} className="md:w-1/2 p-4">
                                    <div className="font-semibold text-lg">{unit}</div>

                                    {roommates.map((roommate, roommateIdx) => (
                                        <div
                                            key={roommateIdx}
                                            className="flex flex-col md:flex-row gap-4 justify-between my-2 w-full md:items-center"
                                        >
                                            {/* Profile */}
                                            <div className="flex items-center gap-x-3">
                                                <img
                                                    src="/assets/img/search-property/student_profile (1).png"
                                                    alt="Profile"
                                                    className="w-12 h-12 rounded-full"
                                                />
                                                {roommate.name}
                                            </div>

                                            {/* Actions */}
                                            <div>
                                                <ul className="flex flex-wrap text-[#B3322F] gap-x-2">
                                                    {actions.map((action, actionIdx) => (
                                                        <li
                                                            onClick={() => actionHandler(action)}
                                                            key={actionIdx}
                                                            className={`cursor-pointer ${action.includes("View Messages") ||
                                                                action.includes("Report") ||
                                                                action.includes("Cancel")
                                                                ? ""
                                                                : "border-r px-2"
                                                                }`}
                                                        >
                                                            {action}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}

const AcceptActionHandler: React.FC<{
    close: () => void
}> = ({ close }) => {
    const [confirmModal, setConfirmModal] = useState(false)
    const confimHandler = () => {
        setConfirmModal(true)
    }
    return (
        <div className='p-4'>
            {confirmModal ? <>
                <CheckCircleIcon className='text-[#B3322F] w-16 mx-auto' />
                <p className='text-[#B3322F] font-semibold  text-center mb-4'>Student Accepteed</p>
                <p className=' text-center mb-8'><span className='font-semibold'>[Student Name]</span> has been successfully accepted as a tenant.</p>
                <div className='flex flex-col md:flex-row text-white gap-4 items-center justify-center'>
                    <Button className='bg-[#B3322F] py-2 px-15 rounded-full w-full md:w-48' onClick={close}>Close</Button>
                </div>

            </> : <>
                <p className='text-[#B3322F] font-semibold text-center mb-8'>Are you sure you want to accept [Student Name] from [Property Name and Unit Number]??</p>
                <div className='flex flex-col md:flex-row text-white gap-4 items-center justify-center'>
                    <Button className='bg-[#B3322F] py-2 px-15 rounded-full w-full md:w-48' onClick={confimHandler}>Yes</Button>
                    <Button className='bg-[#B3322F] py-2 px-15 rounded-full w-full md:w-48' onClick={close}>Cancel</Button>
                </div>
            </>}
        </div>)
}
const CancelActionHandler: React.FC<{
    close: () => void
}> = ({ close }) => {
    const [confirmModal, setConfirmModal] = useState(false)
    const confimHandler = () => {
        setConfirmModal(true)
    }
    return (
        <div className='p-4'>
            {confirmModal ? <>
                <CalendarDateRangeIcon className='text-[#B3322F] w-16 mx-auto' />
                <p className='text-[#B3322F] font-semibold  text-center mb-4'>Tour Cancelled</p>
                <p className=' text-center mb-8'>Tour Booking has been succesfully cancelled.</p>
                <div className='flex flex-col md:flex-row text-white gap-4 items-center justify-center'>
                    <Button className='bg-[#B3322F] py-2 px-15 rounded-full w-full md:w-48' onClick={close}>Close</Button>
                </div>

            </> : <>
                <p className='text-[#B3322F] font-semibold text-center mb-8'>Are you sure you want to cancel tour?</p>
                <div className='flex flex-col md:flex-row text-white gap-4 items-center justify-center'>
                    <Button className='bg-[#B3322F] py-2 px-15 rounded-full w-full md:w-48' onClick={confimHandler}>Yes</Button>
                    <Button className='bg-[#B3322F] py-2 px-15 rounded-full w-full md:w-48' onClick={close}>Cancel</Button>
                </div>
            </>}
        </div>)
}
const DeclineActionHandler: React.FC<{
    close: () => void
}> = ({ close }) => {
    const [confirmModal, setConfirmModal] = useState(false)
    const confimHandler = () => {
        setConfirmModal(true)
    }
    return (
        <div className='p-4'>
            {confirmModal ? <>
                <XCircleIcon className='text-[#B3322F] w-16 mx-auto' />
                <p className='text-[#B3322F] font-semibold  text-center mb-4'>Student Declined</p>
                <p className=' text-center mb-8'><span className='font-semibold'>[Student Name]</span> has been successfully declined as a tenant.</p>
                <div className='flex flex-col md:flex-row text-white gap-4 items-center justify-center'>
                    <Button className='bg-[#B3322F] py-2 px-15 rounded-full w-full md:w-48' onClick={close}>Close</Button>
                </div>

            </> : <>
                <p className='text-[#B3322F] font-semibold text-center mb-8'>Are you sure you want to decline [Student Name] from [Property Name and Unit Number]?</p>
                <div className='flex flex-col md:flex-row text-white gap-4 items-center justify-center'>
                    <Button className='bg-[#B3322F] py-2 px-15 rounded-full w-full md:w-48' onClick={confimHandler}>Yes</Button>
                    <Button className='bg-[#B3322F] py-2 px-15 rounded-full w-full md:w-48' onClick={close}>Cancel</Button>
                </div>
            </>}
        </div>)
}

interface DatePickerProps {
    label: string;
    value: string | null;
    onChange: (date: any) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const openPicker = () => {
        inputRef.current?.showPicker?.(); // opens date picker in supporting browsers
        inputRef.current?.focus();
    };

    return (
        <div className="mb-6 text-center">
            <p className="font-semibold">{label}</p>
            <div
                className="border border-white shadow-md mt-3 rounded-full mx-auto md:w-max text-center flex items-center justify-center cursor-pointer hover:shadow-lg transition"
                onClick={openPicker}
            >
                <input
                    ref={inputRef}
                    type="date"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="input-white-calendar px-10 py-2 text-center mx-auto text-[#B3322F] focus:outline-none cursor-pointer bg-transparent"
                />
            </div>
        </div>
    );
};


const RescheduleActionHandler: React.FC<{
    close: () => void
}> = ({ close }) => {
    const [currentDate, setCurrentDate] = useState(null);
    const [rescheduleDate, setRescheduleDate] = useState(null);

    return (
        <div>
            <DatePicker
                label="Current Tour Date:"
                value={currentDate}
                onChange={setCurrentDate}
            />
            <DatePicker
                label="Reschedule To:"
                value={rescheduleDate}
                onChange={setRescheduleDate}
            />

            <div className="flex flex-col md:flex-row text-white gap-4 items-center justify-center">
                <Button
                    className="bg-[#B3322F] py-2 px-6 rounded-full w-full md:w-48"
                    onClick={close}
                >
                    Yes
                </Button>
                <Button
                    className="bg-[#B3322F] py-2 px-6 rounded-full w-full md:w-48"
                    onClick={close}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

const ReportActionHandler: React.FC<{
    close: () => void
}> = ({ close }) => {
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
                        className="shadow-md bg-white border border-transparent w-full md:w-60 flex  cursor-pointer rounded-full py-2 px-5 ml-4 items-center gap-2 hover:shadow-lg transition duration-150"
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
const WelcomeComponent: React.FC<{
    onClick: () => void
}> = ({ onClick }) => {


    return <div className='text-center bg-white w-full md:w-[80%] mx-auto text-[#B3322F] py-10 md:py-20 shadow-md rounded-4xl mt-5 md:mt-20 px-6'>

        <div className='flex flex-wrap gap-10 justify-center items-center py-5 mb-10'>
            {[
                "lamp.svg",
                "monitor.svg",
                "ac.svg",
                "iron.svg",
                "oven.svg",
                "waching_machine.svg",
            ].map(icon => {
                return <>
                    <img
                        src={`/assets/img/students-dashboard/${icon}`}
                        alt="Like"
                        className="h-12 md:h-15"
                    />
                </>
            })}
        </div>


        <p className='text-xl'>No Leads Yet!</p>

        <p className='mt-10'>Post Your Available Homes To Start Receiving Leads</p>

        <PrimaryButton
            onClick={onClick}
            color={'red'}
            className="w-full md:w-[60%] mx-auto mt-10 "

        >
            Post My First Home
        </PrimaryButton>
    </div>
}