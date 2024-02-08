import EcSuppliers from '../../models/ec_suppliers';
import {Request,Response} from 'express';


const register=async(req:Request,res:Response)=>{
      
    const { full_name ,e_mail, password,profile_pic,user_type} = req.body;
    if (!full_name) {
        return res.status(422).send("no name");
    }
    if (!e_mail) {
        return res.status(422).send("no email");
    }
    if (!password) {
        return res.status(422).send("no password");
    }
    if (!profile_pic) {
        return res.status(422).send("no profilepic");
    }
    if (!user_type) {
        return res.status(422).send("no user_type");
    }
    if(user_type=='supplier'){
    try{
     await EcSuppliers.create({full_name:`${full_name}`,e_mail:`${e_mail}`,password:`${password}`,profile_pic:`${profile_pic}`})
    }
    catch(error:any){
        console.log(error);
    }}
    
    return res.status(200).json(`From the contact, name is ${full_name} with email ${e_mail} password is ${password} and profile pic is ${profile_pic}`);
}
export default register;