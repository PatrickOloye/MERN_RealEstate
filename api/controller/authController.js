import User from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup = async(req, res, next) => {
    try {
        const {username, email, password} = req.body
        if(!username || !email || !password){
            return res.status(400).json({success: false, message: "kindly fill in all inputs"})
        }

        const emailExists = await User.findOne({email: email})
        const usernameExists = await User.findOne({username: username})
        if(emailExists)return res.status(400).json({success: false, message: "email   already exists"})
        if(usernameExists)return res.status(400).json({success: false, message: "username already exists"})

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
        next(error)
    }
}

export const signin = async(req, res, next) =>{
    try {
        const {email, password} = req.body
        if(!email || !password) return res.status(202).json({
            success: false, message: 'please fill in all inputs'
        })
        const user = await User.findOne({email: email})
        if(!user)return next(errorHandler(400, 'user not found'))
        const isMatched = bcrypt.compareSync(password, user.password )
        if(!isMatched)return next(errorHandler(400, 'invalid credentials'))
        // console.log(user._id)
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRETE)
        const {password: pass, ...data} = user._doc;
        res.cookie('auth_token', token, {httpOnly: true, express: new Date(Date.now() + 24 * 60 * 60 * 30)}).status(200).json({
            success: true, 
            message: 'Login successful',
            user
        })
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}

export const google = async(req, res, next)=>{
      try {
        const user = await User.findOne({email: req.body.email})
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRETE);
            const {password: pass, ...rest} = user._doc;
            res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
        }else{
            const genPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = bcrypt.hashSync(genPassword, 12)
            const user = await User.create({
                username: req.body.name.split(" ").join("").toLowerCase() +  Math.random().toString(36).slice(-4),
                email: req.body.email, 
                password: hashedPassword,
                photo: req.body.photo
            }) 
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRETE);
            const {password: pass, ...rest} = user._doc;
            res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
        }

      } catch (error) {
        next(error)
      }
} 