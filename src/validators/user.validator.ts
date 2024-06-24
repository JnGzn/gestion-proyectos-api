import joi from "joi";
import { DescriptionError, StatusCode } from "../model/error/error.enum";
import { ExeptionCustomError } from "../model/error/error.model";


export class UserValidator {

    static validateRequest(data: any): any {

        const schemaUserPost = joi.object().keys({
            usuario: joi.string().required(),
            pwd: joi.string().required()
        })

        const validation = schemaUserPost.validate(data)

        if (validation.error) {
            throw new ExeptionCustomError(
                StatusCode.VALIDATOR_ERROR_CODE, 
                DescriptionError.VALIDATOR_ERROR, 
                validation.error.details
            )
        }

        return validation.value;
    }



}