import authService from "../auth.service";
import { PersistenceService } from "../persistence/persistence.service";

class UserService {

    persistenceService: PersistenceService;

    // Constructor Clase ServiceTodo
    constructor() {
        this.persistenceService = new PersistenceService()
    }

    /**
     *  Valida usuario
     *  Retorna reporte de humanos/mutantes/ratio
     */
    async validateUser(user: string, pwd: string): Promise<any> {
        try {
            // lamado a persistencia
            const result = await this.persistenceService.validateCredential(user, pwd)

            if(!result){
                return
            }

            const token = {} //authService.login(result)
            console.log("🚀 ~ UserService ~ validateUser ~ result:", result)

            return result
        } catch (error) {
            console.debug(`MutanteService:isMutant :Error ${JSON.stringify(error)}`)
            throw new Error('Internal_server_error')
        }
    }

}

export default new UserService()