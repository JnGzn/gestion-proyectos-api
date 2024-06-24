// import jwtUtils from '../utils/jwtUtils';
import { sign, verify, JwtPayload } from 'jsonwebtoken';
import configVariables from '../../config/config.variables';
import { PersistenceService } from '../persistence/persistence.service';
import { ExeptionCustomError } from '../../model/error/error.model';
import { DescriptionError, StatusCode } from '../../model/error/error.enum';
import { iUser } from '../../model/user.model';
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


    validateToken(token: string): string {
        try {
            const jwtData: any = verify(token, this.sign)
            return jwtData.user.role
        } catch (error) {
            throw new ExeptionCustomError(
                StatusCode.TOKEN_INVALID_ERROR_CODE,
                DescriptionError.TOKEN_INVALID_ERROR,
                "Invalid access"
            )
        }

    }

    async login(username: string, password: string): Promise<any> {
        const result = await this.persistenceService.authUser(username, password)


        const userResponse: iUser = {
            id: result.id,
            role: result.role,
        }

        const token = this.generateToken({ user: userResponse });

        return { token };

    }
}

export default new AuthService();