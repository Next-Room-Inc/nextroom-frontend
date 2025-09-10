import { ArrowLeftIcon, GlobeAltIcon, PaperAirplaneIcon, PaperClipIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Button, PrimaryButton } from "../Button";



const Options = () => {
    const tabOptions = ["Book A Tour", "Cancel A Tour", "Reschedule A Tour", "General Inquiry"];
    const [selectedTab, setSelectedTab] = useState<string | number | null>(tabOptions[0])

    return (
        <div>
            <p className="pt-3 px-2">Please choose an option below so we can better help you:</p>
            <div className=' flex flex-col gap-3 my-4 justify-center flex-wrap  w-[90%] md:w-[80%] mx-auto'>
                {tabOptions.map((status) => (<Button
                    className={`w-full py-3 text-xs rounded-full ${status !== selectedTab ? "bg-black" : "bg-white text-black"}`}
                    onClick={() => setSelectedTab(status)}
                >
                    {status}
                </Button>))}
            </div>
        </div>
    )
}

const messages = [
    {
        sender: "Anna G.", text: <Options />, isSelf: false
    },
    { sender: "You", text: "Hi, is it possible to bring my parents with me on the tour?", isSelf: true },
];


const slideVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
};

export const ChatSupport: React.FC<{}> = ({ }) => {
    return <>
        <motion.div
            key="chat"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.3 }}
            className={`  flex  w-full   md:flex flex-col justify-between bg-white rounded-2xl shadow   `}>
            {/* Header */}
            <div className="flex items-center gap-3  pb-3 px-6 py-6 md:bg-white bg-[#B3322F] rounded-t-4xl md:rounded-t-2xl">
                <div className="flex items-center gap-2">
                    <ArrowLeftIcon className={` w-6 text-white  flex md:hidden `} />
                    {/* <img
                            src="/assets/img/search-property/student_profile (1).png"
                            alt="Anna G."
                            className="w-10 h-10 rounded-full"
                        /> */}
                    <span className="relative inline-block border-1 border-green-400 rounded-full">
                        <img
                            alt=""
                            src="/assets/img/search-property/student_profile (1).png"
                            className="size-16 md:size-16 rounded-full"
                        />
                        <span className="absolute top-2 right-0 block size-2 rounded-full bg-green-400 ring-2 ring-green-400" />
                    </span>
                </div>
                <div>
                    <p className="font-bold">Anna G.</p>
                    <p className="text-xs md:text-sm text-white md:text-gray-500">
                        Theo Student Housing – Unit 308
                    </p>
                    <span className="text-green-500 text-sm md:flex hidden">Online</span>
                </div>
            </div>
            <hr className="w-[95%] mx-auto text-gray-300 shadow mb-4 hidden md:flex" />
            {/* Suggested Buttons */}
            <h1 className="text-lg md:text-2xl font-semibold text-center mt-5 hidden md:inline">What Do You Need Help With?</h1>
            <SuggestedButtons />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-2 space-y-4 px-6">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex items-end ${msg.isSelf ? "justify-end" : "justify-start"}`}
                    >
                        {!msg.isSelf && (
                            <img
                                src="/assets/img/search-property/student_profile (1).png"
                                className="w-9 h-9 rounded-full mr-2"
                                alt="avatar"
                            />
                        )}
                        <div
                            className={`px-4 py-2 rounded-2xl max-w-xs ${msg.isSelf
                                ? "bg-black text-white "
                                : "bg-[#B3322F] text-white "
                                }`}
                        >
                            {/* <div
                            className={`px-4 py-2 rounded-2xl max-w-xs ${msg.isSelf
                                ? "bg-black text-white rounded-br-none"
                                : "bg-[#B3322F] text-white rounded-bl-none"
                                }`}
                        > */}
                            {msg.text}
                        </div>
                        {msg.isSelf && (
                            <img
                                src="/assets/img/search-property/student_profile (2).png"
                                className="w-9 h-9 rounded-full ml-2"
                                alt="your avatar"
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-300 mb-2 px-5 mt-5">
                Automatic Translation Is On.{" "}
                <p className="text-red-500 underline">Turn Off</p>
            </div>
            <div className="text-center text-sm text-gray-300 md:mb-8  mt-3 px-10">
                Always double-check translations and pay rent and deposits securely <br />
                — landlords will never send payment links over chat.
            </div>
            <hr className="w-[95%] mx-auto text-gray-200 shadow mb-5 hidden md:flex" />

            <div className="flex flex-col md:flex-row md:items-center gap-1    px-4 pb-4">
                {/* Icons */}
                <div className="flex w-full md:w-fit gap-2 text-xl text-gray-400  p-2 md:p-0">
                    <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.95, rotate: -5 }}
                        className=""
                    >
                        <PhotoIcon className="w-4 md:w-6 text-[#B3322F] " />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.95, rotate: -5 }}
                        className=""
                    >
                        <PaperClipIcon className="w-4 md:w-6 text-[#B3322F] " />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.95, rotate: -5 }}
                        className=""
                    >
                        <GlobeAltIcon className="w-4 md:w-6 text-[#B3322F] " />
                    </motion.div>

                </div>

                <div className="flex w-full">
                    {/* input */}
                    <input
                        className="flex-1 px-4 py-2 border   border-gray-300 rounded-full focus:outline-none"
                        placeholder="Type something..."
                    />

                    {/* send Button */}
                    <motion.button
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.8, rotate: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-[#B3322F] text-white p-2 rounded-full shadow-md ml-2  "
                    >
                        <PaperAirplaneIcon className="w-6 md:w-6 text-white" />
                    </motion.button>
                </div>
            </div>
        </motion.div>

    </>
}

export default ChatSupport


const SuggestedButtons = () => {
    const tabOptions = ["Repair Request", "Tours", "Amenities", "Leasing Question", "More Unit Details", "Issue With Roommate(s)", "General Inquiry"];
    const [selectedTab, setSelectedTab] = useState<string | number | null>(tabOptions[0])

    return (<div>
        <div className=' flex gap-3 my-8 justify-center flex-wrap  w-[80%] mx-auto'>
            {tabOptions.map((status) => (<PrimaryButton
                color={status !== selectedTab ? "disabled" : 'red'}
                className="w-60 py-3 text-xs"
                onClick={() => setSelectedTab(status)}
            >
                {status}
            </PrimaryButton>))}
        </div>
    </div>)
}