import User from '../models/UserModel.js'
import bcrypt from 'bcryptjs'

export const signup = async(req, res, next) => {
    try {
        const {username, email, password} = req.body
        if(!username || !email || !password){
            return res.status(400).json({success: false, msg: "kindly fill in all inputs"})
        }

        const emailExists = await User.findOne({email: email})
        const usernameExists = await User.findOne({username: username})
        if(emailExists)return res.status(400).json({success: false, msg: "email already exists"})
        if(usernameExists)return res.status(400).json({success: false, msg: "username already exists"})

        const hashedPassword = bcrypt.hashSync(password, 12)
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        // console.log(user)
        return res.status(201).json({
            success: true,
            message:'user created successfully',
            data: user
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: `${error.message} went wrong`
        })
    }
}