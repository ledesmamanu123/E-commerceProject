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
        return cartsModel.findOne(params).lean();
    }

    setProductToCart = (cid, product) =>{
    //     return cartsModel.updateOne(
    //         {_id: cid}, //Buscamos el carrito por id
    //         {$push:{products:{product: new mongoose.Types.ObjectId(pid)}}}) //Pusheamos en nuestra key 'products', un objeto con la key 'product' y el value pid.
    return cartsModel.findByIdAndUpdate(cid, {$set:product})
    }

}