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

//Comparacion del token, extrayendolo desde los headers
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

//Extractor del token JWT de la cookie
export const cookieExtractor = req => {
    let token = null;
    if(req&&req.cookies){
        token = req.cookies['authToken'] //Tomamos la cookie que nos interese
    }
    return token;
}

//Politicas de autorizaciones
export const handlePolities = policies =>{ //policies va a ser un array que mandemos desde el endpoint. 
    return (req,res,next) =>{
        if(policies[0] === "PUBLIC") return next();
        //Extraemos el token de la cookie
        const token = cookieExtractor(req);
        if(!token) return res.status(401).send({status:"error", error:"Unauthorized"}) //Si no hay token, no estas autorizado
        const obj = jwt.verify(token,config.jwtPrivateKey); //Si hay, verificamos que sea valido
        console.log(obj)

        //Si NO está incluido el rol del usuario.
        if(!policies.includes(obj.user.rol.toUpperCase())) return res.status(403).send({status:"error",error:"Forbidden"}) //Si por ejemplo, user.rol = "USER", y el endpoint es para "ADMIN", no le va a permitir la entrada
        req.user = obj;
        next();
    }
}


//Funcion para genera un codigo unico
export const generateUniqueCode = () =>{
    const datePart = Date.now().toString(36); // Obtener parte de la fecha actual
    const randomPart = Math.random().toString(36); // Obtener parte aleatoria
    return `${datePart}${randomPart}`;
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;