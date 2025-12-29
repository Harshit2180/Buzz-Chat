import React from "react";
import { IconLogo, IconMenu, IconSettings } from "../components/LoginIcons";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    const navigate = useNavigate()

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {

            const res = await axios.post(`http://localhost:8000/api/user/login`, user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })


            navigate("/")


        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }

        setUser({
            username: "",
            password: "",
        })
    }

    return (
        <div className="gray-bg overflow-hidden flex flex-col min-h-screen">
            <div className="green-strip"></div>

            <IconLogo />

            <div className="bg-white rounded-lg shadow-xl z-10 w-full max-w-[1050px] h-[72vh] min-h-[600px] mx-auto flex overflow-hidden">

                {/* LEFT */}
                <div className="hidden md:flex flex-col p-14 w-[62%] border-r border-gray-100 relative">
                    <h1 className="text-[28px] font-light text-[#41525d] mb-10">
                        Use Buzz Chat on your computer
                    </h1>

                    <div className="space-y-7 text-[18px] text-[#3b4a54] leading-7">
                        <p>1. Open Buzz Chat on your phone</p>
                        <p className="flex items-center gap-1 flex-wrap">2. Tap <strong>Menu</strong> <IconMenu /> or{" "}<strong>Settings</strong> <IconSettings /></p>
                        <p>3. Tap <strong>Linked devices</strong></p>
                        <p>4. Point your phone to this screen</p>
                    </div>

                    <div className="mt-auto text-[#00a884] font-medium hover:underline cursor-pointer">
                        Need help to get started?
                    </div>
                </div>

                {/* RIGHT (Login Form) */}
                <div className="w-full md:w-[38%] p-10 flex flex-col justify-center items-center">
                    <div className="w-full max-w-xs animate-fade-in">
                        <h2 className="text-2xl font-light text-[#41525d] mb-6">Log In</h2>

                        <form onSubmit={onSubmitHandler} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs text-[#00a884] font-bold uppercase tracking-wider ml-1">
                                    Username
                                </label>
                                <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} type="text" className="custom-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg" placeholder="e.g. johndoe" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs text-[#00a884] font-bold uppercase tracking-wider ml-1">
                                    Password
                                </label>
                                <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" className="custom-input w-full px-4 py-3 bg-white border border-gray-300 rounded-lg" placeholder="••••••••" />
                            </div>

                            <button type="submit" className="w-full bg-[#00a884] text-white font-bold py-3 rounded-full cursor-pointer hover:bg-[#028e70]">
                                Next
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-[#3b4a54] text-sm">Don't have an account?</p>
                            <Link to="/signup" className="text-[#00a884] font-medium hover:underline">
                                Signup here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto pb-8 text-center text-[#54656f] text-sm z-10">
                <span className="opacity-60">from</span><br />
                <span className="font-bold">Meta</span>
            </div>
        </div>
    );
};

export default Login;
