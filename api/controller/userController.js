import User from "../models/UserModel.js";
import { errorHandler } from "../utils/error.js"
import  bcrypt  from 'bcryptjs';


export const updateUser = async(req, res, next) =>{
    if(req.user.id != req.params.id) return next(errorHandler(401, 'you can only update your own account'))
        try {
            const updatedFields = {
                username: req.body.username,
                email: req.body.email,
                photo: req.body.photo
            };
    
            if (req.body.password) {
                updatedFields.password = bcrypt.hashSync(req.body.password, 10);
            }
    
            const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    
            if (!updatedUser) {
                return next(errorHandler(404, 'User not found'));
            }

        const {password, ...rest} = updatedUser._doc

        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}


export const deleteUser = async(req, res, next) => {
    if(req.user.id != req.params.id) return next(errorHandler(401, 'you can only delete your own account'))
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json('user has been deleted')
    } catch (error) {
        next(error)
    }
}

