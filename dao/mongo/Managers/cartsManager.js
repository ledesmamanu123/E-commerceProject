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

    setProductToCart = () =>{
        // console.log(products)
        // return cartsModel.updateOne(
        //     {_id:cid},
        //     {$push:{products:{product: new mongoose.Types.ObjectId(products.product), quantity:products.quantity}}})
        // const cartId = new mongoose.Types.ObjectId(cid)
        // return cartsModel.findByIdAndUpdate(
        //     {cartId, 'products.product': pid},
        //     {$inc: {'products.$.quantity': 1}}
        // )
        return cartsModel.save();
    }

    deleteCart = (cid) =>{
        return cartsModel.findOneAndDelete(cid)
    }

}