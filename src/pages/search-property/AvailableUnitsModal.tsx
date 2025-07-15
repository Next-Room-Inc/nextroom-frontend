import { PlusIcon, StarIcon } from "@heroicons/react/20/solid";
import {
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip
} from 'chart.js';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Line } from 'react-chartjs-2';
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PrimaryButton } from "./ComponComponents";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import { IMAGES } from "../../utils/constants/app-info.constant";

const UNIT_DETAILS = {
    title: "1 Bedroom",
    imageUrl: "/assets/img/search-property/blueprint_1.png",
    status: "Popular",
    price: "$1,815",
    amenities:
        [
            {
                label: "1",
                icon: "/assets/img/search-property/bed_black_icon.svg",
                alt: "Bed Icon",
            },
            {
                label: "1",
                icon: "/assets/img/search-property/bath_black_icon.svg",
                alt: "Bath Icon",
            },
            {
                icon: "/assets/img/search-property/washer_black_icon.svg",
                alt: "Washer Icon",
            },
            {
                icon: "/assets/img/search-property/wahingmachine_black_icon.svg",
                alt: "Washing Machine Icon",
            },
            {
                icon: "/assets/img/search-property/parking_black_icon.svg",
                alt: "Parking Icon",
            },
        ]
}

export const AvailableUnitsModal = ({
    propertyDetails, property
}) => {
    const navigate = useNavigate()
    const tabOptions = ["Units", "Building", "History", "Reviews & History"];
    const [selectedTab, setSelectedTab] = useState("Units");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleSelectTab = (tab: string) => {
        setSelectedTab(tab);
        setIsDropdownOpen(false);
    };

    return (
        <>
            <AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="  mt-2 mx-6 bg-white shadow-xl rounded-2xl px-5 py-4 text-sm z-40" >
                    {/* Image Gallery */}
                    <MediaGallery />
                    {/* section property details */}
                    <div className='flex justify-between flex-col md:flex-row'>
                        <div className='md:text-left text-center'>
                            <h1 className='underline font-bold'>30 rue Jos-Montferrand, Gatineau</h1>
                            <div className='flex gap-5 my-2'>
                                <p>2 tenants </p>
                                <p>{propertyDetails?.bedrooms} bed </p>
                                <p>{propertyDetails?.bathrooms} bath </p>
                                <p className='flex'> <StarIcon className='w-5' /> 4.94 (78)</p>
                            </div>
                            <h1 className='text-[#B3322F] font-bold'>${propertyDetails.rentMin} - ${propertyDetails.rentMax} monthly</h1>
                        </div>
                        <div className='md:w-auto w-full'>
                            <motion.button
                                onClick={() => navigate(ROUTES.CHAT)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="flex items-center gap-3 shadow-lg py-3 px-8 rounded-full mx-auto bg-white hover:bg-gray-100 text-gray-800 font-medium"
                            >
                                <img
                                    src="/assets/img/search-property/chaticon.svg"
                                    alt="Zibi Logo"
                                    className="h-5"
                                />
                                Chat With Property
                            </motion.button>
                        </div>
                    </div>
                    {/* line */}
                    <hr className='my-10 text-[#000000]' />

                    {/* Tab Selector */}
                    {/* Desktop View */}
                    <div className="hidden lg:flex justify-between bg-white my-10 shadow-md px-5 py-4 rounded-full text-sm font-medium w-[60%]">
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
                    {/* Unit Details Section */}
                    <div>
                        {selectedTab === "Units" && <UnitDetailsSection  {...UNIT_DETAILS} propertyDetails={propertyDetails} property={property} />}
                        {selectedTab === "Building" && <BuildingDetailSection propertyDetails={propertyDetails} />}
                        {selectedTab === "History" && <HistoryDetailSection />}
                        {selectedTab === "Reviews & History" && <ReviewDetailSection />}
                    </div>
                </motion.div>

            </AnimatePresence>

        </>
    )
}




const UnitDetailsSection: React.FC<{
    propertyDetails,
    property,
    title: string;
    imageUrl: string;
    status: string;
    price: string;
    amenities: {
        label?: string;
        icon: string;
        alt: string;
    }[];
}> = ({
    propertyDetails,
    property,
    title,
    imageUrl,
    status,
    price,
    amenities,
}) => {
    console.log(propertyDetails)
        // const [viewAllMatches, SetViewAllMatches] = useState(false)
        return (
            <>

                {
                    (propertyDetails?.availableUnits?.unit || []).map((unit) => <>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="rounded-xl shadow-md overflow relative p-6 mx-5 mt-12 text-black bg-[#D9D9D9]">
                            <div className="md:flex">
                                {/* Image section */}
                                <div className="relative w-full md:w-1/6">
                                    <img src={unit?.photos?.[0]?.uri || IMAGES.NOT_FOUND} alt={title} className="w-full h-48 object-center object-contain rounded-2xl" />
                                </div>


                                {/* Content section */}
                                <div className="w-full md:pl-6 md:mt-0 mt-6 flex flex-col justify-center">
                                    <div className="flex md:justify-start justify-between items-start w-full">
                                        <h2 className="md:text-2xl text-xl font-semibold">{propertyDetails?.bedrooms} Bedrooms</h2>
                                        <div className="bg-[#B3322F] text-white px-3 py-0.5 text-center rounded-full text-[10px] font-medium mt-3 w-[85px] ml-0 md:ml-5">
                                            {status}
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="mt-5 space-y-2 md:text-lg text-md">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between">
                                            <div className="text-center">
                                                ${unit?.rentMin} - ${unit?.rentMax}{" "}
                                                  monthly</div>
                                            
                                            <div className="md:mt-0 mt-2">
                                                <PrimaryButton className="bg-[#B3322F] text-white px-8 py-2 text-center rounded-full text-xs mx-auto" onClick={() => SetViewAllMatches(!viewAllMatches)}>
                                                    View All Matches
                                                </PrimaryButton>


                                            </div>
                                        </div>
                                        {/* {viewAllMatches && <ViewAllMatchesComponent />} */}

                                        {/* Amenities */}
                                        <div className="flex flex-col md:flex-row py-3 gap-3">
                                            
                                            <div className="grid grid-cols-3 md:grid-cols-6 gap-y-4 gap-x-3 justify-items-center md:justify-items-start py-3">
                                                {amenities.map((amenity, index) => (
                                                    <div key={index} className="flex items-center gap-1">
                                                        {amenity.label && <span>{amenity.label}</span>}
                                                        <img
                                                            src={amenity.icon}
                                                            className="h-6 w-6"
                                                            alt={amenity.alt}
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex md:items-start justify-center">
                                                <PrimaryButton className="bg-[#B3322F] text-white px-3 py-2 text-center rounded-full text-xs mt-2">
                                                    Explore Community Amenities
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col md:flex-row gap-4 md:w-fit py-3">
                                <PrimaryButton
                                    className="mx-auto bg-black text-white w-45 py-2 rounded-full text-md"
                                >
                                    Accept
                                </PrimaryButton>
                                <PrimaryButton
                                    className="mx-auto bg-black text-white w-45 py-2 rounded-full text-md"
                                >
                                    Request Tour
                                </PrimaryButton>
                                <PrimaryButton
                                    className="mx-auto bg-black text-white w-45 py-2 rounded-full text-md"
                                >
                                    Decline
                                </PrimaryButton>
                            </div>


                        </motion.div>
                    </>)
                }

            </>
        );
    };


const MediaGallery = () => {
    const imageList = [
        { src: "/assets/img/search-property/demo_gallary_image_1.png", alt: "Bedroom" },
        { src: "/assets/img/search-property/demo_gallary_image_2.png", alt: "Kitchen" },
        { src: "/assets/img/search-property/demo_gallary_image_3.png", alt: "Living Room" },
        { src: "/assets/img/search-property/demo_gallary_image_1.png", alt: "Bathroom" },
        { src: "/assets/img/search-property/demo_gallary_image_2.png", alt: "Map" },
    ];
    return (
        <div className="w-full py-5">
            {/* Mobile Slider */}
            <div className="block md:hidden">
                <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    spaceBetween={16}
                    slidesPerView={1}
                >
                    {imageList.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img src={item.src} alt={item.alt} className="w-full h-[250px] object-cover rounded-xl" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


            {/* Desktop Layout */}
            <div className="hidden md:flex gap-4">
                {/* Left Large Image */}
                <div className="w-1/2">
                    <img
                        src={imageList[0].src}
                        alt={imageList[0].alt}
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>

                {/* Right Grid */}
                <div className="w-1/2 flex flex-col gap-4">

                    <img
                        src={imageList[1].src}
                        alt={imageList[1].alt}
                        className="w-full h-[120px] object-cover rounded-xl"
                    />

                    <img
                        src={imageList[3].src}
                        alt={imageList[3].alt}
                        className="w-full h-[120px] object-cover rounded-xl"
                    />

                </div>
                <div className="w-1/3">
                    <img
                        src={imageList[0].src}
                        alt={imageList[0].alt}
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>

            </div>
        </div>
    );
};


const BuildingDetailSection = ({propertyDetails}) => {
    // const description = "Modern, premium studio apartments offer everything you need for a comfortable and convenient living experience. Fully-furnished with stylish, high-quality furniture, including a comfortable bed, desk, and storage solutions, this space is designed to make your daily life as easy and enjoyable as possible."
    const description = propertyDetails?.description || "No description Added yet"
    const yearBuilt = "2011"
    const houseRules = "To ensure a respectful and comfortable living environment for everyone, please follow these house rules. Keep noise levels down, especially during quiet hours (typically 10 PM – 7 AM). Guests are welcome, but overnight visitors should be discussed with roommates in advance. Maintain cleanliness in shared areas and dispose of garbage regularly. Smoking, vaping, and illegal substances are strictly prohibited inside the apartment. Be mindful of energy and water usage, and report any maintenance issues promptly. Above all, treat your roommates, neighbors, and the property with respect."

    return (
        <motion.div
            className="mt-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }} >
            <div>
                <h1 className="font-bold mb-2">Description</h1>
                <p className="md:w-[70%]">{description}</p>
            </div>

            <div className="my-6">
                <h1 className="font-bold mb-2">Year Built</h1>
                <p>{yearBuilt}</p>
            </div>

            <div>
                <h1 className="font-bold mb-2">House Rules</h1>
                <p>{houseRules}</p>
            </div>

            <hr className="my-8" />

            <div className="w-full  pb-5 px-4">
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center max-w-4xl mx-auto">
                    <PrimaryButton className="bg-black text-white px-6 py-2 md:w-45 rounded-full text-sm font-medium hover:bg-gray-800 transition duration-200"> Accept </PrimaryButton>
                    <PrimaryButton className="bg-black text-white px-6 py-2 md:w-45 rounded-full text-sm font-medium hover:bg-gray-800 transition duration-200"> Request Tour </PrimaryButton>
                    <PrimaryButton className="bg-black text-white px-6 py-2 md:w-45 rounded-full text-sm font-medium hover:bg-gray-800 transition duration-200"> Decline </PrimaryButton>
                </div>
            </div>
        </motion.div>
    )
}


const HistoryDetailSection = () => {

    return (

        <motion.div
            className="mt-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }} >

            <div className="flex flex-col md:flex-row gap-y-5 ">
                <div className="md:w-[50%] w-full">
                    <p className="text-center font-bold mb-3 text-[#B3322F] ">Price Changes Year Over Year <br className="md:hidden flex" /> (2021-2024)</p>
                    <div className="flex gap-3  justify-center mx-auto ">
                        <button className="bg-[#B3322F] text-white  py-1 w-25 rounded-full text-sm font-medium hover:bg-gray-800 transition duration-200"> Studio </button>
                        <button className="bg-[#B3322F] text-white  py-1 w-25 rounded-full text-sm font-medium hover:bg-gray-800 transition duration-200"> 1 Bedroom </button>
                    </div>
                    <div>
                        <ChartComponent />
                    </div>

                </div>
                <div className="md:w-[50%] w-full  flex flex-col items-center  justify-center ">
                    <div className="md:w-auto w-full  ">
                        <h2 className="text-xl font-semibold   mb-3">Price</h2>
                        <div className="md:w-60 w-full">


                            <div className="relative  w-full">
                                <input
                                    disabled
                                    type="range"
                                    className="custom-slider   bg-gradient-to-r from-[#ED1111] to-[#5CE64C]   h-20 rounded-lg"
                                    style={{ background: "linear-gradient(to right, #ED1111, #5CE64C)", width: "100%", height: '10px', paddingTop: '10px', borderRadius: "12px", }}
                                    min={500}
                                    max={2000}
                                />
                            </div>
                            <div className="flex justify-between text-black font-semibold mb-2">
                                <p>Expensive</p>
                                <p>Affordable</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 md:w-auto w-full">
                        <h2 className="text-xl font-semibold  ">Value</h2>
                        <p className="text-xs font-semibold   mb-3">(compared to nearby apartments)</p>
                        <div className="md:w-60 w-full">


                            <div className="relative  w-full">
                                <input
                                    disabled
                                    type="range"
                                    className="custom-slider   bg-gradient-to-r from-[#ED1111] to-[#5CE64C]   h-20 rounded-lg"
                                    style={{ background: "linear-gradient(to right, #ED1111, #5CE64C)", width: "100%", height: '10px', paddingTop: '10px', borderRadius: "12px", }}
                                    min={500}
                                    max={2000}
                                />
                            </div>
                            <div className="flex justify-between text-black font-semibold mb-2">
                                <p>Low</p>
                                <p>High</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <hr className="my-8" />

            <div className="w-full  pb-5 px-4">
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center max-w-4xl mx-auto">
                    <PrimaryButton className="bg-black text-white px-6 py-2 md:w-45 rounded-full text-sm font-medium hover:bg-gray-800 transition duration-200"> Accept </PrimaryButton>
                    <PrimaryButton className="bg-black text-white px-6 py-2 md:w-45 rounded-full text-sm font-medium hover:bg-gray-800 transition duration-200"> Request Tour </PrimaryButton>
                    <PrimaryButton className="bg-black text-white px-6 py-2 md:w-45 rounded-full text-sm font-medium hover:bg-gray-800 transition duration-200"> Decline </PrimaryButton>
                </div>
            </div>

        </motion.div>)
}

const ReviewDetailSection = () => {

    return (
        <motion.div
            className="mt-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }} >

            <div className=" mx-auto p-4 space-y-10 text-sm text-gray-800">
                {/* Reviews */}
                <section>
                    <h2 className="text-xl font-semibold text-[#B3322F] mb-3">Reviews</h2>



                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Filter By:</span>
                            <select className="px-4   py-1 text-sm text-[#B3322F] font-semibold rounded-full shadow-md bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-[#B3322F] hover:shadow-lg transition duration-150">
                                <option>Newest</option>
                                <option>Oldest</option>
                            </select>
                        </div>
                        <select className="px-4   py-1 text-sm text-[#B3322F] font-semibold rounded-full shadow-md bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-[#B3322F] hover:shadow-lg transition duration-150">
                            <option>Highest Rating</option>
                            <option>Lowest Rating</option>
                        </select>
                    </div>

                    {/* review image */}
                    <div className="flex gap-2">
                        <img src="/assets/img/search-property/review_img_1.png" className="w-30 h-30 object-contain object-center" />
                        <img src="/assets/img/search-property/review_img_2.png" className="w-30 h-30 object-contain object-center" />
                    </div>


                    {/* Review 1 */}
                    <div className="space-y-2 border-b pb-4">
                        <h3 className="font-bold">John D. <span className="text-yellow-500">★★★★☆</span></h3>
                        <p>
                            I've been living in this apartment for almost a year, and overall it's been a great experience. The location is super convenient—just a 10-minute walk to campus and right next to a grocery store and bus stop. The unit itself is modern and well-maintained, though the walls are a bit thin, so you can sometimes hear your neighbors. Maintenance responds pretty quickly to issues, which I really appreciate. It's a bit pricey for a student budget, but the convenience makes it worth it.
                        </p>
                    </div>

                    {/* Review 2 */}
                    <div className="space-y-2 mt-4">
                        <h3 className="font-bold">Gail P. <span className="text-yellow-500">★★★☆☆</span></h3>
                        <p>
                            About two months into my lease, the heating stopped working in the middle of a cold snap. I submitted a repair request through the online portal, and to my surprise, the property manager got back to me the same day. A technician came by the next morning and had it fixed within an hour. I was honestly expecting a longer wait based on past rentals, so I was impressed. It's not a perfect apartment—noise can be an issue on weekends—but the quick response made me feel like the management actually cares.
                        </p>
                        <button className="text-red-600 text-xs font-semibold mt-1">View More</button>
                    </div>
                </section>

                {/* Repair History */}
                <section>
                    <h2 className="text-xl font-semibold text-[#B3322F] mb-3">Repair History</h2>
                    <p className="mb-2 font-medium">Number of repairs within 12 months: <span className="font-bold">19</span></p>

                    <div className="flex gap-4 items-center mb-4">
                        <span className="font-medium">Filter By:</span>
                        <select className="px-4   py-1 text-sm text-[#B3322F] font-semibold rounded-full shadow-md bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-[#B3322F] hover:shadow-lg transition duration-150">
                            <option>Newest</option>
                            <option>Oldest</option>
                        </select>
                    </div>

                    {/* review image */}
                    <div className="flex gap-2">
                        <img src="/assets/img/search-property/review_img_1.png" className="w-30 h-30 object-contain object-center" />
                        <img src="/assets/img/search-property/review_img_2.png" className="w-30 h-30 object-contain object-center" />
                    </div>

                    {/* Repair Card */}
                    <div className="  rounded-md  space-y-2">
                        <div className="font-bold">uOttawa Student</div>
                        <div><span className="font-semibold">Repair Type:</span> Urgent</div>
                        <div><span className="font-semibold">Title:</span> Broken Washing Machine</div>
                        <div>
                            <span className="font-semibold">Details:</span>{" "}
                            I wanted to let you know that the washing machine in our unit has stopped working — it won’t start even when plugged in and the cycle won’t begin. Could you please arrange for a repair as soon as possible? Let me know if you need any more details or if someone will be coming by.
                        </div>

                        {/* Status timeline */}
                        <div className="space-y-1">
                            <div className="font-semibold">Status:</div>
                            {/* <div className="flex items-center gap-2 text-xs">
                            <span className="w-3 h-3 bg-red-600 rounded-full"></span> Request Submitted
                            <span className="w-3 h-3 bg-gray-400 rounded-full"></span> Landlord Responded
                            <span className="w-3 h-3 bg-gray-400 rounded-full"></span> Closed Request
                        </div> */}
                            <StepComponent />
                        </div>

                        <button className="text-red-600 text-xs font-semibold mt-2">View More</button>
                    </div>
                </section>

                {/* Landlord Response Rate */}

                <section>
                    <h2 className="text-xl font-semibold text-[#B3322F] mb-3">Landlord Response Rate</h2>
                    <div className="md:w-60 w-full">


                        <div className="relative  w-full">
                            <input
                                disabled
                                type="range"
                                className="custom-slider   bg-gradient-to-r from-[#ED1111] to-[#5CE64C]   h-20 rounded-lg"
                                style={{ background: "linear-gradient(to right, #ED1111, #5CE64C)", width: "100%", height: '10px', paddingTop: '10px', borderRadius: "12px", }}
                                min={500}
                                max={2000}
                            />
                        </div>
                        <div className="flex justify-between text-black font-semibold mb-2">
                            <p>Slow</p>
                            <p>Fast</p>
                        </div>
                    </div>
                </section>
            </div>



            <hr className="my-8" />

            <div className="w-full  pb-5 px-4">
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center max-w-4xl mx-auto">
                    <PrimaryButton className="bg-black text-white px-6 py-2 md:w-45 rounded-full text-sm font-medium hover:bg-gray-800 transition duration-200"> Accept </PrimaryButton>
                    <PrimaryButton className="bg-black text-white px-6 py-2 md:w-45 rounded-full text-sm font-medium hover:bg-gray-800 transition duration-200"> Request Tour </PrimaryButton>
                    <PrimaryButton className="bg-black text-white px-6 py-2 md:w-45 rounded-full text-sm font-medium hover:bg-gray-800 transition duration-200"> Decline </PrimaryButton>
                </div>
            </div>
        </motion.div>)
}



const steps = [
    { name: <p>Request <br /> Submitted</p>, description: 'Vitae sed mi luctus laoreet.', href: '#', status: 'complete' },
    {
        name: <p>Landlord <br /> Responded</p>,
        description: 'Cursus semper viverra facilisis et et some more.',
        href: '#',
        status: 'complete',
    },
    { name: <p>Closed <br />Request</p>, description: 'Penatibus eu quis ante.', href: '#', status: 'upcoming' },
]


function StepComponent() {

    function classNames(...classes: (string | false | null | undefined)[]): string {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
                {steps.map((step, stepIdx) => (
                    <li key={stepIdx} className={classNames(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
                        {step.status === 'complete' ? (
                            <>
                                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                    <div className="h-0.5 w-full bg-[#B3322F]" />
                                </div>
                                <a

                                    className="relative flex size-8 items-center justify-center rounded-full bg-[#B3322F] hover:bg-red-900"
                                >
                                </a>
                                <span className="sr-only">{step.name}</span>

                            </>
                        ) : (
                            <>
                                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <a

                                    className="group relative flex size-8 items-center justify-center rounded-full border-2 border-[#B3322F] bg-white  "
                                >
                                    <span aria-hidden="true" className="size-2.5 rounded-full bg-transparent group-hover:bg-[#B3322F]" />
                                    <span className="sr-only">{step.name}</span>
                                </a>
                            </>
                        )}
                        {/* <p className="-mt-5  h-10 flex items-end bg-red-100">
              {step.name}
              </p> */}
                    </li>
                ))}
            </ol>
            <ol role="list" className="flex items-center mt-5">
                {steps.map((step, stepIdx) => (
                    <li key={stepIdx} className={classNames(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>

                        <>
                            <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                <p className="-mt-5  h-10 flex items-end   text-[12px]">
                                    {step.name}
                                </p>
                            </div>
                            <a
                                href="#"
                                className="group relative flex size-8 items-center justify-center rounded-full    hover:border-gray-400"
                            >

                            </a>
                        </>

                        {/* <p className="-mt-5  h-10 flex items-end bg-red-100">
              {step.name}
              </p> */}
                    </li>
                ))}
            </ol>
        </nav>
    )
}











const ChartComponent = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        // Title,
        Tooltip,
        // Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                // display: true,
                // text: 'Chart.js Line Chart',
            },
        },
    };

    const labels = ['2020', '2021', '2022', '2023', '2024'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [1000, 1200, 1500, 1600, 2000],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };


    return (
        <div className="md:h-65 w-auto mx-auto  p-5 flex justify-center items-center">
            <Line options={options} data={data} />
        </div>
    )
}


const ViewAllMatchesComponent = () => {
    const [selectedUser, setSelectedUser] = useState<boolean | null>(null);

    const statusList = [
        { label: "Accepted", borderColor: "border-green-500" },
        { label: "Pending", borderColor: "border-yellow-400" },
        { label: "No Response", borderColor: "border-red-500" },
        { label: "Open", icon: "/assets/img/icons/owl_icon.svg" }, // gray icon (owl-like)
    ];

    const users = [
        "/assets/img/search-property/student_profile (1).png",
        "/assets/img/search-property/student_profile (2).png",
        "/assets/img/search-property/student_profile (3).png",
        "/assets/img/search-property/student_profile (4).png",
        "/assets/img/search-property/student_profile (5).png",
        "/assets/img/search-property/student_profile (2).png",
        "/assets/img/search-property/student_profile (3).png",
        "/assets/img/search-property/student_profile (4).png",
        "/assets/img/search-property/student_profile (5).png",
    ];
    const users2 = [
        "/assets/img/search-property/student_profile (1).png",
        "/assets/img/search-property/student_profile (2).png",
        "/assets/img/search-property/student_profile (3).png",
        "/assets/img/search-property/student_profile (4).png",
    ];

    return (
        <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="
            absolute 
            left-1/2 
            -translate-x-1/2 
            md:left-auto md:right-0 md:translate-x-0 
            mt-2 md:mx-4 
            bg-red-100 shadow-xl rounded-2xl py-4 text-sm z-40 
            w-[350px] md:w-[420px]
        "
        >

            <PrimaryButton className="mx-auto">
                <PlusIcon className="h-4 mt-1 mr-2" />
                Invite Roommates
            </PrimaryButton>
            {/* Staus Samples  */}
            {/* Status Circles */}
            <div className="flex justify-center gap-5 mb-6 my-8">
                {statusList.map((status, idx) => (
                    <div key={idx} className="flex flex-col items-center text-sm">
                        {status.icon ? (
                            <div>

                                <img src={status.icon} alt="Open" className="w-15 h-15  bg-[#D9D9D9] rounded-full p-2" />
                            </div>
                        ) : (
                            <div
                                className={`w-15 h-15 rounded-full border-3 ${status.borderColor}`}
                            ></div>
                        )}
                        <span className="mt-2">{status.label}</span>
                    </div>
                ))}
            </div>
            {/* Title */}
            <h2 className="text-xl font-semibold mb-6 text-center">Organize Your Matches</h2>
            {/* Profile Images */}
            <div className="w-full py-4 shadow-md px-4 mb-2">
                <Swiper
                    spaceBetween={5}
                    slidesPerView={5}
                    breakpoints={{
                        640: { slidesPerView: 4 },
                        768: { slidesPerView: 4 },
                    }}
                >
                    {users.map((src, idx) => (
                        <SwiperSlide key={idx}>
                            <img
                                src={src}
                                alt={`User ${idx + 1}`}
                                className="w-15 h-15 rounded-full object-cover "
                                onClick={() => setSelectedUser(!selectedUser)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/*  */}
            <p className="text-center text-[12px]">Drag And Drop To Edit Roommate Options</p>
            <div className=" w-fit mx-auto flex gap-3 py-4   px-4 mb-5 bg-[#B3322F] rounded-full my-5">
                {users2.map((src, idx) => (

                    <img
                        src={src}
                        alt={`User ${idx + 1}`}
                        className="w-15 h-15 rounded-full object-cover "
                        onClick={() => setSelectedUser(!selectedUser)}

                    />
                ))}
            </div>
            {/* Title */}
            <h2 className="text-xl font-semibold mb-6 text-center">Rommate Options</h2>
            <div className=" w-fit mx-auto flex gap-3 py-4   px-4 mb-5   rounded-full my-5">
                {users2.map((src, idx) => (

                    <img
                        src={src}
                        alt={`User ${idx + 1}`}
                        className="w-15 h-15 rounded-full object-cover "
                        onClick={() => setSelectedUser(!selectedUser)}

                    />
                ))}
            </div>
            <PrimaryButton className="mx-auto">
                Group Chat
            </PrimaryButton>
            <div className=" w-fit mx-auto flex gap-3 py-4   px-4 mb-5   rounded-full my-5">
                {users2.map((src, idx) => (

                    <img
                        src={src}
                        alt={`User ${idx + 1}`}
                        className="w-15 h-15 rounded-full object-cover "
                        onClick={() => setSelectedUser(!selectedUser)}

                    />
                ))}
            </div>
            <PrimaryButton className="mx-auto">
                Group Chat
            </PrimaryButton>



            {/*User Details  */}
            {selectedUser && (
                <motion.div
                    key="feedback-modal"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    className="absolute md:-ml-31 bottom-30  w-fit bg-white py-4 px-2 shadow-lg 
               md:rounded-bl-xl md:rounded-tl-xl z-10 
               md:rounded-br-none md:rounded-tr-none 
               rounded-br-xl rounded-tr-xl"
                >
                    <h2 className="text-xl font-semibold text-center">Amanda H.</h2>
                    <h2 className="text-base text-center mb-2">20 Years old</h2>
                    <PrimaryButton className="mx-auto">Chat</PrimaryButton>
                </motion.div>
            )}

        </motion.div>
    )
}