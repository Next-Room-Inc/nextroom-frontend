import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
export const CustomSelect: React.FC<{
    options: string[];
    selected: string;
    setSelected: (item: string) => void;
    placeholder?: string;
}> = ({ options, selected, setSelected, placeholder = "No selection yet" }) => {
    const [showAll, setShowAll] = useState(false);

    const displayOptions = showAll ? options : options.slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Selected Item */}
            <div className="flex items-center gap-2 shadow-md shadow-[#D9D9D9] min-h-10 px-4 py-4 mx-auto rounded-4xl bg-white text-sm">
                {selected ? (


                    <div>  {selected}</div>

                ) : (
                    <span className="text-gray-400">{placeholder}</span>
                )}
            </div>

            {/* Option List */}
            <div className="flex flex-col gap-2 shadow-md shadow-[#D9D9D9] px-4 py-4 mx-auto rounded-3xl bg-white text-sm">
                {displayOptions
                    .filter((item) => item !== selected) // hide already selected item
                    .map((item) => (
                        <button
                            key={item}
                            onClick={() => setSelected(item)}
                            className="hover:bg-[#f3f3f3] py-1 px-2 rounded-md text-left text-[#333] transition-all"
                        >
                            {item}
                        </button>
                    ))}
                {options.length > 5 && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-[#B3322F] text-sm font-medium mt-2 underline hover:text-[#8a1d1b] transition cursor-pointer"
                    >
                        {showAll ? "View Less" : "View More"}
                    </button>
                )}
            </div>
        </div>
    );
};

type Option = {
    value: string;
    name: string;
};

type SelectProps = {
    options: Option[];
    selectedIndex?: number; // controlled selected index (optional)
    onChange?: (selectedIndex: number) => void;
    className?: string;
};

export const Select: React.FC<SelectProps> = ({
    options,
    selectedIndex = 0,
    onChange,
    className = "",
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSelect = (index: number) => {
        if (onChange) onChange(index);
        setIsDropdownOpen(false);
    };

    return (
        <div className={`relative z-50 md:w-fit w-full ${className}`}>
            {/* Toggle Button */}
            <div
                onClick={() => setIsDropdownOpen((open) => !open)}
                className="text-center bg-white flex items-center justify-center text-[#B3322F] shadow-md md:w-fit w-full py-2 px-12 rounded-full text-sm font-medium cursor-pointer relative z-50 select-none"
            >
                {options[selectedIndex]?.name}
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
                        className="absolute left-0 right-0 mt-2 mx-6 bg-white shadow-xl rounded-2xl px-10 py-4 text-sm z-50"
                    >
                        {options.map((option, index) => (
                            <div
                                key={option.value}
                                className={`text-center flex items-center justify-center py-2 cursor-pointer hover:text-[#B3322F] ${index === selectedIndex
                                    ? "text-[#B3322F] font-semibold"
                                    : "text-gray-900"
                                    }`}
                                onClick={() => handleSelect(index)}
                            >
                                {option.name}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Select;
