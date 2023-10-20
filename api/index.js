import express from 'express'
import Db from './db/config.js'
import dotenv from 'dotenv'
import AuthRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'
import UserRoute from './routes/userRoutes.js'





dotenv.config()
const app = express()

const port = process.env.PORT || 3030

app.use(express.json())
app.use(cookieParser())
app.use('/api/v0/auth', AuthRoutes)
app.use('/api/v0/user', UserRoute)


app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false, 
        statusCode,
        message
    })
})
const start = async () => {
    try {
        Db()
        app.listen(port, ()=>{console.log(`server is running on port ${port}`)})
    } catch (error) {
        console.log(`something went wrong with : ${error.message}`);
    }
}

start()