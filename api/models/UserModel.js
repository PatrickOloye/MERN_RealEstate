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
        default: "https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?w=210&h=219&c=7&r=0&o=5&pid=1.7"
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User