import joi from "joi";
import { DescriptionError, StatusCode } from "../model/error.enum";
import { ExeptionCustomError } from "../model/error.model";

// define esquema producto POST

export class UserValidator {

    static validateRequest(data: any): any {

        const schemaUserPost = joi.object().keys({
            user: joi.string().email().required(),
            pwd: joi.string().required()
        })

        const validation = schemaUserPost.validate(data)

        if (validation.error) {
            console.log("🚀 ~ UserValidator ~ validateRequest ~ error:", validation.error)
            throw new ExeptionCustomError(
                StatusCode.VALIDATOR_ERROR_CODE, 
                DescriptionError.VALIDATOR_ERROR_CODE, 
                validation.error.details
            )
        }

        return validation.value;
    }

}