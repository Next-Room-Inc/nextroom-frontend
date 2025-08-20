import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"


export const DropDownSelector: React.FC<{
    options: Array<string | number | null>
    selected: string | number | null
    onSelect: (value: any) => void
    className?: string
}> = ({ options, selected, onSelect, className = "md:hidden px-5 py-4  w-full bg-[#B3322F] text-white text-center flex items-center justify-center" }) => {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

    const handleSelect = (option: string | number | null) => {
        onSelect(option)
        setIsDropdownOpen(false)
    }
    console.log("ss===>", selected)
    return (
        <div>

            {/* Mobile Dropdown */}
            <div className="relative">
                <div
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className={`${className}    shadow-md  rounded-full text-sm font-medium `}
                >
                    {selected ? selected : "Select option"}
                    {<ChevronDownIcon className="h-5 w-5 ml-2" />}
                </div>

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
                            {options.map((option) => (
                                <div
                                    key={option}
                                    onClick={() => handleSelect(option)}
                                    className={`text-center py-2  hover:text-[#B3322F] ${selected === option ? 'text-[#B3322F] font-semibold' : ''
                                        }`}
                                >
                                    {option}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}