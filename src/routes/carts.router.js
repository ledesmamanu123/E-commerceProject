import { Router } from "express";

import cartsController from "../controllers/carts.controller.js";
import { handlePolities } from "../utils.js";


const router = Router();

//METODO POST
router.post('/',cartsController.createCart)
router.post('/:cid/product/:pid',handlePolities(["USER","USER_PREMIUM"]),cartsController.addProductToCart)


//METODO GET
router.get('/',cartsController.getCarts)
router.get('/:cid',cartsController.getCartBy)

export default router