import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {

        const { fullName, username, password, confirmPassword, gender } = req.body

        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password do not match"
            })
        }

        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({
                message: "Username already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const maleProfilePhoto = `https://img.freepik.com/premium-vector/business-man-avatar-profile_1133257-2431.jpg?semt=ais_hybrid&w=740&q=80`
        const femaleProfilePhoto = `https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740&q=80`

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        })

        return res.status(201).json({
            success: true,
            message: "Account created successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Failed to register"
        })
    }
}


export const login = async (req, res) => {
    try {

        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password"
            })
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Failed to login"
        })
    }
}


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Failed to logout"
        })
    }
}


export const getOtherUsers = async (req, res) => {
    try {

        const loggedInUserId = req.id
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

        return res.status(200).json(otherUsers)

    } catch (error) {

    }
}