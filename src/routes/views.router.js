import { Router } from "express";


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

export default router;