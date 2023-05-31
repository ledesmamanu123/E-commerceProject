import mongoose from "mongoose";

const collection = "Carts";
const schema = new mongoose.Schema({
    products:{
        type:[
            {
                product:{
                    type:mongoose.SchemaTypes.ObjectId,
                    ref:'Products'
                },
                quantity:{
                    type:Number,
                    default: 1
                }
            }
        ],
        default:[]
    }
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

schema.pre('find', function (){
    this.populate('products.product')
})
const cartsModel = mongoose.model(collection,schema);

export default cartsModel;