import { Router } from "express";
import ProductsManager from "../../dao/mongo/Managers/productsManager.js";
import productsModel from "../../dao/mongo/Models/products.js";

const productService = new ProductsManager();
const router = Router();

router.get('/', async(req, res)=>{
    const {page=1, limit =3} = req.query;
    const paginates = await productsModel.paginate({},{page, limit, lean:true})
    console.log(req.query)
    const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest} = paginates;
    const products = docs;

    res.render('home', { //render va a buscar el archivo a views
        products,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page:rest.page,
        limit:rest.limit
    }) 
})

router.get('/form',(req,res)=>{
    res.render('form')
})

export default router;