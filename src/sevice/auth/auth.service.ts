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

    verifyToken(token: string): JwtPayload | string {
        try {

            return verify(token, this.sign)
        } catch (error) {
            console.log("🚀 ~ AuthService ~ verifyToken ~ error:", error)

        }
        return "no valida"
    }

    async login(username: string, password: string): Promise<any> {
        try {
            const { result } = await this.persistenceService.executeQueryStoreProcedure('call validate_user(?, ?);', [username, password])

            if (!result) {
                return;
            }

            // usuario no encontrado
            if (!result || result.length == 0) {
                throw new ExeptionCustomError(
                    StatusCode.LOGGIN_ERROR_CODE,
                    DescriptionError.LOGGIN_ERROR,
                    "Invalid access"
                )
            }

            const userResponse: iUser = {
                name: result[0].name,
                email: result[0].email,
                role: result[0].role
            }


            const token = this.generateToken({ user: result });

            return { token };
        } catch (error) {

        }

    }
}

export default new AuthService();