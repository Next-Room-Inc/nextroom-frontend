// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { AnimatePresence, motion } from "framer-motion";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const ResponsiveTabSelector: React.FC<{
//     tabOptions: string[],
//     tab: string,
//     tabOptionsObject: any;
// }> = ({ tabOptions, tab, tabOptionsObject }) => {
//     const navigate = useNavigate();

//     // const tabOptions = ["My Housing", "Matches", "Explore", "My Preferences"];
//     // const [selectedTab, setSelectedTab] = useState("My Housing");
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     // const handleSelectTab = (tab: string) => {
//     //     setSelectedTab(tab);
//     //     setIsDropdownOpen(false);
//     // };

//     const handleSelectTab = (tab: string) => {
//         navigate(`/landlords-dashboard/${tab}`);
//         if (isDropdownOpen) setIsDropdownOpen(false);
//     }

//     return (
//         <>
//             {/* Desktop View */}
//             <div className="hidden lg:flex justify-between bg-white my-10 mx-10 shadow-md px-5 py-4 rounded-full text-sm font-medium">
//                 {tabOptions.map((tab, idx) => (
//                     <div
//                         key={tab}
//                         className={`w-[25%] text-center  ${idx < tabOptions.length - 1 ? "border-r-2 border-[#CCCCCC]" : ""
//                             } ${selectedTab === tab ? "text-[#B3322F] font-semibold" : ""}`}
//                         onClick={() => setSelectedTab(tab)}
//                     >
//                         {tab}
//                     </div>
//                 ))}
//             </div>

//             {/* Mobile View */}
//             <div className="lg:hidden py-6 px-6 relative z-50">
//                 {/* Toggle Button */}
//                 <div
//                     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                     className="text-center bg-white shadow-md px-5 py-2 rounded-full text-sm font-medium  relative z-50"
//                 >
//                     {selectedTab}
//                 </div>

//                 {/* Dropdown */}
//                 <AnimatePresence>
//                     {isDropdownOpen && (
//                         <motion.div
//                             key="dropdown"
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -10 }}
//                             transition={{ duration: 0.2 }}
//                             className="absolute left-0 right-0 mt-2 mx-6 bg-white shadow-xl rounded-2xl px-5 py-4 text-sm z-40"
//                         >
//                             {tabOptions.map((tab) => (
//                                 <div
//                                     key={tab}
//                                     className={`text-center py-2  hover:text-[#B3322F] ${selectedTab === tab ? "text-[#B3322F] font-semibold" : ""
//                                         }`}
//                                     onClick={() => handleSelectTab(tab)}
//                                 >
//                                     {tab}
//                                 </div>
//                             ))}
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//             </div>

//             {selectedTab === "My Preferences" && <AnimatePresence>
//                 {(
//                     <motion.div
//                         key="dropdown"
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         transition={{ duration: 0.2 }}
//                         className="absolute left-0 right-0  mx-6 bg-white shadow-xl rounded-2xl px-5 py-4 text-sm z-40"
//                     >

//                         <PropertyFilters />

//                     </motion.div>
//                 )}
//             </AnimatePresence>}
//         </>
//     );
// };

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import PropertyFilters from '@src/components/PropertyFilters';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ResponsiveTabSelector: React.FC<{
    tabOptions: string[];
    tab: string;
    tabOptionsObject: any;
    navigations: any;
}> = ({ tabOptions, tab, tabOptionsObject, navigations }) => {
    const navigate = useNavigate();

    const [filter, setFilter] = useState(false);
    // const [selectedProfileTab, setSelectedProfileTab] = useState("My Dashboard");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const [profileDropDownStatus, setProfileDropDownStatus] = useState(false);

    const handleSelectTab = (tab: string) => {
        //  Custom Provided Nvigations
        const redirection = navigations[tab] || null;
        console.log("redirection=>", redirection);
        if (redirection) return navigate(redirection);

        //  Tab Navigation
        navigate(`/search-property/${tab}`);
        if (isDropdownOpen) setIsDropdownOpen(false);

        // if (tab === tabOptions[3]) setProfileDropDownStatus(!profileDropDownStatus)
        // else setProfileDropDownStatus(false)
    };

    return (
        <>
            {/* Desktop View */}
            <div className="flex justify-center items-center mt-10 mx-10 gap-2 pt-3  pb-6">
                <div className="hidden lg:flex justify-between bg-white   shadow-md px-5 py-4 rounded-full text-sm font-medium w-full">
                    {tabOptions.map((t, idx) => (
                        <div
                            key={t}
                            className={`w-[25%] text-center  ${idx < tabOptions.length - 1 ? "border-r-2 border-[#CCCCCC]" : ""
                                } ${tab === t ? "text-[#B3322F] font-semibold" : ""}`}
                            onClick={() => {
                                handleSelectTab(t);
                            }}
                        >
                            {/* {idx === 3 ? <>{tabOptionsObject?.[t]} ({selectedProfileTab}) </> : tabOptionsObject?.[t]} */}
                            {tabOptionsObject?.[t]}
                        </div>
                    ))}
                    <div></div>
                </div>

                {/* Mobile View */}
                <div className="lg:hidden   relative  w-full">
                    {/* Toggle Button */}
                    <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="text-center bg-white flex items-center justify-center  text-[#B3322F] shadow-md  w-full py-3 rounded-full text-sm font-medium  relative "
                    >
                        {/* {tab === tabOptions[3] ? <>{tab} ({selectedProfileTab})</> : tab} */}
                        {tabOptionsObject?.[tab]}
                        <ChevronDownIcon className="h-7 ml-2 mt-1 text-[#B3322F]" />
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
                                className="absolute left-0 right-0 mt-2 mx-6 bg-white shadow-xl rounded-2xl px-5 py-4 text-sm z-10"
                            >
                                {tabOptions.map((t, index: number) => (
                                    <div
                                        key={index}
                                        className={`text-center py-2  hover:text-[#B3322F] ${t === tab ? "text-[#B3322F] font-semibold" : ""
                                            }`}
                                        onClick={() => {
                                            handleSelectTab(t);
                                        }}
                                    >
                                        {/* {index === 3 ? selectedProfileTab : tab} */}
                                        {/* {index === 3 ? <>{tabOptionsObject?.[t]} ({selectedProfileTab}) </> : tabOptionsObject?.[t]} */}
                                        {tabOptionsObject?.[t]}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile View */}


                {(tab === "matches" || tab === "explore") && <Popover className="relative">
                    <PopoverButton className="focus:outline-none items-center gap-x-1 text-sm/6 font-semibold text-gray-900 mt-3">
                        <motion.div
                            onClick={() => setFilter(!filter)}
                            className="bg-white pt-3 pb-2 px-4 drop-shadow-md shadow-md rounded-full"
                            whileHover={{ scale: 1.1, }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <ChevronDownIcon className="text-[#B3322F] w-6" />
                        </motion.div>
                    </PopoverButton>
                    <PopoverPanel className="absolute  top-35 left-7 md:-left-120 z-10 mt-1 flex w-screen max-w-min -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in">
                        <div className="w-max px-3 shrink rounded-xl bg-white py-2 md:py-4 text-[14px] font-semibold text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                            <PropertyFilters />

                        </div>
                    </PopoverPanel>
                </Popover>}
            </div>

            {/* <AnimatePresence>
                {profileDropDownStatus && (
                    <motion.div
                        key="dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 md:left-auto right-0 -mt-2 mx-6 bg-white shadow-xl rounded-2xl    text-sm z-40 md:w-1/4"
                    >
                        <div className="p-4 space-y-2 text-sm font-medium  ">
                            {[
                                "My Dashboard",
                                "Search Filters",
                            ].map((item, index) => (
                                <motion.a
                                    key={index}
                                    className={`block py-0.5 px-3 ${item === selectedProfileTab ? "text-[#B3322F]" : "text-gray-900"}  `}
                                    whileHover={{
                                        scale: 1.01,
                                        color: "#dc2626", // Tailwind's red-600
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    onClick={() => {
                                        setSelectedProfileTab(item);
                                        setProfileDropDownStatus(!profileDropDownStatus)

                                    }}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence> */}
        </>
    );
};
