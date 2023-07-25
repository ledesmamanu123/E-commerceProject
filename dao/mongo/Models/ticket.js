import mongoose from "mongoose";
import { generateUniqueCode } from "../../../src/utils.js";

const collection = "Tickets";
const schema = new mongoose.Schema({
    code:{
        type:String,
        require:true,
        unique:true
    },
    amount:Number,
    purchaser:String,
    purchase_datetime:{
        type:Date,
        default:Date.now
    }
})
schema.pre('save', function (next){ //Ejecutamos la funcion antes de que se guarde el ticket
    if(!this.code) { //Verificamos que no haya un codigo ya creado
        this.code = generateUniqueCode();
    }
    next();
})

const ticketsModel = mongoose.model(collection,schema);

export default ticketsModel;