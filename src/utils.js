import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

//Creamos el hash para la password
//hashSync toma la contraseña que le pasemos y aplica el proceso de hasheo a partir de un "Salt"
//genSaltSync crea una salt de 10 caracteres.
//Este proceso devuelve un string ramdom que genera el hashSync, es IRREVERSIBLE
export const createHash = (password)=> bcrypt.hashSync(password,bcrypt.genSaltSync(10));

//isValidPassword valida si el password del user es el mismo que el hash del servidor
export const isValidPassword = (user,password) => bcrypt.compareSync(password, user.password)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;