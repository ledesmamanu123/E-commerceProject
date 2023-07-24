import mongoose from "mongoose";
import config from "../src/config/config";

export let Products;
switch(config.persistance){
    case "MONGO":
        //Solo cuando la persistencia sea mongo, conectamos
        const connection = mongoose.connect(config.mongoUrl)
        const {default:ProductsMongo} = await import('./mongo/mongoDAO/products.mongo.js');
        Products = ProductsMongo;
    break;

    case "MEMORY":
        const {default:ProductsMemory} = await import('./fileSystem/product.memory.js');
        Products = ProductsMemory;
    break;
}