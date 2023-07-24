export default class ProductRepository {
    constructor(dao){
        //Recibimos el dao a utilizar
        this.dao = dao;
    }
    //La intencion de este repository es solo mandar a llamar los metodos del dao
    getProducts = async() =>{
        
    }
}