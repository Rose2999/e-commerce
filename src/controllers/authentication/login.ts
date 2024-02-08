import EcSuppliers from '../../models/ec_suppliers';
import express,{Request,Response} from 'express';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const login=async(req:Request,res:Response):Promise<Response<any>> =>{
    try{
        const { e_mail,password,user_type} = req.body;
   
        if(user_type=='supplier'){
           console.log("\n\nREACHED IF\n\nstring")
            const supplier = await EcSuppliers.findOne({
                where:{
                    
                    e_mail: e_mail,
                    
                }
                
            });
           
            console.log(supplier);
            if(supplier != null){
               console.log("\n\nREACHED NEXT IF\n\n")
               if (supplier && bcrypt.compareSync(password,supplier.password)){
               const token=jwt.sign({user_reg_id:supplier.registration_id, user_type:user_type},"your_secret",{expiresIn:"24h"})
                return res.status(200).json({token,user_reg_id:supplier.registration_id,user_type:user_type});
            }else{
               return res.status(404).json("error");
            }
           }
           return res.status(401).json({error:'Login error'});
           
        }
        else{
            return res.status(400).json({error:'wrong user'});
        }
    }
    catch (error:any){
        console.log(error)
        return res.status(401).json({error:'Login error'});
    } 
    
}
export default login;