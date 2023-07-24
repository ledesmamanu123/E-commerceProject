import productsModel from "../Models/products.js";

export default class ProductsManager {
    getProducts = (params) =>{
        return productsModel.find(params).lean();
    }

    createProduct = (product) =>{
        return productsModel.create(product);
    }

    getProductsBy = (params) =>{
        return productsModel.findOne(params).lean();
    }

    updateProduct = (id, product) =>{
        return productsModel.findByIdAndUpdate(id, {$set:product});
    }

    deleteProduct = (id) =>{
        return productsModel.findByIdAndDelete(id);
    }

    paginateProducts = (page, limit) =>{
        return productsModel.paginate({},{page, limit, lean:true})
    }
}