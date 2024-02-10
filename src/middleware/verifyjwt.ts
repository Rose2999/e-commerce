import jwt from 'jsonwebtoken';
import {NextFunction,Request,Response} from 'express';

const midddlewareverify=(req:Request,res:Response,next:NextFunction):void|Response =>{
    let token=req.headers.authorization;
    if(!token)
    {
        return res.status(401).json({error:"token not provided"});
    }
    token=token?.split("Bearer ")[1];
    //verify the token
    jwt.verify(token as string,'your_secret',(err,decoded)=>{
        if(err){
            return res.status(401).json({error:"failed to authenticate"});
        }
        req.body.jwt_decoded=decoded;
        next();
    })
    
    }
    
  export default midddlewareverify;