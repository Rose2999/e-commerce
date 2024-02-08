const express=require('express');
const sequelize=require("./config/sequelize-config")
const EcSuppliers = require('./models/ec_suppliers');
const app=express();
PORT=3000;

app.listen(PORT,()=>{
    console.log("listening")
});
sequelize.sync({force:false})
   .then(()=>{
    console.log("database synced");
   })
   .catch((error)=>{
    console.log("error in syncing database",error);
   })
   app.use(express.json());
 
   app.post('/SupplierRegistration',async(req,res)=>{
      
       const { full_name ,e_mail, password,profile_pic} = req.body;
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
       try{
        await EcSuppliers.create({full_name:`${full_name}`,e_mail:`${e_mail}`,password:`${password}`,profile_pic:`${profile_pic}`})
       }
       catch(error){
           console.log(error);
       }
       
       return res.status(200).json(`From the contact, name is ${full_name} with email ${e_mail} password is ${password} and profile pic is ${profile_pic}`);
   })
   app.post("/login", async (req, res) =>{
 
    try{
        const { e_mail,password,user_type} = req.body;
 
        if(user_type=='supplier'){
            const supplier = await EcSuppliers.findOne({
                where:{
                    
                    e_mail: e_mail,
                    password:password,
                }
                
            });
            console.log(supplier);
            res.status(200).json(`Login successfull ${supplier.full_name}`);
        }
        else{
            res.status(400).json({error:'wrong user'});
        }
    }
    catch (error){
        console.log(error)
        res.status(401).json({error:'Login error'});
    }})
    app.get("/profile", async (req, res) =>{
 
        try{
            const {registration_id, user_type} = req.body;
            if(user_type=='supplier'){
                const supplier = await EcSuppliers.findOne({
                    where:{
                        registration_id:registration_id,
                
                    }
                });
                res.status(200).json(`Account found with name ${supplier.full_name},email ${supplier.e_mail} and password ${supplier.password}`);
            }
            else{
                res.status(400).json({error:'wrong user'});
            }
        }
        catch (error){
            console.log(error)
            res.status(401).json({error:'error'});
        }})

// const Insert = async (full_name,e_mail,password,profile_pic)=>{
//     EcSuppliers.create({full_name:`${full_name}`,e_mail:`${e_mail}`,password:`${password}`,profile_pic:`${profile_pic}`})
// }
app.patch("/resetpassword", async (req, res) =>{
 
    try{
        const {e_mail,new_password,user_type} = req.body;
        if(user_type=='supplier'){
            const supplier = await EcSuppliers.update({password:new_password},{
                where:{
                    e_mail:e_mail
                }
            });
            console.log(supplier);
            res.status(200).json(`Account found with name ${full_name},email ${e_mail} and password ${supplier.password}`);
        }
        else{
            res.status(400).json(`not able to update password`);
        }
    }
    catch (error){
        console.log(error)
        res.status(401).json({error:'error'});
    }})