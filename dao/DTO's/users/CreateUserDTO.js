export default class CreateUserDTO {
    constructor(user, hashPass){
        this.first_name = user.first_name,
        this.last_name = user.last_name,
        this.email = user.email,
        this.password = hashPass,
        this.age = user.age,
        this.cart = user.cart
    }
}