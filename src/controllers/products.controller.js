import CreateProductDTO from "../../dao/DTO's/products/CreateProductDTO.js";
import ProductsManager from "../../dao/mongo/Managers/productsManager.js";
import CustomError from "../service/errors/CustomError.js";
import EErrors from "../service/errors/enums.js";
import { generateProductErrorInfo } from "../service/errors/info.js";

const productService = new ProductsManager();

const getProducts = async (req,res)=>{
    const query = Object.keys(req.query)[0];
    const queryValue = Object.values(req.query)[0];
    const products = await productService.getProducts();

    if(query != 'limit'){
        res.send(products)
    } else if(queryValue > 0){
        const productsLimited = products.slice(0,queryValue)
        res.send(productsLimited);
    } else{return res.status(400).send({status:"error", message:"Invalid limit"})}
}

const getProductBy =  async (req,res)=>{
    const {pid} = req.params;
    const product = await productService.getProductsBy({_id:pid});
    if(!product) return res.status(404).send({status:"Error", error: "Product not found"})
    res.send({status:"Success", payload:product});
}

const createProduct = async (req, res)=>{
    const products = await productService.getProducts();
    const {title, description, price, thumbnail, code, stock, status, category} = req.body;
    if(products.find(product => product.code === code)) return res.status(400).send({status:"error", error:"Product already existed"})
    if(!title||!description||!price||!code||!stock||!category){
        //Armamos el error
        CustomError.createError({
            name:"Product creation error",
            cause:generateProductErrorInfo({title, description, price, code, stock, category}),
            message:'Error trying to create Product, incomplete values',
            code:EErrors.INVALID_TYPES_ERROR
        })
        // return res.status(400).send({status:"error", error:"Incompleted values"})
    }
    //Creamos el producto
    const product = new CreateProductDTO({title, description, price, thumbnail, code, stock, status, category})
    //Mandamos nuestro nuevo producto
    const result = await productService.createProduct(product)
    res.status(201).send({status:"Success", message:"Product was created successfuly"})
}

const updateProduct =  async (req,res)=>{
    try {
        const {pid} = req.params;
        const updatedFields = req.body;
        const result = await productService.updateProduct(pid, updatedFields);
        res.send({status:"Success Updated"})
    } catch (error) {
        console.log(error)
    }
}

const deleteProduct =  async (req,res)=>{
    const {pid} = req.params;
    await productService.deleteProduct(pid)
    res.send({status:"Success Deleted"})
}

export default {
    createProduct,
    getProducts,
    getProductBy,
    updateProduct,
    deleteProduct
}
