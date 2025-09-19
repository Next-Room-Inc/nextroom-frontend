

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Button } from '@src/components/Button'
import ChatSupport from '@src/components/chat/ChatSupport'
import CommonLayout from '@src/layouts/Common.Layout'
import { APP_INFO } from '@src/utils/constants'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const topics = [
    "Account Issues",
    "Finding Housing",
    "Roommate Disputes",
    "Report A Roommate",
    "Finding A Roommate",
]
const roles = [
    "A Student",
    "A Landlord",
    "An Institution",
    "Others",
]

const Contact = () => {
    const [selectedTopic, setSelectedTopic] = useState(topics[0])
    const [selectedRole, setSelectedRole] = useState(roles[0])
    const [isDropdownOpen, _] = useState(true);

    return (
        <CommonLayout>
            <div className="bg-gradient-to-b from-[#B3322F] to-[#4D1614]  overflow-hidden"   >
                <h1 className='text-center text-3xl md:text-6xl font-bold text-white md:pb-5 md:pt-15 pt-10 pb-5'>How Can I Help You?</h1>
                <div className="  flex flex-col-reverse md:flex-row  " >
                    {/* <div className="  flex flex-col-reverse md:flex-row   md:-my-20" > */}
                    <div className="md:1/2  w-full flex items-end   ">
                        <img src="/assets/img/images/support-page-boy.svg" className='h-[90%]  ' />
                    </div>

                    <div className="md:1/2  w-full   flex items-center   ">
                        <div className='  w-full '>
                            {/* Heading */}
                            <h2 className="text-2xl   mx-auto   text-center  md:text-5xl font-semibold md:font-bold text-white mb-4   ">
                                “Next Room Helped Me  <br className="inline" />
                                Find My Apartment  <br className="inline" />
                                And I Love It!”

                                <br className="inline" />
                                {/* <br className=" " /> Housing
                        <br className="hidden md:inline" /> Starts Here. */}
                            </h2>
                            {/* Description */}
                            <div className="w-[80%]  mx-auto   text-center   text-[#FFFFFF] ">

                                <p className='flex items-center gap-2 justify-center'
                                >
                                    <hr className='w-5 text-2xl' /> 3rd Year uOttawa Student
                                </p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {/*  */}
            <div className="bg-[#4D1614] text-white flex flex-col md:flex-row md:gap-10 md:p-10 gap-5 p-5">
                <div className='bg-[#B3322F]/50 md:1/2  w-full p-8 rounded-2xl'>
                    <h1 className='text-2xl text-center font-semibold'>Are You...</h1>
                    <div className=" z-10 w-full relative mt-5">
                        {/* Toggle Button */}
                        <div
                            // onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="text-center bg-white flex items-center justify-center w-full md:w-[60%] text-[#B3322F] shadow-md  mx-auto py-2 rounded-full text-sm font-medium  relative z-10"
                        >
                            {/* {tab === tabOptions[3] ? <>{tab} ({selectedProfileTab})</> : tab} */}
                            {selectedRole}
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
                                    className="  mt-2  bg-white mx-auto shadow-xl rounded-2xl px-5 py-4 text-sm z-100   w-full md:w-[60%]"
                                >
                                    {roles.map((t, index: number) => (
                                        <div
                                            key={index}
                                            className={` py-2   text-[#B3322F] ${t === selectedRole ? "text-white bg-[#B3322F] " : ""
                                                }  w-full rounded-full font-semibold pl-5`}
                                            onClick={() => { setSelectedRole(t); }}
                                        >
                                            {t}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className='bg-[#B3322F]/50 md:1/2  w-full p-8 rounded-2xl'>
                    <h1 className='text-2xl text-center font-semibold'>Choose A Topic</h1>
                    <div className='bg-white rounded-2xl flex flex-col gap-2 py-5 w-full md:w-[60%] mt-5 mx-auto px-5'>
                        {topics.map((topic) =>
                            <div
                                onClick={() => setSelectedTopic(topic)}
                                className={`${selectedTopic === topic ? "bg-[#B3322F]" : "bg-white text-black"}
                         w-full py-1 rounded-full pl-5`}>{topic}</div>)}
                    </div>
                </div>
            </div>

            {/* Related Articles */}
            <RelatedArticles />

            {/* STILL NEED HELP */}
            <div className='bg-gradient-to-b from-[#B3322F] to-[#4D1614]  overflow-hidden flex items-center flex-col gap-5 md:flex-row justify-center min-h-35 py-10 '>
                <div className='text-4xl px-5 md:text-6xl font-semibold text-white w-full md:w-3/5  text-center'>Still  <br className='inline md:hidden ' />  {" "} Need Help?</div>
                <div className='flex items-center md:justify-normal justify-center w-full md:w-2/5'>
                    <img
                        src="/assets/img/search-property/chat_icon.svg"
                        alt="Chat Icon"
                        className="h-20 transition-transform duration-300 hover:rotate-6 z-10"
                    />
                    <Button className='text-[#B3322F] bg-white font-bold w-50 py-3 rounded-full h-fit -ml-10'>Chat</Button>
                </div>
            </div>

            {/* Chat Support */}
            <div className='mx-5 md:mx-15 mt-10'>
                <ChatSupport />
            </div>



        </CommonLayout>
    )
}

export default Contact




const slidersList = [
    {
        icon: `slider_icon_1.svg`,
        title: "Flexible Sublets",
        description: "We help you find sublets automatically.",
        image: `slider_1.png`,
        className: "h-8 w-8"
    },
    {
        icon: `slider_icon_2.svg`,
        title: "AI Matching",
        description: "Equal weighting of roommate and property preferences.",
        image: `slider_2.png`,
        className: "h-8 w-8"
    },
    {
        icon: `slider_icon_3.svg`,
        title: "Friend Option",
        description: "Students may still live with their friends.",
        image: `slider_3.png`,
        className: "h-8 w-8"
    },
    {
        icon: `slider_icon_4.svg`,
        title: "Verified Students Only",
        description: "Every user on the platform is a real, verified student.",
        image: `slider_4.png`,
        className: "w-8 h-8"
    },
];

export const RelatedArticles = () => {
    const [selected, setSelected] = useState<any | null>(null)
    return (
        <>
            <div className="  py-10  mx-5 md:mx-15">
                <h1 className='text-4xl font-semibold text-[#B3322F]'>Related Articles</h1>
                {slidersList.map((feature, index) => (
                    <>  <div

                        className={`z-10 md:flex  overflow-hidden relative  bg-white my-5 shadow-lg p-5 rounded-2xl`}
                    >


                        {/* Image section */}
                        <div className="relative w-full md:w-2/4">
                            <img
                                src={`${APP_INFO.IMG_BASE_URL}images/${feature.image}`}
                                alt={"title"}
                                className="w-full h-[250px] object-cover rounded-2xl"
                            />

                        </div>

                        {/* Content section */}
                        <div className="w-full md:w-1/2 md:pl-6 md:mt-0 mt-6 flex flex-col justify-top">


                            {/* Details */}
                            <div className="mt-5 space-y-1 md:text-md text-md">
                                <p className='text-[#B3322F] font-bold text-xl'>Site Updates Now Live!</p>
                                <p className='font-semibold '>September 1, 2025</p>
                                <p className='md:text-xs text-md mt-4'>NextRoom is now better than ever, with
                                    new tools and student-focused features
                                    that make it easier to find trusted rentals
                                    near Ottawa campuses while you study.</p>

                                <div className='md:text-left text-center'>
                                    <motion.button
                                        whileHover={{ scale: 0.90 }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                        onClick={() => setSelected(true)}
                                        className="bg-[#B3322F] mt-4 text-white text-sm md:px-15 md:w-auto w-full py-3 rounded-full  mx-auto shadow-sm"
                                    >
                                        Read More
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>

                        {selected && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                            >
                                <ReadMoreComponent {...{ setSelected }} />
                            </motion.div>
                        )}
                    </>
                ))}




            </div>
        </>
    );
};


const ReadMoreComponent: React.FC<{
    setSelected: (value: any | null) => void
}> = ({ setSelected }) => {
    return (
        <div className='    bg-white shadow-xl rounded-2xl px-5 py-4'>
            <h1 className='text-[#B3322F] text-2xl font-bold'>Site Updates Now Live!</h1>
            <p className='font-semibold'> <span className='mr-3 '>September 1, 2025</span> Written By Aidan Fitzmaurice — Founder</p>

            <div className='py-10'>
                Finding the right place to live while studying in Ottawa just got easier. NextRoom, the go-to platform for student rentals, has introduced a fresh update packed with features designed specifically for students navigating the rental market.
                <br /> <br />
                With school-specific search filters, updated neighbourhood maps, and verified listings near major campuses like uOttawa, Carleton, and Algonquin, NextRoom takes the guesswork out of finding a student-friendly rental. Whether you’re new to the city or moving into a new semester, the platform helps match your lifestyle, budget, and location needs.
                <br /> <br />
                The new update also includes practical guides on student leasing, insights into average rental prices, and a simplified application process—saving you time and stress so you can focus on what really matters: your education.
                <br /> <br />
                Whether you're looking for a cozy studio, shared housing, or an affordable place near transit, NextRoom is here to help make your Ottawa rental search simple, safe, and student-smart.
            </div>

            <img
                src="/assets/img/images/newsroom-banner.png"
                alt="Like"
                className=" w-full  "
            />
            <div className='text-center'>

                <motion.button
                    whileHover={{ scale: 0.97 }}
                    whileTap={{ scale: 0.90 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="bg-[#B3322F] text-sm mt-6 py-2 px-10 rounded-full mx-auto  w-fit font-semibold text-white" onClick={() => setSelected(null)}
                >
                    close
                </motion.button>


            </div>
        </div>
    )
}
