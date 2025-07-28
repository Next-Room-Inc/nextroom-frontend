import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const ResponsiveTabSelector = ({ tabOptions, selectedTab, setSelectedTab }) => {

    const [selectedProfileTab, setSelectedProfileTab] = useState(tabOptions[3]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleSelectTab = (tab: string) => {
        setSelectedTab(tab);
        setIsDropdownOpen(false);
    };

    return (
        <>
            {/* Desktop View */}
            <div className="hidden lg:flex justify-between bg-white mt-10 mb-4 mx-10 shadow-md px-5 py-4 rounded-full text-sm font-medium">
                {tabOptions.map((tab, idx) => (
                    <div
                        key={tab}
                        className={`w-[25%] text-center cursor-pointer ${idx < tabOptions.length - 1 ? "border-r-2 border-[#CCCCCC]" : ""
                            } ${selectedTab === tab ? "text-[#B3322F] font-semibold" : ""}`}
                        onClick={() => setSelectedTab(tab)}
                    >
                        {idx === 3 ? selectedProfileTab : tab}
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
                            {tabOptions.map((tab, index) => (
                                <div
                                    key={tab}
                                    className={`text-center py-2 cursor-pointer hover:text-[#B3322F] ${selectedTab === tab ? "text-[#B3322F] font-semibold" : ""
                                        }`}
                                    onClick={() => handleSelectTab(tab)}
                                >
                                    {index === 3 ? selectedProfileTab : tab}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>



            </div>


            <AnimatePresence>
                {selectedTab === tabOptions[3] && (
                    <motion.div
                        key="dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 md:left-auto right-0 mt-2 mx-6 bg-white shadow-xl rounded-2xl    text-sm z-40 md:w-1/4"
                    >
                        <div className="p-4 space-y-2 text-sm font-medium  ">
                            {[
                                "My Dashboard",
                                "Search Filters",
                                tabOptions[3]
                            ].map((item, index) => (
                                <motion.a
                                    key={index}
                                    className={`block py-0.5 px-3 ${item === selectedProfileTab ? "text-[#B3322F]" : "text-gray-900"}  cursor-pointer`}
                                    whileHover={{
                                        scale: 1.01,
                                        color: "#dc2626", // Tailwind's red-600
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    onClick={() => setSelectedProfileTab(item)}
                                >
                                   {item}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


        </>
    );
};