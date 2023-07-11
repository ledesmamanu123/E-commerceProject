import userModel from "../Models/user.js";

export default class UsersManager {
    getUsers = (params) =>{
        return userModel.find(params).lean();
    }

    getUser = (params) =>{
        return userModel.findOne(params).lean();
    }

    newUser = (params) =>{
        return userModel.create(params)
    }
    deleteUser = (params) =>{
        return userModel.findByIdAndDelete(params)
    }
    updateUser = (id, fields)=>{
        return userModel.findByIdAndUpdate(id,{$set:fields})
    }
}