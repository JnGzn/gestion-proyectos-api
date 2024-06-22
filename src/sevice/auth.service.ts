// import jwtUtils from '../utils/jwtUtils';
import  { sign, verify, JwtPayload } from 'jsonwebtoken';
import configVariables from '../config/config.variables';
import { PersistenceService } from './persistence/persistence.service';
class AuthService {

    private sign = configVariables.jwtSignSecret;
    private persistenceService: PersistenceService;

    // Constructor Clase ServiceTodo
    constructor() {
        this.persistenceService = new PersistenceService()
    }


    private generateToken(payload: any): string {
        return sign(payload, this.sign, { expiresIn: '10m' }); 
    }

    private verifyToken(token: string): JwtPayload | string {
        return verify(token, this.sign)
    }

    async login(username: string, password: string): Promise<any> {
        const result = await this.persistenceService.validateCredential(username, password)

        if(!result) {
            return;
        }
        
        const token = this.generateToken({user: result});

        return {token};
    }
}

export default new AuthService();