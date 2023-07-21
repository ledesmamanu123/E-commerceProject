import userModel from "../Models/user.js";

export default class UsersManager {
    getUsers = (params) =>{
        return userModel.find(params).lean();
    }

    createUser = (user) =>{
        return userModel.create(user);
    }

    getUsersBy = (params) =>{
        return userModel.findOne(params).lean();
    }

    updateUser = (id, user) =>{
        return userModel.findByIdAndUpdate(id, {$set:user});
    }

    deleteUser = (id) =>{
        return userModel.findByIdAndDelete(id);
    }
}