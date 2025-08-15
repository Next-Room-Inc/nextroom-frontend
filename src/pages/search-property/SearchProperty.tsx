import { ArrowRightIcon } from '@heroicons/react/16/solid'
import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from 'react'
import { LoaderComponent } from '../../components/Loader'
import PropertyFilters from '../../components/PropertyFilters'
import SearchPropertyLayout from '../../layouts/SearchProperty.Layout'
import { useGetEntrataPropertiesQuery } from '../../redux/services/property.service'
import { HousingCard, PrimaryButton } from './components/ComponComponents'

// const housingdetails = [
//     {
//         title: "Alma @ ByWard Market",
//         imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//         location: "256 Rideau St, Ottawa, ON K1N 0G1",
//         type: "Apartment",
//         priceRange: "$1,350 - $1,999",
//         matchPercent: "96",
//         bgClass: "bg-gradient-to-br from-[#B3322F] to-[#4D1614]",
//     },
//     {
//         title: "Alma @ ByWard Market",
//         imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//         location: "256 Rideau St, Ottawa, ON K1N 0G1",
//         type: "Apartment",
//         priceRange: "$1,350 - $1,999",
//         matchPercent: "96",
//         bgClass: "bg-gradient-to-br from-[#B3322F] to-[#4D1614]",
//     },
//     {
//         title: "Alma @ ByWard Market",
//         imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//         location: "256 Rideau St, Ottawa, ON K1N 0G1",
//         type: "Apartment",
//         priceRange: "$1,350 - $1,999",
//         matchPercent: "96",
//         bgClass: "bg-gradient-to-br from-[#B3322F] to-[#4D1614]",
//     },
// ]

const demoDetails = {
    title: "Alma @ ByWard Market",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    location: "256 Rideau St, Ottawa, ON K1N 0G1",
    type: "Apartment",
    priceRange: "$1,350 - $1,999",
    matchPercent: "96",
    bgClass: "bg-gradient-to-br from-[#B3322F] to-[#4D1614]",
}


const SearchProperty = () => {
    const [feedbackForm, setFeedBackForm] = useState(false);
    const [ziplineModal, setZiplineModal] = useState(false);
    const [selected, setSelected] = useState<number | null>(null);
    const { data = [], isLoading, isError, refetch } = useGetEntrataPropertiesQuery();


    useEffect(() => {
        const feedbackTimeout = setTimeout(() => setFeedBackForm(true), 10000); // 10 seconds
        const ziplineTimeout = setTimeout(() => setZiplineModal(true), 15000); // 15 seconds

        // Cleanup when component unmounts
        return () => { clearTimeout(feedbackTimeout); clearTimeout(ziplineTimeout); };
    }, []);


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
                                    <ArrowPathIcon className="w-5 h-5 text-[#B3322F] cursor-pointer" />
                                </motion.div>
                            </div > : <>

                                {(data[0]?.floorplans || []).map((propertyDetails, index) => <HousingCard
                                    index={index}
                                    selected={selected === index}
                                    setSelected={setSelected}
                                    propertyDetails={propertyDetails}
                                    property={data[0]}
                                    {...demoDetails}
                                />)}
                            </>}
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
                {/* AvailableUnitsModal */}
                {/* <div className='mx-10 md:mx-20'>
                    <h2 className="text-lg font-semibold text-center md:text-left text-gray-700 mb-4">Requested Tour(s)</h2>
                    <TourTimeline />
                </div> */}
            </SearchPropertyLayout>
        </>
    )
}

export default SearchProperty;


// const TourTimeline = () => {
//     const tourData = [
//         {
//             name: "You",
//             status: "Requested",
//             date: "September 15 2025",
//             image: "/assets/img/search-property/student_profile (1).png", // replace with your image path
//             color: "text-gray-600",
//         },
//         {
//             name: "uOttawa Student",
//             status: "Accepted",
//             date: "September 15 2025",
//             image: "/assets/img/search-property/student_profile (2).png",
//             color: "text-green-600",
//         },
//         {
//             name: "uOttawa Student",
//             status: "Pending",
//             date: "September 15 2025",
//             image: "/assets/img/search-property/student_profile (3).png",
//             color: "text-yellow-600",
//         },
//     ];

//     return (
//         <div className="bg-white rounded-4xl shadow-md p-4 w-full  px-8 mx-auto">


//             <div className={`flex  flex-col md:items-center md:flex-row justify-between py-10`}>
//                 {tourData.map((item, index) => (
//                     <Fragment key={index}>

//                         {index !== 0 && (
//                             <>
//                                 <div className={`hidden md:block h-1  border-t-4 border-[#B3322F] mx-2 ${[0, 1].includes(index) ? 'w-full' : 'w-80'}`}> </div>
//                                 <div className={`block md:hidden w-1  ml-15 border-l-4 border-[#B3322F] my-2 ${[0, 1].includes(index) ? 'h-30' : 'h-15'}`}></div>
//                             </>
//                         )}



//                         <div className="flex md:flex-col items-center md:text-center min-w-35 md:-mx-4.5  -my-3 overflow-hidden">
//                             <p className="hidden md:block mt-2 text-sm font-semibold   w-full mb-2">{item.name}</p>
//                             <div className="w-30 h-30 rounded-full overflow-hidden border-2 border-gray-300">
//                                 <img src={item.image} alt={item.name} className='w-full h-full' />
//                             </div>
//                             <div className='md:ml-0 ml-4'>
//                                 <p className="md:hidden block mt-2 text-sm font-semibold   w-full">{item.name}</p>

//                                 <p className={`text-md font-semibold ${item.color}`}>{item.status}</p>
//                                 <p className="text-sm  w-full">{item.date}</p>
//                             </div>
//                         </div>


//                         {index === 0 && (
//                             <>


//                                 <div className="hidden md:block h-1 w-full border-t-4 border-[#B3322F] mx-2"></div>
//                                 <div className="block md:hidden w-1 ml-15 h-30 border-l-4 border-[#B3322F] my-2"></div>


//                                 <div className={`flex md:flex-col items-center  md:-mx-4.5 -my-4.5  `}>
//                                     <p className="hidden md:block text-md font-semibold   -mt-10 md:ml-0 ml-4">Let's Go!</p>
//                                     <CheckCircleIcon className="w-30 h-30 md:w-20 md:h-20 text-[#B3322F]" />
//                                     <p className="md:hidden block text-md font-semibold    md:ml-0 ml-4">Let's Go!</p>

//                                 </div>
//                             </>
//                         )}


//                     </Fragment>
//                 ))}
//             </div>

//             <div className="my-4 border-t pt-4 md:px-4 text-sm text-gray-800 text-center md:flex gap-5 items-center">
//                 <p className='md:mt-2'><span className="font-semibold">Unit 308</span></p>
//                 <Button className="mt-2 px-4 py-1 text-sm border border-[#B3322F] rounded-full text-[#B3322F] hover:bg-red-50 transition">
//                     Withdraw Tour Request
//                 </Button>
//             </div>
//         </div>
//     );
// }
// const TourTimeline = () => {
//     const isMobile = true
//     const tourData = [
//         {
//             name: "You",
//             status: "Requested",
//             date: "September 15 2025",
//             image: "/assets/img/search-property/student_profile (1).png", // replace with your image path
//             color: "text-gray-600",
//         },
//         {
//             name: "uOttawa Student",
//             status: "Accepted",
//             date: "September 15 2025",
//             image: "/assets/img/search-property/student_profile (2).png",
//             color: "text-green-600",
//         },
//         {
//             name: "uOttawa Student",
//             status: "Pending",
//             date: "September 15 2025",
//             image: "/assets/img/search-property/student_profile (3).png",
//             color: "text-yellow-600",
//         },
//     ];

//     return (
//         <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-4xl mx-auto">
//             <h2 className="text-md font-medium text-gray-700 mb-4">Requested Tour(s)</h2>

//             <div className={`flex ${isMobile ? "flex-col items-center" : "flex-row justify-between items-center"} bg-red-100`}>
//                 {tourData.map((item, index) => (
//                     <Fragment key={index}>

//                       {index !== 0 && !isMobile && (
//                             <div className="h-1 w-full border-t-2 border-[#B3322F] mx-2 bg-green-100">asd</div>
//                         )}
//                         {index !== 0 && isMobile && (
//                             <div className="w-1 h-8 border-l-2 border-red-500 my-2"></div>
//                         )}


//                         <div className="flex flex-col items-center text-center">
//                             <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
//                                 <img src={item.image} alt={item.name} width={64} height={64} />
//                             </div>
//                             <p className="mt-2 text-sm font-semibold">{item.name}</p>
//                             <p className={`text-xs ${item.color}`}>{item.status}</p>
//                             <p className="text-xs text-gray-500">{item.date}</p>
//                         </div>


//                         {index === 0 && (
//                             <>

//                       { !isMobile && (
//                             <div className="h-1 w-full border-t-2 border-red-500 mx-2"></div>
//                         )}
//                         { isMobile && (
//                             <div className="w-1 h-8 border-l-2 border-red-500 my-2"></div>
//                         )}

//                             <div className={`flex flex-col items-center ${isMobile ? "my-2" : "mx-4"}`}>
//                                 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-300">
//                                     <CheckCircleIcon className="w-5 h-5 text-gray-400" />
//                                 </div>
//                                 {!isMobile && (
//                                     <p className="text-xs text-gray-500 mt-1">Let's Go!</p>
//                                 )}
//                             </div>
//                             </>
//                         )}


//                     </Fragment>
//                 ))}
//             </div>

//             <div className="my-4 border-t pt-3 text-sm text-gray-800 text-center">
//                 <p><span className="font-semibold">Unit 308</span></p>
//                 <Button className="mt-2 px-4 py-1 text-sm border border-[#B3322F] rounded-full text-[#B3322F] hover:bg-red-50 transition">
//                     Withdraw Tour Request
//                 </Button>
//             </div>
//         </div>
//     );
// }








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
                    <textarea
                        className="bg-gray-100 text-sm text-gray-700 px-4 py-3 rounded-md shadow-sm  w-full resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                        placeholder="Your opinion matters! Let us know how we're doing or what you'd like to see next. (Optional)"
                        rows={4}
                    />
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


    const handleSelectTab = (tab: string) => {
        setSelectedTab(tab);
        setIsDropdownOpen(false);
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
                        className="absolute left-0 right-0  mx-6 bg-white shadow-xl rounded-2xl px-5 py-4 text-sm z-40"
                    >

                        <PropertyFilters />


                    </motion.div>
                )}
            </AnimatePresence>}
        </>
    );
};


