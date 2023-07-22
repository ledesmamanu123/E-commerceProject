import { Router } from "express";
import { authToken } from "../utils.js";


const router = Router();

router.get('/',(req, res)=>{
    const user ={
        name:"Lucas",
        email:"agustin@correo.com"
    }
    res.render('home', { //render va a buscar el archivo a views
        name: user.name
    }) 
})

router.get('/form',(req,res)=>{
    res.render('form')
})

router.get('/register',(req,res)=>{
    res.render('register')
})

router.get('/current',authToken,(req,res)=>{
    res.send({status:'Success', payload:req.user})
})

export default router;