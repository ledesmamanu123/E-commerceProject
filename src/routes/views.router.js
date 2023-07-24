import { Router } from "express";
import { authToken } from "../utils.js";
import ProductsManager from "../../dao/mongo/Managers/productsManager.js";
import SessionUserDTO from "../../dao/DTO's/users/SessionUserDTO.js";


const router = Router();
const productServices = new ProductsManager();

router.get('/',async(req,res)=>{

    const {page=1, limit =3} = req.query;
    const paginates = await productServices.paginateProducts(page,limit)
    const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest} = paginates;
    const products = docs;

    res.render('home', { //render va a buscar el archivo a views
        products,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page:rest.page,
        limit:rest.limit,
        user:req.user
    }) 
})

router.get('/form',(req,res)=>{
    res.render('form')
})

router.get('/register',(req,res)=>{
    res.render('register')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/current',authToken,(req,res)=>{
    let user = new SessionUserDTO(req.user)
    res.send({status:'Success', payload:user})
})

export default router;