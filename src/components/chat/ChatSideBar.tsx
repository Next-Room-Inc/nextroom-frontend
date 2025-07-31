import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import React from "react";


const contacts = [
    "Anna G.",
    "Jonathan L.",
    "Room 809",
    "Weekend Plans",
    "Anna G.",
    "Room 809",
    "Anna G.",
    "Weekend Plans",
    "Anna G.",
    "Weekend Plans",
    "Anna G.",
];

const slideVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
};


export const ChatSideBar: React.FC<{
    closeChat: () => void;
    chatModal: boolean;
    selectedChat: string | number | null,
    setSelectedChat: (value: string | number | null) => void
}> = ({ selectedChat, setSelectedChat, chatModal = true, closeChat = () => { } }) => {
    return <>
        <motion.div
            key="sidebar"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.3 }}


            className={`${!selectedChat ? "w-full" : "hidden md:block"} md:w-1/4 bg-white rounded-2xl shadow p-4`}>
            <h2 className="text-lg font-semibold mb-4 flex gap-3">
                <ArrowLeftIcon
                    onClick={closeChat}
                    className={`w-6 text-black cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-x-1 ${chatModal ? "flex" : "hidden"
                        }`}
                />                Chats
            </h2>

            <input
                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-full shadow-sm focus:outline-none"
                placeholder="Search"
            />

            {/* Active Users */}
            <ActiveChatBar {...{ selectedChat, setSelectedChat }} />
            {/* Adjusted scrollable section */}
            <div className="pr-2">
                <ul className="max-h-[calc(100vh-200px)]  md:max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    {contacts.map((contact, idx) => (
                        <motion.li
                            whileHover={{ scale: 0.95, }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedChat(idx + 1)}
                            key={idx}
                            className={`flex items-center gap-3 mb-3 p-2 rounded-lg cursor-pointer ${idx + 1 === selectedChat ? "bg-[#B3322F] text-white" : "hover:bg-gray-100"
                                }`}
                        >
                            <img
                                src="/assets/img/search-property/student_profile (1).png"
                                alt={contact}
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="font-medium">{contact}</p>
                                <p className={`text-sm ${idx + 1 === selectedChat ? "text-white" : "text-gray-500"} `}>Can’t wait to move in!</p>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>

        </motion.div>
    </>
}



const ActiveChatBar: React.FC<{
    setSelectedChat: (value: number) => void
}> = ({ setSelectedChat }) => {
    return <>
        <div className="mb-4 mt-2 block md:hidden">
            <ul className=" flex max-h-[200px] overflow-x-auto gap-4 items-center justify-center">
                {[1, 2, 3, 4].map((_, idx) => (
                    <motion.li
                        whileHover={{ scale: 0.95, }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedChat(idx + 1)}
                        key={idx}
                        className={`min-w-fit cursor-pointer`}
                    >
                        <span className="relative inline-block border-1 border-green-400 rounded-full">
                            <img
                                alt=""
                                src="/assets/img/search-property/student_profile (2).png"
                                className="size-14 rounded-full"
                            />
                            <span className="absolute top-2 right-0 block size-2 rounded-full bg-green-400 ring-2 ring-green-400" />
                        </span>
                    </motion.li>
                ))}
            </ul>
        </div>
    </>
}