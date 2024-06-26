import joi from "joi";
import { DescriptionError, StatusCode } from "../model/error/error.enum";
import { ExeptionCustomError } from "../model/error/error.model";
import { StatusProject } from "../model/status.enum";


export class ProjectValidator {

    static validateRequestCreate(data: any): any {

        const schemaProjectCreate = joi.object().keys({
            nombre: joi.string().required(),
            descripcion: joi.string().required()
        })

        const validation = schemaProjectCreate.validate(data)

        if (validation.error) {
            throw new ExeptionCustomError(
                StatusCode.VALIDATOR_ERROR_CODE,
                DescriptionError.VALIDATOR_ERROR,
                validation.error.details
            )
        }

        return validation.value;
    }

    static validateRequestDelete(data: any): any {

        const schemaProjectDelete = joi.object().keys({
            idProyecto: joi.number().required(),
        })

        const validation = schemaProjectDelete.validate(data)

        if (validation.error) {
            throw new ExeptionCustomError(
                StatusCode.VALIDATOR_ERROR_CODE,
                DescriptionError.VALIDATOR_ERROR,
                validation.error.details
            )
        }

        return validation.value;
    }

    static validateRequestUpdate(data: any): any {

        const schemaProjStatusProjectUpdate = joi.object().keys({
            idProyecto: joi.number().required(),
            nombre: joi.string().optional(),
            descripcion: joi.string().optional()
        })

        const validation = schemaProjStatusProjectUpdate.validate(data)

        if (validation.error) {
            throw new ExeptionCustomError(
                StatusCode.VALIDATOR_ERROR_CODE,
                DescriptionError.VALIDATOR_ERROR,
                validation.error.details
            )
        }

        return validation.value;
    }

    static validateRequestUpdateStatus(data: any): any {

        const schemaProjStatusProjectUpdate = joi.object().keys({
            idProyecto: joi.number().required(),
            estado: joi.string().valid(StatusProject.COMPLETE_STATUS)
        })

        const validation = schemaProjStatusProjectUpdate.validate(data)

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