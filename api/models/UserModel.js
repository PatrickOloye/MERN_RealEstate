import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 30
    },
    photo: {
        type: String, 
        default: "photo"
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User