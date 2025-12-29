import React from "react";
import { IconLogo, IconMenu, IconSettings } from "../components/LoginIcons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";

const Signup = () => {

    const [user, setUser] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: ""
    })

    const navigate = useNavigate()

    const handleRadioButton = (gender) => {
        setUser({ ...user, gender })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {

            const res = await axios.post(`http://localhost:8000/api/user/register`, user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/login")
            }

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }

        setUser({
            fullName: "",
            username: "",
            password: "",
            confirmPassword: "",
            gender: ""
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

                {/* RIGHT */}
                <div className="w-full md:w-[38%] p-10 flex flex-col justify-center items-center">
                    <div className="w-full max-w-xs animate-fade-in">
                        <h2 className="text-2xl font-light text-[#41525d] mb-6">
                            Create Account
                        </h2>

                        <form action="" onSubmit={onSubmitHandler} className="space-y-3">
                            <label className="text-xs text-[#00a884] font-bold uppercase tracking-wider ml-1">Full Name</label>
                            <input value={user.fullName} onChange={(e) => setUser({ ...user, fullName: e.target.value })} className="custom-input w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g. John Doe" />

                            <label className="text-xs text-[#00a884] font-bold uppercase tracking-wider ml-1">Username</label>
                            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="custom-input w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="e.g. johndoe" />

                            <label className="text-xs text-[#00a884] font-bold uppercase tracking-wider ml-1">Password</label>
                            <input value={user.password} type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} className="custom-input w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="••••••••" />

                            <label className="text-xs text-[#00a884] font-bold uppercase tracking-wider ml-1">Confirm Password</label>
                            <input value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} type="password" className="custom-input w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="••••••••" />

                            <div className="px-4 flex gap-6">
                                <label className="flex items-center gap-1 cursor-pointer"><input type="radio" className="cursor-pointer" checked={user.gender == "male"} onChange={() => handleRadioButton("male")} name="gender" value="male" />Male</label>
                                <label className="flex items-center gap-1 cursor-pointer"><input type="radio" className="cursor-pointer" checked={user.gender == "female"} onChange={() => handleRadioButton("female")} name="gender" value="female" />Female</label>
                            </div>
                            <button type="submit" className="w-full bg-[#00a884] text-white py-3 rounded-full cursor-pointer hover:bg-[#028e70]">
                                Sign Up
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-[#3b4a54] text-sm">Already have an account?</p>
                            <Link to="/login" className="text-[#00a884] font-medium hover:underline">
                                Log in here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
