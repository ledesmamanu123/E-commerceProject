import fs from 'fs';

export default class CartManager {
    constructor() {
        this.path = './Entregables/files/Carts.json';
    }

    getCarts = async () =>{
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const carts = JSON.parse(data);
            return carts;
        }else return [];
    }

    newCart = async () =>{
        const carts = await this.getCarts(); //CARTS = [{products:["":""], id:1}] 
        const cart = {
            products:[]
        }
        //Agregamos un ID al carrito
        if (carts.length===0){
            cart.id = 1;
        }else{ 
            const lastCart = carts[carts.length-1]; //Accedo al último lugar del array.
            cart.id = lastCart.id + 1;
        }
        carts.push(cart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        console.log(`Cart was created successfuly`);
    }
    setProductToCart = async (cartId,prodId) =>{
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(cart => cart.id === cartId)
        if (cartIndex===-1){
            return console.log("Cart doesn't exist")
        }

        const products = {
            product:prodId
        }

        const prodIndex = carts[cartIndex].products.findIndex(prod => prod.product === prodId) //Buscamos el producto en array de Products

        if (prodIndex===-1){
            products.quantity = 1;
            carts[cartIndex].products.push(products);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            console.log("Product added successfuly")
    
        }else{
            carts[cartIndex].products[prodIndex].quantity++;
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            console.log("Product added successfuly")
        }
    }

    getCartById = async (cartId) =>{
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(cart => cart.id === cartId)
        if(cartIndex === -1){
            console.log("Cart not found")
        }
        return carts[cartIndex];
    }

}
