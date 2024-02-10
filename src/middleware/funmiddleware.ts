import {NextFunction,Request,Response} from 'express';



const midddleware=(req:Request,res:Response,next:NextFunction) =>{
    res.setHeader("Set-cookie",["e_mail=rose@gmail.com","password=rose"])
    const head=req.headers;
    console.log(head);
    if(head["x-api-key"]==='45'){
    next();
    }
    else{
        res.status(404).json("error");
    }
  } 
 export default midddleware;