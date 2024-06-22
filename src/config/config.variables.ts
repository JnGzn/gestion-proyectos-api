
import dotenv from 'dotenv';
import { Config } from '../model/iconfig';

dotenv.config();


const configVariables: Config = {
    port: process.env.PORT || "3000",
    jwtSignSecret: process.env.JWT_SECRET || "firma",
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        database: process.env.DB_NAME || 'db',
        username: process.env.DB_USER || 'user',
        password: process.env.DB_PASSWORD || 'pwd'
    }
}

export default configVariables