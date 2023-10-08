import express from 'express'
import Db from './db/config.js'
import dotenv from 'dotenv'
import AuthRoutes from './routes/authRoutes.js'





dotenv.config()
const app = express()

const port = process.env.PORT || 3030

app.use(express.json())
app.use('/api/v0/auth', AuthRoutes)

const start = async () => {
    try {
        Db()
        app.listen(port, ()=>{console.log(`server is running on port ${port}`)})
    } catch (error) {
        console.log(`something went wrong with : ${error.message}`);
    }
}

start()