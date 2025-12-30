import React, { useState } from 'react'
import { IconChannels, IconCommunities, IconFilter, IconMenu, IconNewChat, IconSearch, IconStatus } from '../icons/Icons';
import { useSelector } from 'react-redux';
import store from '../Redux/store';

export const SideBar = ({ activeChat, onChatSelect }) => {
    const [filter, setFilter] = useState('All');

    const otherUsers = useSelector(store => store.user.otherUsers)    

    const mappedUsers = otherUsers.map(user => ({
        id: user._id,
        name: user.fullName,
        username: user.username,
        avatar: user.profilePhoto || 'https://i.pravatar.cc/150',
        lastMsg: '',
        time: '',
        unread: 0
    }))

    const FilterBtn = ({ label }) => (
        <button onClick={() => setFilter(label)} className={`px-3 py-1 rounded-full text-sm transition-colors ${filter === label ? 'bg-[#008069] text-white' : 'bg-[#f0f2f5] text-gray-600 hover:bg-[#e9edef]'}`}>{label}</button>
    );

    return (
        <div className="w-[400px] flex flex-col bg-white border-r border-gray-200 h-full">
            {/* Header */}
            <div className="h-[60px] bg-[#f0f2f5] flex items-center justify-between px-4 py-2 border-b border-gray-200">
                <img src="https://i.pravatar.cc/150?u=me" className="w-10 h-10 rounded-full cursor-pointer" />
                <div className="flex gap-6 text-[#54656f]">
                    <button title="Communities"><IconCommunities /></button>
                    <button title="Status"><IconStatus /></button>
                    <button title="Channels"><IconChannels /></button>
                    <button title="New Chat"><IconNewChat /></button>
                    <button title="Menu"><IconMenu /></button>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="p-2 border-b border-gray-100 space-y-2">
                <div className="bg-[#f0f2f5] rounded-lg h-9 flex items-center px-4 gap-4">
                    <div className="text-gray-500 w-4"><IconSearch /></div>
                    <input placeholder="Search" className="bg-transparent flex-1 text-sm outline-none placeholder-gray-500 text-gray-700" />
                    <div className="text-gray-500 w-4 cursor-pointer"><IconFilter /></div>
                </div>
                {/* New Filter Pills Row */}
                <div className="flex gap-2 px-1">
                    <FilterBtn label="All" />
                    <FilterBtn label="Unread" />
                    <FilterBtn label="Favorites" />
                    <FilterBtn label="Groups" />
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
                {mappedUsers.map(user => (
                    <div key={user.id} onClick={() => onChatSelect(user)} className={`flex items-center gap-3 px-3 py-3 cursor-pointer border-b border-gray-100 hover:bg-[#f5f6f6] ${activeChat?.id === user.id ? 'bg-[#f0f2f5]' : ''}`}>
                        <img src={user.avatar} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-normal text-[#111b21] truncate text-[17px]">{user.name}</h3>
                                <span className={`text-xs ${user.unread > 0 ? 'text-[#25d366] font-medium' : 'text-[#667781]'}`}>{user.time}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-[#3b4a54] truncate flex-1">{user.lastMsg}</p>
                                {user.unread > 0 && (
                                    <div className="bg-[#25d366] text-white text-xs font-medium min-w-[20px] h-5 flex items-center justify-center rounded-full px-1">
                                        {user.unread}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
