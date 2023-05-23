import mongoose from "mongoose";

const collection = "Products";
const schema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    thumbnail:[],
    code:String,
    stock:Number,
    status:{
        type:Boolean,
        default:true
    },
    category:String
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);

const productsModel = mongoose.model(collection,schema);

export default productsModel;