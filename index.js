import CartManager from "./CartManager/cartManager.js";

const cartManager = new CartManager();

const context = async ()=>{
    const products = [
        {
            title: "Motorola G60s",
            description: "Celular gama-media",
            price: 25000,
            thumbnail: "#",
            code: "001",
            stock: 3,
            id: 1
        },
        {
            title: "Motorola G7",
            description: "Celular gama-media baja",
            price: 20000,
            thumbnail: "#",
            code: "002",
            stock: 1,
            id: 2
        },
        {
            title: "Motorola G6",
            description: "Celular gama-media baja",
            price: 20000,
            thumbnail: "#",
            code: "002",
            stock: 1,
            id: 3
        }
    ]
    await cartManager.newCart(products)
}

context();