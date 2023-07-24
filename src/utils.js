import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './config/config.js';


//Creamos el hash para la password
//hashSync toma la contraseña que le pasemos y aplica el proceso de hasheo a partir de un "Salt"
//genSaltSync crea una salt de 10 caracteres.
//Este proceso devuelve un string ramdom que genera el hashSync, es IRREVERSIBLE
export const createHash = (password)=> bcrypt.hashSync(password,bcrypt.genSaltSync(10));

//isValidPassword valida si el password del user es el mismo que el hash del servidor
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword)



//CREACIÓN Y COMPARACIÓN DEL TOKEN
export const generateToken = (user) =>{
    const token = jwt.sign({user},config.jwtPrivateKey,{expiresIn:'24h'})
    return token;
}
export const authToken = (req,res,next) =>{
    const authHeader = req.headers.authorization; //el token nos deberia llevar mediante los headers
    if(!authHeader) return res.status(401).send({status:"error", error:"Not Autheticated"}).redirect('/register');
    const token = authHeader.split(' ')[1]; //Split para retirar la palabra bearer
    jwt.verify(token,config.jwtPrivateKey,(error,credencials)=>{
        //jwt.verify verifica que el token sea valido, y se fija que no este alterado, expirado, etc
        if(error) return res.status(403).send({status:'Forbidden', error:"Not Authorized"})
        //Si todo esta bien, desciframos el token y devolvemos el user
        req.user = credencials.user;
        next();
    })
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;