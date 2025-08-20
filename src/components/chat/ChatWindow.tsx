import { ArrowLeftIcon, GlobeAltIcon, PaperAirplaneIcon, PaperClipIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import React from "react";




const messages = [
    { sender: "Anna G.", text: "I’m studying Economics and you?", isSelf: false },
    { sender: "You", text: "Psychology! I can’t wait to meet you!", isSelf: true },
    { sender: "Anna G.", text: "Same!", isSelf: false },
    { sender: "Anna G.", text: "Can’t wait to move in!", isSelf: false },
    { sender: "Anna G.", text: "I’m studying Economics and you? I’m studying Economics and you? I’m studying Economics and you? I’m studying Economics and you?", isSelf: false },
    { sender: "You", text: "Psychology! I can’t wait to meet you!", isSelf: true },
    { sender: "Anna G.", text: "Same!", isSelf: false },
    { sender: "Anna G.", text: "Can’t wait to move in!", isSelf: false },
    { sender: "Anna G.", text: "I’m studying Economics and you?", isSelf: false },
    { sender: "You", text: "Psychology! I can’t wait to meet you!", isSelf: true },
    { sender: "Anna G.", text: "Same!", isSelf: false },
    { sender: "Anna G.", text: "Can’t wait to move in!", isSelf: false },
];


const slideVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
};

export const ChatWindow: React.FC<{
    selectedChat: string | number | null,
    setSelectedChat: (value: number | string | null) => void
}> = ({ selectedChat, setSelectedChat }) => {
    return <>
        {selectedChat ? <motion.div
            key="chat"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.3 }}
            className={` ${selectedChat ? " flex" : "hidden"} w-full  md:w-3/4 md:flex flex-col justify-between bg-white rounded-2xl shadow md:mx-4 `}>
            {/* Header */}
            <div className="flex items-center gap-3  pb-3 px-6 py-6 md:bg-white bg-[#B3322F] rounded-t-4xl md:rounded-t-2xl">
                <div className="flex items-center gap-2">
                    <ArrowLeftIcon className={` w-6 text-white ${selectedChat ? " flex md:hidden" : "hidden"}`} onClick={() => setSelectedChat(null)} />
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
                                ? "bg-black text-white rounded-br-none"
                                : "bg-[#B3322F] text-white rounded-bl-none"
                                }`}
                        >
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
            <div className="text-center text-sm text-gray-400 mb-2">
                Automatic Translation Is On.{" "}
                <span className="text-red-500 ">Turn Off</span>
            </div>
            <hr className="w-[95%] mx-auto text-gray-300 shadow mb-4 hidden md:flex" />

            <div className="flex items-center gap-1    px-4 pb-4">
                {/* Icons */}
                <div className="flex gap-2 text-xl text-gray-400">
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

                {/* input */}
                <input
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
                    placeholder="Type something..."
                />

                {/* send Button */}
                <motion.button
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 0.8, rotate: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-[#B3322F] text-white p-2 rounded-full shadow-md "
                >
                    <PaperAirplaneIcon className="w-4 md:w-6 text-white" />
                </motion.button>
            </div>
        </motion.div> : <div className="hidden md:flex flex-col items-center justify-center  w-3/4 h-full text-center text-gray-400 px-4">


            <p className="text-sm font-medium">Select a contact to start chatting...</p>

        </div>
        }
    </>
}
