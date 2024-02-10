import forgetPassword from '../controllers/authentication/forgetPassword';
import profile from '../controllers/authentication/profile';
import midddlewareverify from '../middleware/verifyjwt';
import express,{Router,Request,Response} from 'express';

const app=express();
const router=Router();
router.get("/profile",midddlewareverify, async (req:Request, res:Response) =>{
      profile(req,res);
})


router.patch("/resetpassword", async (req:Request, res:Response) =>{
    forgetPassword(req,res);
})
export default router;