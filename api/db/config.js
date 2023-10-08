import mongoose from 'mongoose'




const Db = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('database connected successfully')
    } catch (error) {
        console.log(error.message)
    }
}
 export default Db