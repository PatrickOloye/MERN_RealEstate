import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) =>{
    
    console.log(req.cookies);
   const token = req.cookies.access_token;
   if(!token)return next(errorHandler(401, 'you are not authorised.'))
    jwt.verify(token, process.env.JWT_SECRETE, (err,user)=>{
        if(err) return next(errorHandler(403, 'forbidden'))

        req.user = user;
        next();
    })
}