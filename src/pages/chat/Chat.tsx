import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { ChatSideBar } from "../../components/chat/ChatSideBar";
import { ChatWindow } from "../../components/chat/ChatWindow";

const Chat: React.FC<{
    closeChat?: () => void;
    chatModal?: boolean;
}> = ({
    closeChat = () => { },
    chatModal = false
}) => {
        const [selectedChat, setSelectedChat] = useState<number | string | null>(null)

        return (
            <AnimatePresence initial={false} mode="wait">
                <div className="h-screen flex bg-gray-100 ">
                    {/* Sidebar */}
                    <ChatSideBar {...{ selectedChat, setSelectedChat, closeChat, chatModal }} />
                    {/* Chat Window */}
                    <ChatWindow {...{ selectedChat, setSelectedChat }} />
                </div>
            </AnimatePresence >
        );
    };

export default Chat;


