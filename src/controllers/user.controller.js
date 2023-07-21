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
    const users = await usersService.getUsers();
    const {email,first_name, last_name, age, password, cart} = req.body;
    if(users.find(user => user.email === email)) return res.status(400).send({status:'error', error:"Email already existed"})
    if(!email||!first_name||!last_name||!age||!password||!cart) return res.status(400).send({status:"error", error:"Incompleted values"})
    
    //Cuando paso todos los controles, ACÁ CREAMOS AL USER, Y DESPUES LE CREAMOS LA SESSION

    //Hasheamos la pass
    const hashPassword = createHash(password);

    //Creamos al user
    const user = {
        first_name,
        last_name,
        email,
        password: hashPassword,
        age,
        cart
    }

    const result = await usersService.createUser(user);
    res.send({status:'Success', payload:result})
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