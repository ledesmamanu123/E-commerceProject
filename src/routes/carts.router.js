import { Router } from "express";
import CartManager from "../../dao/mongo/Managers/cartsManager.js";
import ProductsManager from "../../dao/mongo/Managers/productsManager.js";
import { REQUEST_STATUS } from "../consts.js";

const cartService = new CartManager();
const productService = new ProductsManager();

const router = Router();

//METODO POST

router.post('/', async (req,res)=>{
    const cart = {
        products:[]
    }
    const result = await cartService.createCart(cart)
    res.send({status:"Success", message:"Cart was created successfuly"})
})
router.post('/:cid/product/:pid', async (req,res)=>{
    const {cid} = req.params;
    const {pid} = req.params;
    try {
        const cart = await cartService.getCartBy({_id:cid}) 
        //console.log("Este es el ID del producto dentro del carrito: "+cart.products[0].product)
        console.log("Este es el lugar del producto en el array products: "+cart.products.findIndex(prod => prod.product == pid)) //cart = {_id:'suRespectivoId', products:[ {product:'idDelProducto', _id:'idDelObjetoEnSi'},{...},{...} ]}

        //Verificamos que el producto exista en nuestro carrito
        const prodIndex = cart.products.findIndex(prod => prod.product == pid)

        if(prodIndex === -1){ //Si prodIndex es -1, el producto no existe, entonces le agreamos la quantity a 1
            console.log('El producto no existe')
            const products = {
                product:pid
            }
            products.quantity = 1;
            const result = await cartService.setProductToCart(cid, products);
            return res.send({status:'Success', message:'Product added successfuly'})
        }else{
            console.log('El producto existe')
            const prevQuantity = cart.products[prodIndex].quantity;
            console.log(prevQuantity);
            const products = {
                product:pid,
                quantity: prevQuantity + 1
            }
            const result = await cartService.setProductToCart(cid, products);
            return res.send({status:'Success', message:'Product added successfuly'})
        }
    } catch (error) {
        console.log(error)
    }
})


//METODO GET
router.get('/', async (req,res)=>{
    const carts = await cartService.getCarts();
    //console.log(JSON.stringify(carts[0]._id))
    res.send(carts)
})
router.get('/:cid', async (req,res)=>{
    const {cid} = req.params;
    const result = await cartService.getCartBy({_id:cid})
    console.log(result)
    res.send({status:"Success", payload:result})
})

//METODO DELETE
router.delete('/:cid', async (req,res)=>{
    const {cid} = req.params;
    const result = await cartService.deleteCart({_id:cid})
    res.send({status:'Success', message:'Cart deleted successfuly'})
})
export default router