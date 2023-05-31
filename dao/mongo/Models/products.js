import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
schema.plugin(mongoosePaginate)
const productsModel = mongoose.model(collection,schema);

export default productsModel;