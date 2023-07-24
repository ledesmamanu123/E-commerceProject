import productsModel from "../Models/products.js";

export default class Products {
    constructor(){}

    get = async (params) =>{
        let products = await productsModel.find(params).lean();
        return products;
    }

    create = async (params) =>{
        let product = await productsModel.create(params);
        return product;
    }

    getBy = async (params) =>{
        let product = await productsModel.findOne(params).lean();
        return product;
    }

    update = async (id, params) =>{
        let product = await productsModel.findByIdAndUpdate(id, {$set:params});
        return product;
    }

    delete = async (id) =>{
        let product = await productsModel.findByIdAndDelete(id);
        return product;
    }

    paginate = (page, limit) =>{
        return productsModel.paginate({},{page, limit, lean:true})
    }




}