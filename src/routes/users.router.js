import { Router } from "express";
import passport from "passport";

import userController from "../controllers/user.controller.js";
import { handlePolities } from "../utils.js";


const router = Router();

//METODO GET
router.get('/',handlePolities(["ADMIN"]),userController.getUsers)
router.get('/:uid',handlePolities(["ADMIN"]),userController.getUsersBy)

//METODO POST
router.post('/register',handlePolities(["ADMIN"]),passport.authenticate('register',{session:false}),userController.createUser)
router.post('/login',handlePolities(["ADMIN"]),passport.authenticate('login',{session:false}),userController.createUser)

//METODO PUT
router.put('/:uid',handlePolities(["ADMIN"]),userController.updateUser)

//METODO DELETE
router.delete('/:uid',handlePolities(["ADMIN"]), userController.deleteUser)

export default router