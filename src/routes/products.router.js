import { Router } from "express";
import ProductsManager from "../../dao/mongo/Managers/productsManager.js";
import productsModel from "../../dao/mongo/Models/products.js";
const productService = new ProductsManager();

const router = Router();

//METODOS GET
router.get('/',async (req,res)=>{
    const {page=1, limit =10} = req.query;
    const paginates = await productsModel.paginate({},{page, limit, lean:true})
    const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages, ...rest} = paginates;
    const products = docs;
    let prevLink =null;
    let nextLink =null;
    if(hasPrevPage){prevLink=`/?page=${prevPage}`}
    if(hasNextPage){nextLink=`/?page=${nextPage}`}
    if(limit<0){
        return res.status(400).send({status:"error", message:"Invalid limit"});
    }
    res.send({
        status:'Success',
        payload:products,
        totalPages:totalPages,
        prevPage:prevPage,
        nextPage:nextPage,
        page:rest.page,
        hasPrevPage:hasPrevPage,
        hasNextPage:hasNextPage,
        prevLink:prevLink,
        nextLink:nextLink,

    })
    // const query = Object.keys(req.query)[0];
    // const queryValue = Object.values(req.query)[0];
    // const products = await productService.getProducts();

    // if(query != 'limit'){
    //     res.send(products)
    // } else if(queryValue > 0){
    //     const productsLimited = products.slice(0,queryValue)
    //     res.send(productsLimited);
    // } else{return res.status(400).send({status:"error", message:"Invalid limit"})}
})

router.get('/:pid', async (req,res)=>{
    const {pid} = req.params;
    const product = await productService.getProductsBy({_id:pid});
    if(!product) return res.status(404).send({status:"Error", error: "Product not found"})
    res.send({status:"Success", payload:product});
})



//METODOS POST
router.post('/', async (req, res)=>{
    const products = await productService.getProducts();
    const {title, description, price, thumbnail, code, stock, status, category} = req.body;
    if(products.find(product => product.code === code)) return res.status(400).send({status:"error", error:"Product already existed"})
    if(!title||!description||!price||!code||!stock||!category) return res.status(400).send({status:"error", error:"Incompleted values"})
    const product = {
        title, 
        description, 
        price, 
        thumbnail:thumbnail || [], 
        code, 
        stock,
        status,
        category
    }
    //Mandamos nuestro nuevo producto
    const result = await productService.createProduct(product)
    res.status(201).send({status:"Success", message:"Product was created successfuly"})
})

//METODOS PUT
router.put('/:pid', async (req,res)=>{
    try {
        const {pid} = req.params;
        const updatedFields = req.body;
        const result = await productService.updateProduct(pid, updatedFields);
        res.send({status:"Success Updated"})
    } catch (error) {
        console.log(error)
    }
})

//METODO DELETE
router.delete('/:pid', async (req,res)=>{
    const {pid} = req.params;
    await productService.deleteProduct(pid)
    res.send({status:"Success Deleted"})
})

export default router