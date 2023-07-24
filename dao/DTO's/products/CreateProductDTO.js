export default class CreateProductDTO {
    constructor(product){
        this.title = product.title,
        this.description = product.description || 'Sin descripción',
        this.price = product.price,
        this.thumbnail = product.thumbnail || [],
        this.code = product.code, 
        this.stock = product.stock,
        this.status = product.status,
        this.category = product.category
    }
}