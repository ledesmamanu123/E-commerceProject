import { Router } from "express";
import CartManager from "../../dao/mongo/Managers/cartsManager.js";
import ProductsManager from "../../dao/mongo/Managers/productsManager.js";
import { REQUEST_STATUS } from "../consts.js";

const cartService = new CartManager();
const productService = new ProductsManager();

const router = Router();

//METODO POST

router.post('/', async (req,res)=>{
    const cart = {
        products:[]
    }
    const result = await cartService.createCart(cart)
    res.send({status:"Success", message:"Cart was created successfuly"})
})
router.post('/:cid/product/:pid', async (req,res)=>{
    const {cid} = req.params;
    const {pid} = req.params;
    const cart = await cartService.getCartBy({_id:cid})
    const products = {
        product:pid
    }

    const result = await cartService.setProductToCart(cid, products)
    res.send({status:"Success", message:"Product added successfuly"})

})


//METODO GET
router.get('/', async (req,res)=>{
    const carts = await cartService.getCarts();
    console.log(JSON.stringify(carts[0]._id))
    res.send(carts)
})
router.get('/:cid', async (req,res)=>{
    const {cid} = req.params;
    const result = await cartService.getCartBy({_id:cid})
    console.log(result)
    res.send({status:"Success", payload:result})
})

export default router