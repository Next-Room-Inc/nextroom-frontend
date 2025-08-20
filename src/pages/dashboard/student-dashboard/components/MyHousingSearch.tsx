import { ArrowPathIcon, ArrowUpTrayIcon } from '@heroicons/react/20/solid'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { PrimaryButton } from '../../../../components/Button'
import { DropDownSelector } from '../../../../components/DropDownSelector'
import { LoaderComponent } from '../../../../components/Loader'
import Rating from '../../../../components/Rating'
import { ChatWindow } from '../../../../components/chat/ChatWindow'
import { useGetEntrataPropertiesQuery } from '@src/redux/services/property.service'
import { IMAGES } from '@src/utils/constants/app-info.constant'
import { Property, PropertyDetails } from '@src/utils/interfaces'
import { AvailableUnitsModal } from './AvailableUnitsModal'
import useAuth from '@src/custom-hooks/useAuth'
import PulseHoverLayout from '@src/layouts/PulseHover.Layout'

const MyHousingSearch = () => {
    const tabOptions = ["Active", "Archived"];
    const [selectedTab, setSelectedTab] = useState<string | number | null>(tabOptions[0])
    const [currentScreen, setCurrentScreen] = useState('Welcome')

    return (
        <div>
            {/* Selector */}
            <div className='hidden md:flex gap-3 mt-8'>
                {tabOptions.map((status) => (<PrimaryButton
                    color={status !== selectedTab ? "disabled" : 'red'}
                    className="w-60 py-3 text-xs"
                    onClick={() => setSelectedTab(status)}
                >
                    {status}
                </PrimaryButton>))}
            </div>
            {/* Mobile View */}
            <DropDownSelector
                options={tabOptions}
                selected={selectedTab}
                onSelect={(value) => setSelectedTab(value)}
            />


            {/* Screens */}
            {currentScreen === 'Welcome' && (<WelcomeComponent onClick={() => setCurrentScreen('Housing')} />)}
            {currentScreen === 'Housing' && <HousingComponent />}
        </div>


    )
}

export default MyHousingSearch



const demoDetails = {
    title: "Alma @ ByWard Market",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    location: "256 Rideau St, Ottawa, ON K1N 0G1",
    type: "Apartment",
    priceRange: "$1,350 - $1,999",
    matchPercent: "96",
    bgClass: "bg-gradient-to-br from-[#B3322F] to-[#4D1614]",
}

const HousingComponent = () => {
    const [selected, setSelected] = useState<number | null>(null);
    const { data = [], isLoading, isError, refetch } = useGetEntrataPropertiesQuery();

    return (
        <div>
            <h1 className="text-black text-2xl md:mb-6 mx-4 font-semibold mt-5 md:mt-10">Accepted Housing</h1>

            <div className='  md:mx-15'>
                {
                    isLoading ? <div>
                        <LoaderComponent />
                        <p className='text-center'>Please wait....</p>
                    </div> : isError ?
                        <div className='flex items-center justify-center mt-4 gap-4'>
                            <div className='font-semibold '>{"Fail to fetch data Retry."}</div>
                            <motion.div
                                onClick={refetch}
                                whileHover={{ scale: 1.2, rotate: 90 }}
                                transition={{ duration: 0.6, ease: 'easeInOut' }}
                            >
                                <ArrowPathIcon className="w-5 h-5 text-[#B3322F] " />
                            </motion.div>
                        </div > : <>

                            {(data[0]?.floorplans || []).map((propertyDetails, index) => <MatchingHousingCard
                                index={index}
                                selected={selected === index}
                                setSelected={setSelected}
                                propertyDetails={propertyDetails}
                                property={data[0]}
                                {...demoDetails}
                            />)}
                        </>}
            </div>

        </div>
    )
}




export const MatchingHousingCard: React.FC<{
    title: string;
    property: Property;
    propertyDetails: PropertyDetails;
    location: string;
    type: string;
    priceRange: string;
    matchPercent: string;
    statusText?: string;
    bgClass?: string; // Tailwind background class (e.g., bg-gradient-to-r from-red-500 to-red-800)
    setSelected: (value: number | null) => void
    selected?: string | number | null | boolean,
    index: number,
}> = ({
    property,
    propertyDetails,
    index,
    title,
    location,
    matchPercent,
    statusText = 'Ready To Move In',
    bgClass = 'bg-gradient-to-r from-[#B3322F] to-[#4D1614]', // default if not provided
    selected = false,
    setSelected
}) => {
        const options = ["Report An Issue", "Contact Landlord", "Message Roommate(s)", "Leave A Review"]
        const [option, setOption] = useState<string | number | null>(null)
        const [viewDetails, setViewDetails] = useState(false)
        const [likedProperty, setLikedProperty] = useState(false)
        const likedPropertyHandler = () => {
            const updatedState = !likedProperty;
            setLikedProperty(updatedState);
            toast.info(updatedState ? "Demo: Added to Favourites" : "Demo: Removed from Favourites");
        };

        const CardClickHandler = () => {
            console.log("===>", selected, index)
            // if (selected === index) {
            //     setSelected(null);
            //     setViewDetails(false)
            // } else {
            setSelected(index);
            setViewDetails(true)
            // }
        }

        return (
            <PulseHoverLayout>
                <div
                    onClick={CardClickHandler}
                    className={`z-10 md:flex ${selected ? "rounded-tr-xl rounded-tl-xl " : "rounded-xl"} shadow-md overflow-hidden relative p-6 mx-5 mt-6 text-white ${bgClass}`}
                >
                    {/* Like Icon */}
                    <motion.img
                        onClick={likedPropertyHandler}
                        src={`/assets/img/search-property/${likedProperty ? "heartinner.svg" : "heartouter.svg"}`}
                        alt="Like"
                        className="h-5 absolute md:top-4 md:right-5 right-10 top-10 z-50 "

                        // Animate on click (when state changes)
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}

                        // Hover animation
                        whileHover={{ scale: 1.1 }}
                    />
                    {/* Image section */}
                    <div className="relative w-full md:w-1/4">
                        {/* <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-48 object-cover rounded-2xl"
                        /> */}
                        <img
                            src={IMAGES.NOT_FOUND}
                            alt={title}
                            className="w-full h-48   rounded-2xl"
                        />
                        <div className="absolute bottom-2 left-4 bg-[#B3322F]/80 text-white text-xs font-semibold px-3 py-1 rounded-sm shadow">
                            {statusText}
                        </div>
                    </div>

                    {/* Content section */}
                    <div className="w-full md:w-1/2 md:pl-6 md:mt-0 mt-6 flex flex-col justify-center">
                        <div className="flex md:justify-start justify-between items-start">
                            <h2 className="md:text-2xl text-xl font-semibold">{propertyDetails.name} @{property.propertyName}</h2>
                            <div className="bg-[#57AF4F] text-white px-3 py-0.5 text-center rounded-md text-[10px] font-medium mt-3 w-[85px] ml-0 md:ml-5">
                                {matchPercent} MATCH
                            </div>
                        </div>

                        {/* Details */}
                        <div className="mt-5 space-y-2 md:text-lg text-md">
                            <p className="flex items-start">
                                <img
                                    src="/assets/img/search-property/location_icon.svg"
                                    className="h-4 w-4 mt-1.5 mr-2"
                                    alt="Location Icon"
                                />
                                {location}
                            </p>
                            <p className="flex items-start">
                                <img
                                    src="/assets/img/search-property/building_icon.svg"
                                    className="h-4 w-4 mt-1.5 mr-2"
                                    alt="Building Icon"
                                />
                                {property?.structureType}
                            </p>
                            <p className="flex items-start font-semibold">

                                ${propertyDetails.rentMin} - ${propertyDetails.rentMax}
                                <span className="ml-1 font-normal">/month</span>
                            </p>
                        </div>
                    </div>
                </div>
                {/* Buttons */}


                {selected && viewDetails && <>
                    <AvailableUnitsModal
                        {...{ propertyDetails, property }}
                    />

                    <AnimatePresence>
                        {selected && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="bg-white py-5 md:py-10 mx-5 shadow-md  mt-5   rounded-xl px-5"
                                >
                                    <div className='hidden md:flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4'>
                                        {options.map((opt) => <PrimaryButton
                                            color={opt !== option ? "disabled" : 'red'}
                                            className="w-60 py-3 text-xs"
                                            onClick={() => setOption(opt)}
                                        >
                                            {opt}
                                        </PrimaryButton>)}
                                    </div>

                                    <DropDownSelector
                                        options={options}
                                        selected={option}
                                        onSelect={setOption}

                                    />

                                </motion.div>


                                {options[0] === option && <ReportIssueComponent />}
                                {options[1] === option && <ContactLandlordComponent />}
                                {options[2] === option && <MessageRoommateComponent />}
                                {options[3] === option && <LeaveAReviewComponent />}


                            </>

                        )}
                    </AnimatePresence>
                </>}

            </PulseHoverLayout>
        );
    };


const ContactLandlordComponent = () => {
    const [selectedChat, setSelectedChat] = useState<string | number | null>(null)
    const landlordOptions = [
        "Repair Request",
        "Book A Tour",
        "Leasing Question",
        "More Unit Details",
        "Amenities",
        "Issue With Roommate(s)",
        "General Inquiry"
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:bg-white  md:py-10 md:mx-5 md:shadow-md  md:mt-5   rounded-xl md:px-5 "
        >
            <div className='bg-white px-5 py-8 my-8 shadow-md rounded-2xl md:hidden flex flex-col items-center gap-3 mx-5 '>
                <h1 className="font-bold text-sm">What Do You Need Help With?</h1>
                <DropDownSelector
                    options={landlordOptions}
                    selected={selectedChat}
                    onSelect={setSelectedChat}
                    className="py-4 px-6 w-60 bg-white text-[#B3322F] flex justify-center items-center"

                />
            </div>

            <div className="md:h-screen flex bg-gray-100 md:p-4 ">
                {/* Sidebar */}

                <div className='hidden md:flex flex-col gap-5 items-center justify-center bg-white w-full md:w-1/4 rounded-2xl shadow md:p-4 py-8'>
                    <h1 className="font-bold text-sm">What Do You Need Help With?</h1>
                    {landlordOptions.map((opt) => (
                        <PrimaryButton
                            color={opt !== selectedChat ? "black" : 'red'}
                            className="w-full hidden md:flex py-2 text-xs"
                            onClick={() => setSelectedChat(opt)}
                        >
                            {opt}
                        </PrimaryButton>
                    ))}

                </div>

                {/* Chat Window */}
                <ChatWindow {...{ selectedChat, setSelectedChat }} />
            </div>
        </motion.div>
    )
}
const MessageRoommateComponent = () => {
    const [selectedChat, setSelectedChat] = useState<string | number | null>(null)


    const ImageComponent = () => <img src="/assets/img/search-property/student_profile (1).png" alt={"loading..."} className="w-8 rounded-full" />

    const roommatesOptions: any[] = [
        <div className='flex items-center gap-4'> <ImageComponent /> Anna G</div>,
        <div className='flex items-center gap-4'> <ImageComponent />Rae L.</div>,
        <div className='flex items-center gap-4'> <ImageComponent /> Sam H.</div>,
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:bg-white  md:py-10 md:mx-5 md:shadow-md  md:mt-5   rounded-xl md:px-5 "
        >
            <div className='bg-white px-5 py-8 my-8 shadow-md rounded-2xl md:hidden flex flex-col items-center gap-3 mx-5 '>
                <h1 className="font-bold text-sm">What Do You Need Help With?</h1>
                <DropDownSelector
                    options={roommatesOptions}
                    selected={selectedChat}
                    onSelect={setSelectedChat}
                    className="py-4 px-6 w-60 bg-white text-[#B3322F] flex justify-center items-center"

                />
            </div>

            <div className="md:h-screen flex bg-gray-100 md:p-4 ">
                {/* Sidebar */}

                <div className='hidden md:flex flex-col    items-center  bg-white w-full md:w-1/4 rounded-2xl shadow md:p-4 py-8'>
                    <h1 className="font-bold text-sm text-center my-5">What Do You Need Help With?</h1>
                    {roommatesOptions.map((opt) => (
                        <div className='flex items-center gap-3 justify-between w-3/4   hover:bg-gray-100 px-8 py-2 rounded-2xl' onClick={() => setSelectedChat(opt)}>
                            {opt} <span className=" block size-3.5 rounded-full bg-[#B3322F] " />

                        </div>
                    ))}

                </div>

                {/* Chat Window */}
                <ChatWindow {...{ selectedChat, setSelectedChat }} />
            </div>
        </motion.div>
    )
}
const LeaveAReviewComponent = () => {
    const [incentivized, setIncentivized] = useState<string | null>("No");
    const [reviewOption, setReviewOption] = useState<string>('Landlord');
    const [rating, setRating] = useState<number>(0);

    const handleStarClick = (index: number) => setRating(index);

    const reviewTypeOptions = [
        {
            label: "Landlord",
            description:
                "Share your experience with how the landlord or property manager communicated, handled repairs, respected privacy, and followed the rental agreement.",
        },
        {
            label: "Property",
            description:
                "Share your experience with the rental unit or building itself – its condition, location, safety, amenities, and comfort.",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white py-5 md:py-10 mx-5 shadow-md  mt-5   rounded-xl px-5"
        >
            {/* Review Options */}
            <div className='flex flex-wrap flex-col md:flex-row pb-4'>
                {/* Options */}
                <div className='w-full md:w-[30%] pb-4 md:pb-0'>
                    <p className='px-8 py-2 rounded-full shadow-md w-full md:w-fit mb-4'>First Year uOttawa Student</p>
                    <p className='flex gap-2 items-center text-xs ml-4  '><span className=" block size-2.5 rounded-full bg-[#B3322F]  " /> Hide My Name</p>
                </div>
                {/* review type Options */}
                <div className="flex flex-col md:flex-row w-full md:w-[40%] gap-2">
                    {reviewTypeOptions.map(({ label, description }) => (
                        <div
                            key={label}
                            onClick={() => setReviewOption(label)}
                            className="flex items-start gap-3  hover:bg-gray-100 p-3 rounded-md transition"
                        >
                            <span
                                className={`${reviewOption === label
                                    ? "bg-[#B3322F]"
                                    : "border-[#B3322F] border-2"
                                    } w-4 h-4 rounded-full flex-shrink-0 mt-0.5`}
                            ></span>
                            <div className="text-gray-800 text-sm">
                                <p className="font-medium">{label} Review</p>
                                <p className="text-[8px] leading-tight mt-1  ">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Rating */}
                <div className='flex  w-full md:w-[30%] justify-center pb-4 md:pb-0'>
                    <Rating {...{ rating, handleChange: handleStarClick }} />
                </div>
            </div>

            {/* Description Textarea */}
            <textarea
                className="bg-gray-100 text-sm text-gray-700 px-4 py-3 rounded-md shadow-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Start Typing...(max 500 characters)"
                rows={10}
            />
            <div className='my-4'>
                <p>Were you incentivized to leave this review?</p>
                <div className='flex flex-col md:flex-row gap-4 mt-4'>
                    {["Yes", "No"].map((opt) => <PrimaryButton
                        color={opt !== incentivized ? "disabled" : 'red'}
                        className="w-full md:w-30 py-2 text-xs"
                        onClick={() => setIncentivized(opt)}
                    >
                        {opt}
                    </PrimaryButton>)}
                </div>
                <p className='mt-4 text-center md:text-left leading-tight'>{incentivized === "Yes" ? <>
                    Please note incentivized reviews are permitted, but
                    only if the you self disclose.
                    Attempting to leave an incentivized review without self-disclosing is against our terms of service, and exposes you to being removed, and flagged for compliance —
                    <span className='font-semibold'>students are encouraged to contact us immediately if your landlord asks you to leave an incentivized review without disclosing.</span>
                </> : "If Yes, your review will display a notice notifying others it was incentivized."}</p>
            </div>
            {/* Submit Button */}
            <PrimaryButton color="red" className="w-60 py-3 text-xs mt-4 mx-auto">
                Submit
            </PrimaryButton>
        </motion.div>
    )
}

const ReportIssueComponent = () => {
    const reportOptions = ["Submit Repair Request", "Report Roommate Concern"];
    const [report, reportOption] = useState("")
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-[#D9D9D9]/50 md:h-30 h-35 mx-5  mt-5 pt-5 rounded-xl flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4"
            >
                {reportOptions.map((opt) => <PrimaryButton
                    color={opt !== report ? "disabled" : 'red'}
                    className="w-60 py-3 text-xs"
                    onClick={() => reportOption(opt)}
                >
                    {opt}
                </PrimaryButton>)}
            </motion.div>

            {report === reportOptions[0] && <RepairRequestComponent />}
            {report === reportOptions[1] && <ReportRoommateConcernComponent />}
        </>
    )
}

const RepairRequestComponent = () => {
    const [urgency, setUrgency] = useState<string | number | null>('');
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

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-white py-5 md:py-10 mx-5 shadow-md mt-5 rounded-xl px-5"
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
                        className="py-2 px-6 w-60 bg-white text-[#B3322F] flex justify-between"
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

            {/* Description Textarea */}
            <textarea
                className="bg-gray-100 text-sm text-gray-700 px-4 py-3 rounded-md shadow-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Start Typing..."
                rows={10}
            />

            {/* Submit Button */}
            <PrimaryButton color="red" className="w-60 py-3 text-xs mt-4 mx-auto">
                Submit
            </PrimaryButton>
        </motion.div>
    )
}
const ReportRoommateConcernComponent = () => {
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
            className="bg-white py-5 md:py-10 mx-5 shadow-md mt-5 rounded-xl px-5"
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
            <PrimaryButton color="red" className="w-60 py-3 text-xs mt-4 mx-auto">
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

    const { user } = useAuth()
    const { firstName = '', lastName = '' } = user || {}


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


        <p className='text-xl'>Hello <span className='font-bold'>{(firstName || ' ') + ' ' + (lastName || ' ')}</span>!</p>
        <p className='text-xl'>Welcome Home.</p>

        <p className='mt-10'>Start Searching And The Places You Have Interacted With Will Appear Here</p>

        <PrimaryButton
            onClick={onClick}
            color={'red'}
            className="w-full md:w-[60%] mx-auto mt-10 "

        >
            Find My Next Home
        </PrimaryButton>
    </div>
}





