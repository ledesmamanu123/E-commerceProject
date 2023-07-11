import { Router } from "express";
import UsersManager from "../../dao/mongo/Managers/usersManager.js";
import { createHash ,validatePassword } from "../utils.js";

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

//RECUPERACION DE LA CONTRASEÑA
router.post('/restoredPassword', async (req,res)=>{
    const {email, password} = req.body;

    const user = await userService.getUser({email})

    if (!user) return res.status(400).send({status:'error', error:"User doesn't exist"})//El usuario existe?
    const isSamePassword = await validatePassword(password, user.password)//Es la misma contraseña?
    if(isSamePassword) return res.status(400).send({status:"error", error:"Cannot replace password with current password"})

    //Todo bien, hasheamos la pass
    const newHashPass = await createHash(password)
    await userService.updateUser({email}, {password:newHashPass})
    res.status(200).send({status:"Success", message:"Password restored"})
})


export default router;