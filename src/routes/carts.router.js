import { Router } from "express";
import CartManager from "../../CartManager/cartManager.js";

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
    await cartManager.setProductToCart(parseInt(cartId),parseInt(prodId))
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
    res.send(cart)
})

export default router