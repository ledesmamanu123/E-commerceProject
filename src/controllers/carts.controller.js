import CreateCartDTO from "../../dao/DTO's/carts/CreateCartDTO.js";
import CartManager from "../../dao/mongo/Managers/cartsManager.js";
import ProductsManager from "../../dao/mongo/Managers/productsManager.js";
import TicketsManager from "../../dao/mongo/Managers/ticketsManager.js";

const cartService = new CartManager();
const productService = new ProductsManager();
const ticketService = new TicketsManager();

const createCart = async (req,res)=>{
    const cart = new CreateCartDTO()
    console.log(cart)
    const result = await cartService.createCart(cart)
    res.send({status:"Success", message:"Cart was created successfuly"})
}

const addProductsToCart = async (req,res)=>{
    const {cid} = req.params;
    const {pid} = req.params;
    try {
        const cart = await cartService.getCartBy({_id:cid})

        if(!cart){return res.status(404).json({error: 'Cart not found'})} //Corroboramos que exista el carrito

        const prodIndex = cart.products.findIndex(prod => prod.product.toString() === pid) //Verificamos que el producto exista en nuestro carrito

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

}

const getCarts = async (req,res)=>{
    const carts = await cartService.getCarts();
    res.send(carts)
}

const getCartBy =  async (req,res)=>{
    const {cid} = req.params;
    const result = await cartService.getCartBy({_id:cid})
    console.log(result)
    res.send({status:"Success", payload:result})
}

const addQuantityProductToCart = async (req,res)=>{
    const {cid, pid} = req.params;
    const {quantity} = req.body;
    try {
        const cart = await cartService.getCartBy({_id:cid})
        if(!cart){return res.status(404).json({error: 'Cart not found'})} //Verificamos que el carrito exista
        console.log(cart.products)
        console.log(cart.products.find(prod => prod.product.toString() == pid))
        const product = cart.products.find(prod => prod.product.toString() === pid) //Verificamos que el producto exista en nuestro carrito

        console.log(product)
        if(!product){return res.status(404).send({status:'error', message:"Product didn't exist"})} //el no producto existe

        //Si existe, agregamos la cantidad pedida
        product.quantity = quantity;

        const result = await cart.save();
        return res.send({status:'Success', message:'Product updated successfuly', cart:result})
    } catch (error) {
        
    }
}

const emptyCart = async (req,res)=>{
    const {cid} = req.params;
    try {
        const cart = await cartService.getCartBy({_id:cid})
        if(!cart){return res.status(404).json({error: 'Cart not found'})} //Verificamos que el carrito exista
        cart.products = [];
        const result = await cart.save();
        return res.send({status:'Success', message:'Products deleted successfuly', cart:result})
        
    } catch (error) {
        console.log('Error: '+error)
        res.status(500).send({error:error, message:'Server error'})
    }
}

const deleteProductFromCart = async(req,res)=>{
    const {cid, pid} = req.params;
    try {
        const cart = await cartService.getCartBy({_id:cid})
        if(!cart){return res.status(404).json({error: 'Cart not found'})} //Verificamos que el carrito exista
        const prodIndex = cart.products.findIndex(prod => prod.product.toString() === pid) //Verificamos que producto exista dentro del carrito

        if(prodIndex!==-1){ //el producto existe
            console.log("Eliminamos el producto"+ prodIndex)
            cart.products.pull({product:pid})
            const result = await cart.save();
            return res.send({status:'Success', message:'Product deleted successfuly', cart:result})
        }else{//el producto no existe
            return res.status(404).send({error:'Error', message:"Product doesn't exist"})
        }
    } catch (error) {
        console.log('Error: '+error)
        res.status(500).send({error:error, message:'Server error'})
        
    }
}

const deleteUnitFromCart = async(req,res)=>{
    const {cid, pid} = req.params;
    try {
        const cart = await cartService.getCartBy({_id:cid})
        if(!cart){return res.status(404).json({error: 'Cart not found'})} //Verificamos que el carrito exista
        const prodIndex = cart.products.findIndex(prod => prod.product.toString() === pid) //Verificamos que producto exista dentro del carrito

        if(prodIndex!==-1){ //el producto existe
            if(cart.products[prodIndex].quantity>1){ //Si tiene mas de 1
                cart.products[prodIndex].quantity--;
            }else{
                cart.products.splice(prodIndex, 1); //Si tiene 1, eliminarlo
            }
            const result = await cart.save();
            return res.send({status:'Success', message:'Product deleted successfuly', cart:result})
        }else{//el producto no existe
            return res.status(404).send({error:'Error', message:"Product doesn't exist"})
        }
    } catch (error) {
        console.log('Error: '+error)
        res.status(500).send({error:error, message:'Server error'})
        
    }
}

//Finalizar compra
const finishCart = async(req,res)=>{
    let amount = 0;
    const {cid} = req.params;
    let user={
        name:"Fito Paes",
        email:"correoDeFito@correo.com"
    }
    try {
        const cart = await cartService.getCartBy({_id:cid})
        const productsBD = await productService.getProducts();
        const withoutStock = [];

        // "cart": {
        //     "_id": "64777352b37ae1de68b4d397",
        //     "products": [
        //         {
        //             "product": "646c0ac797d284baf4e4a1e6",
        //             "quantity": 100,
        //             "_id": "648c699a0b187700fa286deb"
        //         },
        //         {
        //             "quantity": 2,
        //             "product": "646c0a5097d284baf4e4a1e0",
        //             "_id": "64bf22df4356371b1bb79c76"
        //         },
        //         {
        //             "product": "646c0b1297d284baf4e4a1ea",
        //             "_id": "64bf28831758e82ed495f045",
        //             "quantity": 4
        //         }
        //     ],
        //     "created_at": "2023-05-31T16:18:26.262Z",
        //     "updated_at": "2023-07-25T01:43:45.661Z",
        //     "__v": 9
        // }

        //VERIFICAR EL STOCK Y DISPONIBILIDAD
        cart.products.forEach((cartProduct, index) => { //Para cada producto del cart
            const prodInStock = productsBD.find(prod => prod._id.toString() === cartProduct.product.toString()) //Donde el id de los productos coinicida con el producto de mi cart
            if(prodInStock) {
                if(cartProduct.quantity > prodInStock.stock){ //Si la cantidad del producto que esta en mi carrito, es mayor a la cantidad de Stock que tengo...
                    cart.products.splice(index, 1) //Eliminamos el producto del carrito
                    withoutStock.push({product:prodInStock._id}) //Lo agregamos a un array, que vamos a utilizar mostrar los productos que no se compraron
                }else{ //Hay suficiente stock
                    prodInStock.stock = prodInStock.stock - cartProduct.quantity; //Lo descontamos
                    amount += cartProduct.quantity * prodInStock.price;
                }
            }
        });
        //Acá ya deberiamos tener el carrito con los productos disponibles y con el stock descontado
        //Armamos el ticket
        const ticket ={
            purchaser:user.email,
            amount:amount
        }
        const result = await ticketService.createTicket(ticket)
        const newCart = await cart.save();
    res.json({status:"Success", payload:result, cart:newCart})

    } catch (error) {
        console.log('Error: '+error)
        res.status(500).send({error:error, message:'Server error'})
    }
}
export default {
    createCart,
    addProductsToCart,
    getCarts,
    getCartBy,
    addQuantityProductToCart,
    emptyCart,
    deleteProductFromCart,
    deleteUnitFromCart,
    finishCart
}