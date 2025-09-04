import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { AccountDetails } from './dashboard/AccountDetails';
import { Events } from './dashboard/Events';
import { ExclusiveOffersAndPrizes } from './dashboard/ExclusiveOffersAndPrizes';
import { MembershipCard } from './dashboard/MembershipCard';

const options = [
    // "Account Details",
    "Events",
    "Exclusive Offers & Prizes",
    "Membership Card",
];

const Dashboard = () => {
    const [selectedOption, setsSelectedOption] = useState(options[0])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    return (
        <div>
            <h1 className='text-[#B3322F] text-2xl font-bold ml-3'>Dashboard</h1>

            <div className='pt-4'>
                <>
                    <div className=' flex flex-col md:flex-row gap-4 my-5'>
                        <div className='hidden lg:flex w-full md:w-1/4 flex-col px-4 py-4 bg-white shadow-xl rounded-2xl'>
                            {
                                options.map(option =>
                                    <div
                                        className={`${selectedOption === option ? "bg-[#B3322F] text-white" : "text-black"} rounded-full px-4 py-2 my-2  font-semibold`}
                                        onClick={() => setsSelectedOption(option)}
                                    >
                                        {option}</div>
                                )
                            }
                        </div>

                        <div className="flex lg:hidden -mt-5 relative w-full">
                            {/* Toggle Button */}
                            <div
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="text-center flex items-center justify-center bg-[#B3322F] text-white shadow-md px-5 py-3 w-full rounded-full text-sm font-medium  relative"
                            >
                                {selectedOption} <ChevronDownIcon className='h-7 ml-2 mt-1 text-white' />
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
                                        className="absolute left-0 right-0 top-8 mt-2 mx-6 bg-white shadow-xl rounded-2xl px-5 py-4 text-sm z-40"
                                    >
                                        {options.map((tab) => (
                                            <div
                                                key={tab}
                                                className={`text-center py-2  hover:text-[#B3322F] ${selectedOption === tab ? "text-[#B3322F] font-semibold" : ""
                                                    }`}
                                                onClick={() => {
                                                    setsSelectedOption(tab);
                                                    setIsDropdownOpen(false);
                                                }}
                                            >
                                                {tab}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className='w-full md:w-3/4 bg-white shadow-xl rounded-2xl '>
                            {/* <div className='h-full flex items-center justify-center text-2xl text-[#B3322F] font-semibold'>Stay tuned, we are launching something big soon.</div> */}
                            {selectedOption === "Account Details" && <AccountDetails />}
                            {selectedOption === "Events" && <Events />}
                            {selectedOption === "Exclusive Offers & Prizes" && <ExclusiveOffersAndPrizes />}
                            {selectedOption === "Membership Card" && <MembershipCard />}
                        </div>
                    </div>
                </>
            </div>

        </div>
    )
}

export default Dashboard











