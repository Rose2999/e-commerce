import EcSuppliers from '../../models/ec_suppliers';
import {Request,Response} from 'express';


const profile=async(req:Request,res:Response)=>{try{
    const {registration_id, user_type} = req.body;
    if(user_type=='supplier'){
        const supplier = await EcSuppliers.findOne({
            where:{
                registration_id:registration_id,
        
            }
        });
        if(supplier != null){
        res.status(200).json(`Account found with name ${supplier.full_name},email ${supplier.e_mail} and password ${supplier.password}`);
    }}
    else{
        res.status(400).json({error:'wrong user'});
    }
}
catch (error:any){
    console.log(error)
    res.status(401).json({error:'error'});
}}
export default profile;