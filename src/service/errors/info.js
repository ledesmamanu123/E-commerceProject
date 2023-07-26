export const generateProductErrorInfo = (product) =>{
    return `Una o más propiedades estaban incompletas o no validas. 
    Lista de propiedades requeridas: 
    * title : necesita ser un string, se recibió: ${product.title}
    * description : necesita ser un string, se recibió: ${product.description}
    * price : necesita ser un string, se recibió: ${product.price}
    * code : necesita ser un string, se recibió: ${product.code}
    * stock : necesita ser un string, se recibió: ${product.stock}
    * category : necesita ser un string, se recibió: ${product.category}`
}