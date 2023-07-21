import { Router } from "express";
import userController from "../controllers/user.controller.js";


const router = Router();

//METODO GET
router.get('/',userController.getUsers)
router.get('/:uid',userController.getUsersBy)

//METODO POST
router.post('/',userController.createUser)

//METODO PUT
router.put('/:uid',userController.updateUser)

//METODO DELETE
router.delete('/:uid', userController.deleteUser)

export default router