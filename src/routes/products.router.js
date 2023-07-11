import { Router } from "express";
import productsController from "../controllers/products.controller.js";

const router = Router();

//METODOS GET
router.get('/',productsController.getProducts)
router.get('/:pid',productsController.getProductBy)

//METODOS POST
router.post('/', productsController.createProduct)

//METODOS PUT
router.put('/:pid', productsController.updateProduct)

//METODO DELETE
router.delete('/:pid', productsController.deleteProduct)

export default router