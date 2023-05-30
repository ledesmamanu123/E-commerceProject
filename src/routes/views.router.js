import { Router } from "express";
import ProductsManager from "../../dao/mongo/Managers/productsManager.js";

const productService = new ProductsManager();
const router = Router();

router.get('/', async(req, res)=>{
    const products = await productService.getProducts()
    res.render('home', { //render va a buscar el archivo a views
        products
    }) 
})

router.get('/form',(req,res)=>{
    res.render('form')
})

export default router;