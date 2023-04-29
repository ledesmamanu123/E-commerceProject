import { Router } from "express";
import CartManager from "../../Managers/CartManager/cartManager.js";
import { REQUEST_STATUS } from "../consts.js";

//Instancia de la clase Carts
const cartManager = new CartManager();

const router = Router();

//METODO POST

router.post('/', async (req,res)=>{
    await cartManager.newCart()
    res.send({status:"Success", message:"Cart was created successfuly"})
})
router.post('/:cid/product/:pid', async (req,res)=>{
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const status = await cartManager.setProductToCart(parseInt(cartId),parseInt(prodId))
    if(status===REQUEST_STATUS.NOT_FOUND){return res.status(404).send({status:"error", message:"Cart or product don't exist"})}
    res.send({status:"Success", message:"Product added successfuly"})

})


//METODO GET
router.get('/', async (req,res)=>{
    const carts = await cartManager.getCarts();
    res.send(carts)
})
router.get('/:cid', async (req,res)=>{
    const cartId = req.params.cid;
    const cart = await cartManager.getCartById(parseInt(cartId))
    if(cart=== REQUEST_STATUS.NOT_FOUND){return res.status(404).send({status:"error",message:"Cart doesn't exist"})}
    res.send(cart)
})

export default router