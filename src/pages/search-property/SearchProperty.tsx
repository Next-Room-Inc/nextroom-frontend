import { ArrowLeftIcon, ArrowRightIcon, ChevronUpIcon } from '@heroicons/react/16/solid'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { AnimatePresence, motion } from "framer-motion"
import { useState } from 'react'
import SearchPropertyLayout from '../../layouts/SearchProperty.Layout'
import { HousingCard, PrimaryButton } from './ComponComponents'

const housingdetails = [
    {
        title: "Alma @ ByWard Market",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        location: "256 Rideau St, Ottawa, ON K1N 0G1",
        type: "Apartment",
        priceRange: "$1,350 - $1,999",
        matchPercent: "96",
        bgClass: "bg-gradient-to-br from-[#B3322F] to-[#4D1614]",
    },
    {
        title: "Alma @ ByWard Market",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        location: "256 Rideau St, Ottawa, ON K1N 0G1",
        type: "Apartment",
        priceRange: "$1,350 - $1,999",
        matchPercent: "96",
        bgClass: "bg-gradient-to-br from-[#B3322F] to-[#4D1614]",
    },
    {
        title: "Alma @ ByWard Market",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        location: "256 Rideau St, Ottawa, ON K1N 0G1",
        type: "Apartment",
        priceRange: "$1,350 - $1,999",
        matchPercent: "96",
        bgClass: "bg-gradient-to-br from-[#B3322F] to-[#4D1614]",
    },
]


const SearchProperty = () => {
    const [feedbackForm, setFeedBackForm] = useState(true);
    const [ziplineModal, setZiplineModal] = useState(true);
    const [selected, setSelected] = useState(null);

    return (
        <>
            <SearchPropertyLayout>
                {/* Filters */}
                <ResponsiveTabSelector />
                {/* Zip Line away div */}
                <div className="h-[450px] md:h-[210px] w-full bg-cover bg-center flex md:justify-end md:items-center 
                                bg-[url('/assets/img/search-property/bg_1_mobile.png')] md:bg-[url('/assets/img/search-property/bg_1.png')]">

                    <div className="flex flex-col items-center md:items-start text-center md:text-left px-6 md:px-10 gap-4 md:mt-0 mt-5 w-full md:w-auto">
                        <img src="/assets/img/search-property/zibi-logo.svg" alt="Zibi Logo" className="h-[40px] mx-auto" />
                        <p className="text-xl md:text-2xl leading-snug">
                            <strong>Student Housing</strong> – <br className="md:hidden" /> Just a Zip-Line Away.
                        </p>
                        <div className="flex justify-center w-[100%]">
                            <PrimaryButton color="black">
                                View Available Units
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
                {/* properties */}
                <div className='py-10 md:mx-15'>
                    {housingdetails.map((propertyDetails, index) => <HousingCard
                        index={index}
                        selected={selected === index}
                        setSelected={setSelected}
                        {...propertyDetails}
                    />)}
                </div>
                {/* I’ll Search On My Own Instead Button */}
                <div className='flex  justify-center py-10'>
                    <PrimaryButton  >
                        I’ll Search On My Own Instead <ArrowRightIcon className=' ml-2 mt-0.5 w-5' />
                    </PrimaryButton>
                </div>

                {/* Rating Card Modal */}
                {feedbackForm && <FeedbackForm onClose={() => setFeedBackForm(false)} />}
                {/* Zip Line Modal */}
                {ziplineModal && <ZipLineModal onClose={() => setZiplineModal(false)} />}
                {/* Chat Sticky Button */}
                <ChatButton />
                {/* AvailableUnitsModal */}
            </SearchPropertyLayout>
        </>
    )
}

export default SearchProperty


const ChatButton = () => {
    const [stage, setStage] = useState<"arrow" | "tap" | "chat">("arrow");

    const handleClick = () => {
        if (stage === "tap") {
            setStage("chat");
        } else if (stage === "arrow") {
            setStage("tap");
        }
    };

    return (
        <div className="fixed right-0 bottom-15 z-50">
            <motion.button
                onClick={handleClick}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-2 bg-white text-[#B3322F] font-medium shadow-md px-5 py-3 rounded-l-full border border-gray-200 hover:bg-gray-50 transition-all relative  `}
            >
                {/* Arrow Icon Only */}
                {stage === "arrow" && (
                    <ArrowLeftIcon className="w-6" />
                )}

                {/* Tap to Chat */}
                {stage === "tap" && (
                    <>
                        <ArrowLeftIcon className="w-6   text-[#B3322F]" />

                        <span className="text-md whitespace-nowrap">tap to chat</span>
                    </>
                )}

                {/* Full Button with Icon */}
                {stage === "chat" && (
                    <>
                        <ArrowLeftIcon className="w-5 mt-1" />
                        <span className="text-md whitespace-nowrap">tap to chat</span>
                        <img
                            src="/assets/img/search-property/chat_icon.svg"
                            alt="Chat Icon"
                            className="h-10"
                        />
                    </>
                )}
            </motion.button>
        </div>
    );
};





const FeedbackForm = ({ onClose }: { onClose: () => void }) => {
    const [rating, setRating] = useState<number>(0);

    const handleStarClick = (index: number) => setRating(index);

    return (
        <>
            <AnimatePresence>
                <motion.div
                    key="feedback-modal"
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    className="md:w-[450px] w-full bg-white py-6 px-5 fixed left-0 bottom-20 rounded-tr-3xl rounded-br-3xl z-50"
                    style={{
                        boxShadow:
                            "4px -4px 10px rgba(0, 0, 0, 0.1), 4px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    {/* Close Icon */}
                    <XMarkIcon
                        className="w-5 h-5 absolute right-5 top-4 text-gray-500 cursor-pointer"
                        onClick={onClose}
                    />

                    {/* Title */}
                    <p className="text-center text-sm font-medium text-gray-800">
                        How satisfied are you with these results?
                    </p>

                    {/* Star Rating */}
                    <div className="flex justify-center gap-2 my-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <img
                                key={i}
                                onClick={() => handleStarClick(i)}
                                className="h-6 cursor-pointer hover:scale-110 transition-transform"
                                src={
                                    i <= rating
                                        ? "/assets/img/search-property/star_fill.svg"
                                        : "/assets/img/search-property/start_outline.svg"
                                }
                                alt={`Star ${i}`}
                            />
                        ))}
                    </div>

                    {/* Optional Message */}
                    <p className="bg-gray-100 text-[11px] text-gray-700 text-center px-4 py-3 rounded-md shadow-sm mx-2">
                        Your opinion matters! Let us know how we're doing or what you'd like to
                        see next. <br />
                        <span className="text-gray-500">(optional)</span>
                    </p>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-5">
                        <PrimaryButton color="black" className="w-24 h-7 text-xs" onClick={onClose}>
                            Submit
                        </PrimaryButton>
                    </div>
                </motion.div>
            </AnimatePresence></>
    );
};

const ZipLineModal = ({ onClose }: { onClose: () => void }) => {


    return (
        <AnimatePresence>
            <motion.div
                key="feedback-modal"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}

                className="md:w-[450px] w-full bg-white py-6 px-5 fixed right-0 top-30 rounded-tl-3xl rounded-bl-3xl z-50"
                style={{
                    boxShadow:
                        "4px -4px 10px rgba(0, 0, 0, 0.1), 4px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                {/* Close Icon */}
                <XMarkIcon
                    className="w-5 h-5 absolute right-5 top-4 text-gray-500 cursor-pointer"
                    onClick={onClose}
                />

                <div className="flex flex-col items-center md:items-start text-center md:text-left px-6 md:px-10 gap-4 md:mt-0 mt-5 w-full md:w-auto">
                    <img src="/assets/img/search-property/bg_1_mobile_small.png" alt="Zibi Logo" className="w-full mx-auto" />


                    <img src="/assets/img/search-property/zibi-logo.svg" alt="Zibi Logo" className="h-[30px] mx-auto" />

                    <p className="text-lg  text-center w-full">
                        <strong>Student Housing</strong> – <br /> Just a Zip-Line Away.
                    </p>

                    <div className="flex justify-center w-[100%]">
                        <PrimaryButton color="black">
                            View Available Units
                        </PrimaryButton>
                    </div>
                </div>
            </motion.div>
            </AnimatePresence>
            );
};




const ResponsiveTabSelector = () => {
    const tabOptions = ["My Housing", "Matches", "Explore", "My Preferences"];
            const [selectedTab, setSelectedTab] = useState("My Housing");
            const [isDropdownOpen, setIsDropdownOpen] = useState(false);
            const [price, setPrice] = useState(1250);
            const [distance, setDistance] = useState(8);
            const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
            const [selectedBeds, setSelectedBeds] = useState<number | null>(null);
            const [selectedBaths, setSelectedBaths] = useState<number | null>(null);
            const [selectedOccupancies, setSelectedOccupancies] = useState<number | null>(null);

    const toggleAmenity = (label: string) => {
                setSelectedAmenities((prev) =>
                    prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
                );
    };

            const amenitiesList = [
            {label: 'Free Parking', icon: 'free_parking.svg' },
            {label: 'Air Conditioning', icon: 'air_conditioning.svg' },
            {label: 'Washer/Dryer', icon: 'washer.svg' },
            {label: 'Dishwasher', icon: 'dishwasher.svg' },
            ];

    const handleSelectTab = (tab: string) => {
                setSelectedTab(tab);
            setIsDropdownOpen(false);
    };


    // Calculate percentage position
    const getPriceLeftPosition = () => {
        const percentage = ((price - 500) / (2000 - 500)) * 100;
            return `calc(${percentage}% - 24px)`; // Center the label
    };
    const getDistanceLeftPosition = () => {
        const percentage = ((distance - 1) / (50 - 1)) * 100;
            return `calc(${percentage}% - 24px)`; // Center the label
    };



            return (
            <>
                {/* Desktop View */}
                <div className="hidden lg:flex justify-between bg-white my-10 mx-10 shadow-md px-5 py-4 rounded-full text-sm font-medium">
                    {tabOptions.map((tab, idx) => (
                        <div
                            key={tab}
                            className={`w-[25%] text-center cursor-pointer ${idx < tabOptions.length - 1 ? "border-r-2 border-[#CCCCCC]" : ""
                                } ${selectedTab === tab ? "text-[#B3322F] font-semibold" : ""}`}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>

                {/* Mobile View */}
                <div className="lg:hidden py-6 px-6 relative z-50">
                    {/* Toggle Button */}
                    <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="text-center bg-white shadow-md px-5 py-2 rounded-full text-sm font-medium cursor-pointer relative z-50"
                    >
                        {selectedTab}
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
                                className="absolute left-0 right-0 mt-2 mx-6 bg-white shadow-xl rounded-2xl px-5 py-4 text-sm z-40"
                            >
                                {tabOptions.map((tab) => (
                                    <div
                                        key={tab}
                                        className={`text-center py-2 cursor-pointer hover:text-[#B3322F] ${selectedTab === tab ? "text-[#B3322F] font-semibold" : ""
                                            }`}
                                        onClick={() => handleSelectTab(tab)}
                                    >
                                        {tab}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>



                </div>

                {selectedTab === "My Preferences" && <AnimatePresence>
                    {(
                        <motion.div
                            key="dropdown"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 right-0 mt-2 mx-6 bg-white shadow-xl rounded-2xl px-5 py-4 text-sm z-40"
                        >

                            <div className="flex lg:flex-row flex-col justify-between gap-2 p-4 space-y-6 text-sm font-medium text-gray-800 mx-auto">
                                <div className='md:w-[60%] w-full flex flex-col gap-10'>
                                    {/* Price Slider */}
                                    <div className='flex flex-col md:flex-row  md:gap-8 gap-4 md:items-end'>
                                        <p className=" md:text-lg text-md md:text-black text-[#B3322F] font-semibold mb-1 md:w-35 text-left">Price</p>
                                        <div className=" w-full">
                                            <div className="flex justify-between text-black font-semibold mb-2">
                                                <p>$500</p>
                                                <p>$2000</p>
                                            </div>

                                            <div className="relative w-full">
                                                {/* Slider */}
                                                <input
                                                    type="range"
                                                    className="custom-slider w-full"
                                                    min={500}
                                                    max={2000}
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />

                                                {/* Moving label */}
                                                <div
                                                    className="absolute top-8 font-bold text-sm"
                                                    style={{ left: getPriceLeftPosition() }}
                                                >
                                                    ${price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Distance Slider */}
                                    <div className='flex flex-col md:flex-row  md:gap-8 gap-4 md:items-end'>
                                        <p className=" md:text-lg text-md md:text-black text-[#B3322F] font-semibold mb-1 md:w-35 text-left">Distance <br className='md:flex hidden' />From Campus</p>
                                        <div className="w-full">
                                            <div className="flex justify-between text-black font-semibold mb-2">
                                                <p>1</p>
                                                <p>50</p>
                                            </div>

                                            <div className="relative w-full">
                                                {/* Slider */}
                                                <input
                                                    type="range"
                                                    className="custom-slider w-full"
                                                    min={1}
                                                    max={50}
                                                    value={distance}
                                                    onChange={(e) => setDistance(e.target.value)}
                                                />

                                                {/* Moving label */}
                                                <div
                                                    className="absolute top-8 font-bold text-sm"
                                                    style={{ left: getDistanceLeftPosition() }}
                                                >
                                                    {distance}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Amenities */}
                                    <div className='flex flex-col md:flex-row  md:gap-8 gap-4 md:items-end'>
                                        <p className=" md:text-lg text-md md:text-black text-[#B3322F] font-semibold mb-1 md:w-35 text-left">Amenities</p>
                                        <div className="flex flex-wrap gap-4 md:gap-2">
                                            {amenitiesList.map((amenity) => {
                                                const selected = selectedAmenities.includes(amenity.label);
                                                return (
                                                    <button
                                                        key={amenity.label}
                                                        onClick={() => toggleAmenity(amenity.label)}
                                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full border shadow-sm ${selected
                                                            ? 'bg-[#B3322F] text-white border-[#B3322F]'
                                                            : 'bg-white text-black border-gray-300'
                                                            }`}
                                                    >
                                                        <span><img src={`/assets/img/search-property/${amenity.icon}`} className='w-4' /></span>
                                                        <span>{amenity.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Unit Size */}
                                    <div className='flex flex-col md:flex-row  md:gap-8 gap-4 md:items-end'>
                                        <p className=" md:text-lg text-md md:text-black text-[#B3322F] font-semibold mb-1 md:w-35 text-left">Unit Size</p>
                                        <div className="flex flex-col md:flex-row justify-start gap-3  ">
                                            <NumberInput label="Beds" value={selectedBeds} onChange={setSelectedBeds} />
                                            <NumberInput label="Bathrooms" value={selectedBaths} onChange={setSelectedBaths} />
                                            <NumberInput label="Occupancy" value={selectedOccupancies} onChange={setSelectedOccupancies} />
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className='flex flex-col md:flex-row  md:gap-8 gap-4 md:items-end'>
                                        <p className=" md:text-lg text-md md:text-black text-[#B3322F] font-semibold mb-1 md:w-35 text-left">Location</p>
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="md:w-50 w-full px-4 py-2 rounded-full shadow-md outline-none"
                                        />
                                    </div>
                                </div>
                                {/* Buttons */}
                                <div className=" lg:w-[20%] md:w-[50%] w-full flex flex-col gap-6">
                                    <button className=" py-2 md:px-10 bg-[#B3322F] text-white rounded-full font-semibold shadow-md">
                                        Update Roommate Preferences
                                    </button>
                                    <button className=" py-2 :px-10 bg-[#B3322F] text-white rounded-full font-semibold shadow-md">
                                        Search Specific Properties
                                    </button>
                                </div>
                            </div>


                        </motion.div>
                    )}
                </AnimatePresence>}
            </>
            );
};

            // 🔽 Dropdown Component
            type NumberInputProps = {
                label: string;
            value: number;
    onChange: (val: number) => void;
};

            function NumberInput({label, value, onChange}: NumberInputProps) {
    const handleIncrement = () => onChange(value + 1);
    const handleDecrement = () => onChange(Math.max(0, value - 1));

            return (
            <div className=" flex items-start justify-center gap-2">
                <div className="text-md text-gray-500   h-full flex items-center w-full">{label}</div>
                <div className="flex items-center rounded-md px-2 py-1  bg-white">
                    <button
                        type="button"
                        onClick={handleDecrement}
                        className="p-1 disabled:opacity-30"
                        disabled={value <= 0}
                    >
                        <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className='w-6 text-center'>{value || "Any"} </span>
                    <button type="button" onClick={handleIncrement} className="p-1">
                        <ChevronUpIcon className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>
            );
}

