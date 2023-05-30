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

    //  setNewProductToCart = (cid, product, pid)=>{
    //     console.log(product)
    //      return cartsModel.findByIdAndUpdate(
    //         {_id:cid},
    //         {$eq:{}}
    //      )
    // }

    setProductToCart = (cid, product) =>{
        console.log(product)
        //   return cartsModel.updateOne(
        //       {_id: cid}, //Buscamos el carrito por id
        //       {$push:{products:{product: new mongoose.Types.ObjectId(products.product), quantity:products.quantity}}}) //Pusheamos en nuestra key 'products', un objeto con la key 'product' y el value pid.
        return cartsModel.findByIdAndUpdate(
            {_id:cid}, //Buscamos el carrito por el id
            {$set:{products:product}} //Seteamos el producto nuevo
        )
    }

    deleteCart = (cid) =>{
        return cartsModel.findOneAndDelete(cid)
    }

}