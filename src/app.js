import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import config from './config/config.js';
import __dirname, { attachLogger, generateProducts } from './utils.js';
import initializePassport from './config/passport.config.js';

import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import UsersRouter from './routes/users.router.js';


const app = express();
const PORT = config.port||8080;
const server = app.listen(PORT,()=>{console.log(`ExpServer is listening in port ${PORT}`)})
const connection = mongoose.connect(config.mongoUrl)

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser());
app.use(attachLogger)

//Inicializamos las estrategias de passport
initializePassport();

//Seteo Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

//Routes
app.use('/',viewsRouter);
app.use('/api/users',UsersRouter);
app.use('/api/products',ProductsRouter);
app.use('/api/carts',CartsRouter);

//Route de mocking de producto
app.get('/mockingproducts',(req,res)=>{
    let productsInMemory = [];
    for (let i = 0; i < 50; i++) {
        productsInMemory.push(generateProducts())      
    }
    res.send({status:"Success",payload:productsInMemory})
})

