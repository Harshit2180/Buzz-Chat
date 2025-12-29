import React, { useState } from "react";
import { SideBar } from "../components/SideBar";
import { ChatWindow } from "../components/ChatWindow";
import WelcomeScreen from "../components/WelcomeScreen";


const Chat = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <div className="flex h-full w-full max-w-[1600px] mx-auto bg-white shadow-lg overflow-hidden relative">
            <SideBar activeChat={selectedChat} onChatSelect={setSelectedChat} />
            {selectedChat ? <ChatWindow user={selectedChat} /> : <WelcomeScreen />}
        </div>
    );
};

export default Chat;
