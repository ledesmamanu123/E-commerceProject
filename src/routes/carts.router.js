import { Router } from "express";

import cartsController from "../controllers/carts.controller.js";
import { handlePolities } from "../utils.js";


const router = Router();

//METODO POST
router.post('/',cartsController.createCart)
router.post('/:cid/product/:pid',cartsController.addProductsToCart)


//METODO GET
router.get('/',cartsController.getCarts)
router.get('/:cid',cartsController.getCartBy)
router.get('/:cid/purchase',cartsController.finishCart)

//METODO PUT
router.put('/:cid/products/:pid',cartsController.addQuantityProductToCart)

//METODO DELETE
router.delete('/:cid',cartsController.emptyCart)
router.delete('/:cid/products/:pid',cartsController.deleteProductFromCart)
router.delete('/:cid/product/:pid',cartsController.deleteUnitFromCart)

export default router