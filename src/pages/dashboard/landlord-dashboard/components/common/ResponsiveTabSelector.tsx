import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ResponsiveTabSelector: React.FC<{
    tabOptions: string[],
    tab: string,
    tabOptionsObject: any;
}> = ({ tabOptions, tab, tabOptionsObject }) => {
    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [profileDropDownStatus, setProfileDropDownStatus] = useState(false);

    const handleSelectTab = (tab: string) => {
        navigate(`/landlords-dashboard/${tab}`);
        if (isDropdownOpen) setIsDropdownOpen(false);

        if (tab === tabOptions[3]) setProfileDropDownStatus(!profileDropDownStatus)
        else setProfileDropDownStatus(false)
    };

    return (
        <>
            {/* Desktop View */}
            <div className="flex justify-center items-center mt-10 mx-10 gap-2 pt-3  pb-6">


                <div className="hidden lg:flex justify-between bg-white   shadow-md px-5 py-4 rounded-full text-sm font-medium w-full">
                    {tabOptions.map((t, idx) => (
                        <div
                            key={t}
                            className={`w-[25%] text-center flex items-center justify-center cursor-pointer ${idx < tabOptions.length - 1 ? "border-r-2 border-[#CCCCCC]" : ""
                                } ${tab === t ? "text-[#B3322F] font-semibold" : ""}`}
                            onClick={() => { handleSelectTab(t) }}
                        >
                            {tabOptionsObject?.[t]}
                        </div>
                    ))}
                    <div></div>
                </div>

                {/* Mobile View */}
                <div className="lg:hidden   relative z-50 w-full">
                    {/* Toggle Button */}
                    <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="text-center bg-white flex items-center justify-center  text-[#B3322F] shadow-md  w-full py-3 rounded-full text-sm font-medium cursor-pointer relative z-50"
                    >
                        {tabOptionsObject?.[tab]}
                        <ChevronDownIcon className='h-7 ml-2 mt-1 text-[#B3322F]' />
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
                                className="absolute left-0 right-0 mt-2 mx-6 bg-white shadow-xl rounded-2xl px-5 py-4 text-sm z-100"
                            >
                                {tabOptions.map((t, index: number) => (
                                    <div
                                        key={index}
                                        className={`text-center flex items-center justify-center py-2 cursor-pointer hover:text-[#B3322F] ${t === tab ? "text-[#B3322F] font-semibold" : ""
                                            }`}
                                        onClick={() => { handleSelectTab(t) }}
                                    >
                                        {tabOptionsObject?.[t]}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

        </>
    );
};