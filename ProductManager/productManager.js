import fs from 'fs';
import crypto from 'crypto';

export default class ProductManager {
    constructor(){
        this.path = './Entregables/files/Products.json';
    }

    getProducts = async () => { //Método para devolver los productos
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(data);
            return products;
        }else return [];
    }

    addProducts = async ({title, description, price, thumbnail, code, stock, status, category}) =>{ //Metodo para agregar productos
        const products = await this.getProducts();
        if (products.find(product => product.code === code)){ //Validamos que el code sea distinto
            return console.log("El producto ya existe");
        }
        //Validamos que todos los campos esten completos
        if (!title||!description||!price||!code||!stock||!category){
            return console.log("Complete todos los campos");
            
        }
        const product = {
            title, 
            description, 
            price, 
            thumbnail:[], 
            code, 
            stock,
            status,
            category
        }
        //Agregamos un ID al producto
        if (products.length===0){ //No hay productos
            product.id = 1;
        }else{ //Ya hay productos
            const lastProduct = products[products.length-1]; //Accedo al último lugar del array.
            product.id = lastProduct.id + 1;
        }
        products.push(product)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        console.log(`product was added successfuly`);
    }

        //Método que me traiga un producto en especifico por el ID
    getProductById = async (newId) =>{
        const products = await this.getProducts();
        const productIndex = products.findIndex(product => product.id === newId) //Corroboramos que el producto exista en nuestro array mediante una condicion (en este caso, si el id del objeto del array que estamos iterando, es igual al id que nos mandan).
        if(productIndex === -1){ //Si la condicion no se cumple, hacer lo siguiente
            console.log("Not Found");
            console.log(newId)
        }
        //Si llega acá, entonces el producto existe, entonces, devolver el producto
        return products[productIndex];

    }

    updateProduct = async (id, updatedFields) =>{
        try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(prod => prod.id === id);
            if(productIndex === -1){console.log("Product not found")}

            const productToUpdate = { ...products[productIndex], ...updatedFields };
            products[productIndex] = productToUpdate;

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            console.log('Product updated successfuly')

        } catch (error) {
            console.error(error);
        }

    }

    deleteProduct = async (id) =>{
        const products = await this.getProducts();
        const productIndex = products.findIndex(prod => prod.id === id);
        if(productIndex === -1){console.log("Product not found")}
        products.splice(productIndex, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        console.log('Product deleted');
    }
}