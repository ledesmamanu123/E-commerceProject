import { Router } from "express";
import { handlePolities } from "../utils.js";
import ProductsManager from "../../dao/mongo/Managers/productsManager.js";


const router = Router();
const productServices = new ProductsManager();

router.get('/',async(req,res)=>{

    const {page=1, limit =3} = req.query;
    const paginates = await productServices.paginateProducts(page,limit)
    const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest} = paginates;
    const products = docs;
    console.log(req.user)
    req.logger.info('Esto es un log de informacion')
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

router.get('/form',handlePolities(["PUBLIC"]),(req,res)=>{
    res.render('form')
})

router.get('/register',handlePolities(["PUBLIC"]),(req,res)=>{
    res.render('register')
})

router.get('/login',handlePolities(["PUBLIC"]),(req,res)=>{
    res.render('login')
})

router.get('/current',handlePolities(["USER"]),(req,res)=>{
    res.send({status:'Success', payload:req.user.user})
})

export default router;