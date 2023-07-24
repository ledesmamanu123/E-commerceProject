import passport from "passport";
import local from "passport-local";
import UsersManager from "../../dao/mongo/Managers/usersManager.js";
import config from "./config.js";
import { isValidPassword, createHash, generateToken } from "../utils.js";
import CreateUserDTO from "../../dao/DTO's/users/CreateUserDTO.js";
import SessionUserDTO from "../../dao/DTO's/users/SessionUserDTO.js";

const usersService = new UsersManager();
//Declaramos nuestra estatregia local
const LocalStrategy = local.Strategy;

//Passport usará sus propios "middlewares" (por asi decirlo), de acuerdo a cada estrategia
const initializePassport = ()=>{
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

                const result = await usersService.createUser(user);
                done(null, result)
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
                    let user = {
                      id: 0,
                      name: `Admin`,
                      role: 'admin',
                      email: '...',
                    }
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