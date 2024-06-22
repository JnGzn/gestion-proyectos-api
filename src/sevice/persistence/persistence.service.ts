import { DescriptionError, StatusCode } from "../../model/error.enum";
import { ExeptionCustomError } from "../../model/error.model";
import { iUser } from "../../model/user.model";
import DatabaseConnection from "./DatabaseConnection";

export class PersistenceService extends DatabaseConnection { 

    /**
     * Inserta el registro a la base de datos
     */
    async validateCredential(user: string, pwd: string): Promise<iUser> {

        try {
           
            const[ [result]]: any[] = await this.getInstance().query('call validate_user(?, ?);',[user, pwd])
            
            // usuario no encontrado
            if(!result || result.length == 0) {
                throw new ExeptionCustomError(
                    StatusCode.LOGGIN_ERROR_CODE, 
                    DescriptionError.LOGGIN_ERROR_CODE, 
                    "Invalid access"
                )
            }

            const userResponse: iUser = {
                name: result[0].name,
                email: result[0].email,
                role: result[0].role
            }
            console.log("🚀 ~ PersistenceService ~ validateCredential ~ userResponse:", JSON.stringify(userResponse))
            return userResponse
        } catch (error) {
            console.debug(error);
            throw error
        }
    }


}