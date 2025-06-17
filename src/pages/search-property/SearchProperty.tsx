import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import SearchPropertyLayout from '../../layouts/SearchProperty.Layout'
import { HousingCard, PrimaryButton } from './ComponComponents'
import { motion, AnimatePresence } from "framer-motion";

const SearchProperty = () => {
    const [feedbackForm, setFeedBackForm] = useState(true);


    return (
        <>
            <SearchPropertyLayout>
                {/* Filters */}\
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

                    <HousingCard
                        title="Alma @ ByWard Market"
                        imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        location="256 Rideau St, Ottawa, ON K1N 0G1"
                        type="Apartment"
                        priceRange="$1,350 - $1,999"
                        matchPercent="96"
                        bgClass="bg-gradient-to-br from-[#B3322F] to-[#4D1614]"
                    />
                    <HousingCard
                        title="Alma @ ByWard Market"
                        imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        location="256 Rideau St, Ottawa, ON K1N 0G1"
                        type="Apartment"
                        priceRange="$1,350 - $1,999"
                        matchPercent="96"
                        bgClass="bg-gradient-to-br from-[#B3322F] to-[#4D1614]"
                    />
                    <HousingCard
                        title="Alma @ ByWard Market"
                        imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        location="256 Rideau St, Ottawa, ON K1N 0G1"
                        type="Apartment"
                        priceRange="$1,350 - $1,999"
                        matchPercent="96"
                        bgClass="bg-gradient-to-br from-[#B3322F] to-[#4D1614]"
                    />
                    <HousingCard
                        title="Alma @ ByWard Market"
                        imageUrl="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        location="256 Rideau St, Ottawa, ON K1N 0G1"
                        type="Apartment"
                        priceRange="$1,350 - $1,999"
                        matchPercent="96"
                        bgClass="bg-gradient-to-br from-[#B3322F] to-[#4D1614]"
                    />
                </div>
                {/* I’ll Search On My Own Instead Button */}
                <div className='flex  justify-center py-10'>
                    <PrimaryButton  >
                        I’ll Search On My Own Instead <ArrowRightIcon className=' ml-2 mt-0.5 w-5' />
                    </PrimaryButton>
                </div>

                {/* Rating Card */}
                {feedbackForm && <FeedbackForm onClose={() => setFeedBackForm(false)} />}

                <ChatButton />
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
      <div className="fixed right-0 bottom-1/3 z-50">
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


// const ChatButton = () => {
//     return (
//         <div className="fixed right-0 bottom-1/3 z-50">
//             <button className="flex items-center gap-2 bg-white text-[#B3322F] font-medium shadow-md px-8 py-3 rounded-l-full border border-gray-200 hover:bg-gray-50 transition-all">
//                 <ArrowLeftIcon className='w-6 mt-1' />
//                 <span className="text-lg">tap to chat</span>
//                 <img src="/assets/img/search-property/chat_icon.svg" alt="Zibi Logo" className="h-[60px] mx-auto" />
//             </button>
//         </div>
//     );
// };


const FeedbackForm = ({ onClose }: { onClose: () => void }) => {
    const [rating, setRating] = useState<number>(0);

    const handleStarClick = (index: number) => {
        setRating(index);
    };

    return (
        <div
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
        </div>
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
        </>
    );
};

