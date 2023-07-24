import { Router } from "express";

import productsController from "../controllers/products.controller.js";
import { handlePolities } from "../utils.js";

const router = Router();

//METODOS GET
router.get('/',productsController.getProducts)
router.get('/:pid',productsController.getProductBy)

//METODOS POST
router.post('/',handlePolities(["ADMIN"]),productsController.createProduct)

//METODOS PUT
router.put('/:pid',handlePolities(["ADMIN"]),productsController.updateProduct)

//METODO DELETE
router.delete('/:pid',handlePolities(["ADMIN"]),productsController.deleteProduct)

export default router