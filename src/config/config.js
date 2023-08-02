import dotenv from 'dotenv';

dotenv.config();

export default {
    port:process.env.PORT,
    mongoUrl:process.env.MONGO_URL,
    adminName:process.env.ADMIN_NAME,
    adminPassword:process.env.ADMIN_PASS,
    jwtPrivateKey:process.env.JWT_PRIVATE_KEY,
    persistance: process.env.PERSISTANCE,
    typeLog: process.env.TYPE_LOG
}