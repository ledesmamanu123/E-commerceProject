import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';

import __dirname from './utils.js';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import sessionRouter from './routes/sessions.router.js';

const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>{console.log(`ExpServer is listening in port ${PORT}`)})
const connection = mongoose.connect('mongodb+srv://ledesma_manu_:QsZvAD66IkiMkiHA@clusteronlytolearn.q6a1iy7.mongodb.net/ecommerce?retryWrites=true&w=majority')


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(`${__dirname}/public`))

//Seteo Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

//Middleware Sessions
app.use(session({
    store: new MongoStore({
        mongoUrl:'mongodb+srv://ledesma_manu_:QsZvAD66IkiMkiHA@clusteronlytolearn.q6a1iy7.mongodb.net/ecommerce?retryWrites=true&w=majority'
    }),
    secret:'G4M3N4T1ON',
    resave:false,
    saveUninitialized:false
}))

//Routes
app.use('/', viewsRouter)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/session', sessionRouter)

