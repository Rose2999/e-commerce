import express,{Express,Request,Response} from 'express';
import sequelize from "./config/sequelize-config";
import EcSuppliers from './models/ec_suppliers';
import indexRoutes from './routes/index'
import supplierRoutes from './routes/supplierRoutes'
const app:Express=express();

const PORT=3000;

app.listen(PORT,()=>{
    console.log("listening")
});
sequelize.sync({force:false})
   .then(()=>{
    console.log("database synced");
   })
   .catch((error:any)=>{
    console.log("error in syncing database",error);
   })
   app.use(express.json());
   app.use(indexRoutes);
   app.use('/api/v1',supplierRoutes);
//    app.use('/api/v2',customerRoutes);
   
    