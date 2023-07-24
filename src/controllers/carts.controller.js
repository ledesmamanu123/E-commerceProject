import CreateCartDTO from "../../dao/DTO's/carts/CreateCartDTO.js";
import CartManager from "../../dao/mongo/Managers/cartsManager.js";
import { REQUEST_STATUS } from "../consts.js";

const cartService = new CartManager();

const createCart = async (req,res)=>{
    const cart = new CreateCartDTO()
    console.log(cart)
    const result = await cartService.createCart(cart)
    res.send({status:"Success", message:"Cart was created successfuly"})
}

const addProductToCart = async (req,res)=>{
    const {cid} = req.params;
    const {pid} = req.params;
    const cart = await cartService.getCartBy({_id:cid})
    const products = {
        product:pid
    }

    const result = await cartService.setProductToCart(cid, products)
    res.send({status:"Success", message:"Product added successfuly"})

}

const getCarts = async (req,res)=>{
    const carts = await cartService.getCarts();
    console.log(JSON.stringify(carts[0]._id))
    res.send(carts)
}

const getCartBy =  async (req,res)=>{
    const {cid} = req.params;
    const result = await cartService.getCartBy({_id:cid})
    console.log(result)
    res.send({status:"Success", payload:result})
}

export default {
    createCart,
    addProductToCart,
    getCarts,
    getCartBy
}