import { Router } from "express";
import UsersManager from "../../dao/mongo/Managers/usersManager.js";

const router = Router();
const userService = new UsersManager();

router.post('/register', async(req,res)=>{
    const user = req.body;
    const result = await userService.newUser(user);
    res.send({status:'Success', message:'Register successful'})
})

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;
    const user = await userService.getUser({email,password});
    if(!user) return res.status(404).send({status:'error', message:'Credenciales incorrectas'})

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email
    }
    res.send({status:'Success', message:'Logueado Correctamente'})

})
export default router;