import React, { useState } from 'react'
import { SideBar } from './components/SideBar';
import { ChatWindow } from './components/ChatWindow';
import WelcomeScreen from './components/WelcomeScreen';

const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-screen w-full max-w-[1600px] mx-auto bg-white shadow-lg overflow-hidden relative">
      {/* Left Pane */}
      <SideBar activeChat={selectedChat} onChatSelect={setSelectedChat} />

      {/* Right Pane */}
      {selectedChat ? (
        <ChatWindow user={selectedChat} />
      ) : (
        <WelcomeScreen />
      )}
    </div>
  );

}

export default App