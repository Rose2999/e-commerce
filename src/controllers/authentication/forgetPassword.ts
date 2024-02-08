import EcSuppliers from '../../models/ec_suppliers';
import {Request,Response} from 'express';

const forgetPassword=async(req:Request,res:Response)=>{try{
    const {e_mail,new_password,user_type} = req.body;
    if(user_type=='supplier'){
        const supplier = await EcSuppliers.update({password:new_password},{
            where:{
                e_mail:e_mail
            }
        });
        console.log(supplier);
        res.status(200).json(`Account found with name ,email ${e_mail} and password ${new_password}`);
    }
    else{
        res.status(400).json(`not able to update password`);
    }
}
catch (error:any){
    console.log(error)
    res.status(401).json({error:'error'});
}}
export default forgetPassword;