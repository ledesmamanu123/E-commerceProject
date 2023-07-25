import mongoose from "mongoose";
import cartsModel from "../Models/cart.js";

export default class CartManager {
    getCarts = (params) =>{
        return cartsModel.find(params).lean();
    }

    createCart = (cart) =>{
        return cartsModel.create(cart);
    }

    getCartBy = (params) =>{
        return cartsModel.findOne(params).exec();
    }

    setProductToCart = (cid, product) =>{
    return cartsModel.findByIdAndUpdate(cid, {$set:product})
    }

    deleteCart = (cid) =>{
        return cartsModel.findOneAndDelete(cid)
    }

}