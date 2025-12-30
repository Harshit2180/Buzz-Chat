import React, { useEffect, useRef, useState } from 'react'
import { IconCheck, IconMenu, IconMic, IconPlus, IconSearch, IconSend, IconSmiley } from '../icons/Icons';

export const ChatWindow = ({ user }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey! How are you?", sender: 'them', time: "10:00 AM" },
        { id: 2, text: user.lastMsg, sender: 'them', time: user.time === "Yesterday" ? "Yesterday" : "12:30 PM" }
    ]);
    const endRef = useRef(null);

    useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, user]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setMessages([...messages, {
            id: Date.now(),
            text: input,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setInput("");
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-[#efeae2]">
            {/* Chat Header */}
            <div className="h-[60px] bg-[#f0f2f5] flex items-center justify-between px-4 border-b border-gray-200">
                <div className="flex items-center gap-4 cursor-pointer">
                    <img src={user.avatar} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                        <h2 className="text-[#111b21] font-normal text-base">{user.name}</h2>
                        <p className="text-xs text-[#667781]">click here for contact info</p>
                    </div>
                </div>
                <div className="flex gap-6 text-[#54656f]">
                    <IconSearch />
                    <IconMenu />
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex justify-center mb-4 sticky top-2 z-10">
                    <span className="bg-white/95 text-[#54656f] text-xs px-3 py-1.5 rounded-lg shadow-sm uppercase font-medium">Today</span>
                </div>
                {messages.map(msg => (
                    <div key={msg.id} className={`flex mb-1 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[65%] px-3 py-2 rounded-lg shadow-sm text-[14px] text-[#111b21] flex flex-col wrap-break-word overflow-wrap-anywhere ${msg.sender === 'me' ? 'bg-[#d9fdd3] self-end rounded-tr-none' : 'bg-white self-start rounded-tl-none'}`}>
                            {/* Message Text */}
                            <span className="wrap-break-word whitespace-pre-wrap overflow-wrap-anywhere">{msg.text}</span>

                            {/* Timestamp */}
                            <span className="text-[11px] text-[#667781] self-end flex items-center gap-1 mt-1">
                                {msg.time} {msg.sender === 'me' && <IconCheck />}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={endRef} />
            </div>

            {/* Input Area */}
            <div className="min-h-[62px] bg-[#f0f2f5] px-4 py-2 flex items-center gap-3">
                <button><IconSmiley /></button>
                <button><IconPlus /></button>
                <form onSubmit={handleSend} className="flex-1">
                    {/* <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" className="w-full h-[40px] rounded-lg border-none px-4 text-[15px] focus:outline-none placeholder-[#8696a0] text-[#111b21]" /> */}
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault(); // prevent newline
                                handleSend(e);      // call your send function
                            }
                        }}
                        rows={1}
                        className="w-full resize-none rounded-lg border-none px-4 py-2 text-[15px] focus:outline-none placeholder-[#8696a0] text-[#111b21] overflow-hidden"
                    />
                </form>
                <button onClick={handleSend}>
                    {input.trim() ? <IconSend /> : <IconMic />}
                </button>
            </div>
        </div>
    );

}
