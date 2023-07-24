import { Router } from "express";
import userController from "../controllers/user.controller.js";
import passport from "passport";


const router = Router();

//METODO GET
router.get('/',userController.getUsers)
router.get('/:uid',userController.getUsersBy)

router.get('/failRegister',(req,res)=>{
    console.log("FailedStrategy")
    res.send({status:"Error", error:"Estraategia fallida"})
})

//METODO POST
router.post('/register',passport.authenticate('register',{failureRedirect:'/api/users/failRegister', session:false}),userController.createUser)
router.post('/login',passport.authenticate('login',{failureRedirect:'/api/users/failLogin', session:false}),userController.createUser)

//METODO PUT
router.put('/:uid',userController.updateUser)

//METODO DELETE
router.delete('/:uid', userController.deleteUser)

export default router