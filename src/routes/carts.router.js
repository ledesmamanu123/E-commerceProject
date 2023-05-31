import { Router } from "express";
import CartManager from "../../dao/mongo/Managers/cartsManager.js";
import ProductsManager from "../../dao/mongo/Managers/productsManager.js";
import cartsModel from "../../dao/mongo/Models/cart.js";

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
        const cart = await cartsModel.findById(cid)
        if(!cart){return res.status(404).json({error: 'Carrito not found'})}
        // console.log("Este es el lugar del producto en el array products: "+cart.products.findIndex(prod => prod.product == pid)) //cart = {_id:'suRespectivoId', products:[ {product:'idDelProducto', _id:'idDelObjetoEnSi'},{...},{...} ]}

        //Verificamos que el producto exista en nuestro carrito
        const prodIndex = cart.products.findIndex(prod => prod.product.toString() === pid)

        if(prodIndex === -1){ //El producto no existe
            cart.products.push({product:pid})
        }else{ //El producto si existe
            cart.products[prodIndex].quantity+=1;
        }
        const result = await cart.save();
        return res.send({status:'Success', message:'Product added successfuly', cart:result})
    } catch (error) {
        console.log('Error al agregar el producto: '+error)
        res.status(500).send({error:error, message:'Error interno'})
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