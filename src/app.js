import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

//Routes
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true})) //Objetos codificados desde URL
app.use(express.static(`${__dirname}/public`)) //Con esta linea, podemos acceder siempre a imagenes, etc.

//Setear el motor de plantillas
app.engine('handlebars', handlebars.engine())

//Apuntamos a la carpeta donde van a estar mis vistas
app.set('views', `${__dirname}/views`)

//Setear el motor que va a estar aputando a las views (esto porque hay varios motores)
app.set('view engine', 'handlebars')


app.use('/', viewsRouter)
app.use('/api/products', ProductsRouter);
app.use('/api/carts', CartsRouter);

app.listen(8080,()=>{console.log('ExpServer is listening in port 8080')})
