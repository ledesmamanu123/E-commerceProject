import UsersManager from "../../dao/mongo/Managers/usersManager.js";
import { createHash, isValidPassword } from "../utils.js";

const usersService = new UsersManager();

const getUsers = async(req,res) =>{
    const users = await usersService.getUsers();
    res.send({status:"Success", payload:users})
}

const getUsersBy = async(req,res)=>{
    const {uid} = req.params;
    const user = await usersService.getUsersBy({_id:uid})
    if(!user) return res.status(404).send({status:'error', error:"User not found"})
    res.send({status:"Success", payload:user})
}

const createUser = async(req,res)=>{
    
    res.send({status:"Success", message:"User registered",payload:req.user})
}

const updateUser =  async (req,res)=>{
    try {
        const {uid} = req.params;
        const updatedFields = req.body;
        const result = await usersService.updateUser(uid, updatedFields);
        res.send({status:"Success Updated"})
    } catch (error) {
        console.log(error)
        res.send({status:'Error', error:error})
    }
}

const deleteUser =  async (req,res)=>{
    const {uid} = req.params;
    await usersService.deleteUser(uid)
    res.send({status:"Success Deleted"})
}

export default {
    createUser,
    getUsers,
    getUsersBy,
    updateUser,
    deleteUser
}