import passport from "passport";
import jwt from 'passport-jwt';
import local from "passport-local";

import config from "./config.js";

import UsersManager from "../../dao/mongo/Managers/usersManager.js";
import CreateUserDTO from "../../dao/DTO's/users/CreateUserDTO.js";
import SessionUserDTO from "../../dao/DTO's/users/SessionUserDTO.js";
import { isValidPassword, createHash, cookieExtractor } from "../utils.js";

const usersService = new UsersManager();

const LocalStrategy = local.Strategy; //core de nuestras estrategias locales
const JWTStrategy = jwt.Strategy; //core de la estrategia de jwt
const ExtractorJWT = jwt.ExtractJwt;

//Passport usará sus propios "middlewares" (por asi decirlo), de acuerdo a cada estrategia
const initializePassport = ()=>{
    //Estrategia de JWT
    passport.use('jwt', new JWTStrategy(
        //Configuracion de jwt
        {
            jwtFromRequest:ExtractorJWT.fromExtractors([cookieExtractor]),
            secretOrKey:config.jwtPrivateKey//Misma key que cuando creamos el token
        },async(jwt_payload,done)=>{
            try {
                console.log("User de JWT")
                console.log(jwt_payload)
                return done(null,jwt_payload) //jwt_payload es el user
            } catch (error) {
                return done(error)
            }
        }
        ))

    //Estrategias LOCALES
    passport.use('register', new LocalStrategy(
        //Primero configuramos las opciones de nuestra estrategia local
        {
            passReqToCallback:true, //permite que podamos acceder al objeto req
            usernameField:'email' //vamos a usar nuestro email como si fuera el campo de username
        }, async(req,email,password,done)=>{
            console.log('Registrando')
            try {
                const users = await usersService.getUsers();
                const {first_name, last_name, age, cart} = req.body;

                //Verificamos que el usuario no exista
                if(users.find(user => user.email === email)) return done(null,false,{message:"Email already existed"});

                //Verificamos que esten todos los campos completos
                if(!email||!first_name||!last_name||!age||!password||!cart) return done(null,false,{message:"Incompleted Values"});

                //Hasheamos la pass
                const hashPassword = createHash(password);

                //Creamos al user llamando al UserDTO
                const user = new CreateUserDTO({first_name, last_name, age, cart, email},hashPassword)

                done(null, user)
            } catch (error) {
                done(error);
            }
            
        }
    ))

    passport.use('login', new LocalStrategy(
        {
            usernameField:'email'
        }, async(email,password,done)=>{
            try {
                //Admin
                if (email === config.adminName && password === config.adminPassword) {
                    //Desde aquí ya puedo inicializar al admin.
                    const user = new SessionUserDTO({id:0, first_name:"Admin",last_name:"",rol:'admin',email:'...'})
                    return done(null, user);
                }

                //Usuarios
                let user = await usersService.getUsersBy({email}); //Verificamos el mail exista
                if(!user) return done(null, false, { message: 'Invalid credentials' });

                //Validamos la contraseña
                const validatePassword = await isValidPassword(password, user.password);
                if (!validatePassword) return done(null, false, { message: 'Invalid Password' });

                //Creamos el usuario para la session
                const newUser = new SessionUserDTO(user)
                console.log("User de login: ")
                console.log(newUser)
                done(null, newUser);
            } catch (error) {
                return(error)
            }
        }
        
    ))

    // //Serealizacion necesaria de passport usando sessions
    // passport.serializeUser((user,done)=>{
    //     done(null,user._id)
    // });
    // passport.deserializeUser(async(id,done)=>{
    //     let user = await usersService.getUsersBy({_id:id})
    //     done(null,user);
    // })

}

export default initializePassport;