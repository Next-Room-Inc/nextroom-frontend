import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { motion } from 'framer-motion';
import { useState } from "react";
import Chat from "../pages/chat/Chat";

export const ChatButton = () => {
    const [chat, setChat] = useState(false);
    const [stage, setStage] = useState<"arrow" | "tap" | "chat">("arrow");

    const chatButtonHandler = () => {
        setChat(true);
        setStage('arrow')
    }

    const handleClick = () => {
        if (stage === "tap") {
            setStage("chat");
        } else if (stage === "arrow") {
            setStage("tap");
        }
    };

    const MovingChatArrow = () => <motion.div animate={{ x: [-4, -8, -4], }} transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", }}  >
        <ArrowLeftIcon className="w-6" />
    </motion.div>

    return (
        <>
            {chat &&
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/40"
                >
                    <div className="w-[98%]  bg-white rounded-xl shadow-xl overflow-hidden">
                        <Chat closeChat={() => setChat(false)} chatModal={chat} />
                    </div>
                </motion.div>
            }

            <div className="fixed right-0 bottom-15 z-50">
                <motion.button
                    onClick={handleClick}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center gap-2 duration-300 hover:scale-102 hover:opacity-90 cursor-pointer bg-white text-[#B3322F] font-medium shadow-md px-5 py-3 rounded-l-full border border-gray-200 hover:bg-gray-50 transition-all relative  `}
                >
                    {/* Arrow Icon Only */}
                    {stage === "arrow" && (
                        <MovingChatArrow />
                    )}

                    {/* Tap to Chat */}
                    {stage === "tap" && (
                        <div className="flex items-center gap-2  ">
                            <div className="transition-transform duration-300 group-hover:-translate-x-1">
                                <MovingChatArrow />
                            </div>

                            <span className="text-md whitespace-nowrap transition-colors duration-300 group-hover:text-[#B3322F]">
                                tap to chat
                            </span>
                        </div>
                    )}

                    {/* Full Button with Icon */}
                    {stage === "chat" && (
                        <div
                            className="flex items-center gap-2 "
                            onClick={chatButtonHandler}
                        >
                            <MovingChatArrow />
                            <span className="text-md whitespace-nowrap -mt-1 transition-colors duration-300 hover:text-[#B3322F]">
                                tap to chat
                            </span>
                            <img
                                src="/assets/img/search-property/chat_icon.svg"
                                alt="Chat Icon"
                                className="h-10 transition-transform duration-300 hover:rotate-6"
                            />
                        </div>
                    )}
                </motion.button>
            </div>
        </>
    );
};