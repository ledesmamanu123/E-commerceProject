import productsModel from "../Models/products.js";

export default class Products {
    constructor(){
        this.data = []
    }

    get = async (params) =>{
        return this.data;
    }

    create = async (params) =>{
        let product = params;
        return this.data.push(product);
    }

    getBy = async (id) =>{
        let products = this.data;
        let product = products.find(product => product.id === id)
        return product;
    }

    update = async (id, params) =>{
        let products = this.data;
        let prodIndex = products.findIndex(prod => prod.id === id)
        let productToUpdate = { ...products[prodIndex], ...params };
        return products[prodIndex] = productToUpdate;
    }

    delete = async (id) =>{
        let products = this.data;
        let prodIndex = products.findIndex(prod => prod.id === id)
        if(!prodIndex === -1) return products.splice(prodIndex, 1);
    }




}