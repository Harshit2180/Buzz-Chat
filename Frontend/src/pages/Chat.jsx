import React, { useState } from "react";
import { SideBar } from "../components/SideBar";
import { ChatWindow } from "../components/ChatWindow";
import WelcomeScreen from "../components/WelcomeScreen";
import useGetOtherUsers from "../hooks/useGetOtherUsers";


const Chat = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    useGetOtherUsers()

    return (
        <div className="flex h-screen w-full max-w-[1600px] mx-auto bg-white shadow-lg overflow-hidden relative">
            <SideBar activeChat={selectedChat} onChatSelect={setSelectedChat} />
            {selectedChat ? <ChatWindow user={selectedChat} /> : <WelcomeScreen />}
        </div>
    );
};

export default Chat;
