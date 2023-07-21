import mongoose from "mongoose";

const collection = "Users";
const schema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    age:Number,
    password:String,
    cart:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Carts'
    },
    rol:{
        type:String,
        default:'user'
    }
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);

const userModel = mongoose.model(collection,schema);

export default userModel;