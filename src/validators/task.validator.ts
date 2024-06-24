import joi from "joi";
import { DescriptionError, StatusCode } from "../model/error/error.enum";
import { ExeptionCustomError } from "../model/error/error.model";
import { StatusTask } from "../model/status.enum";


export class TaskValidator {

    static validateRequestCreate(data: any): any {

        const schemaTaskCreate = joi.object().keys({
            nombre: joi.string().optional(),
            descripcion: joi.string().optional(),
            idProyecto: joi.number().required()
        })

        const validation = schemaTaskCreate.validate(data)

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

        const schemaTaskDelete = joi.object().keys({
            idTarea: joi.number().required(),
        })

        const validation = schemaTaskDelete.validate(data)

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

        const schemaTaskUpdate = joi.object().keys({
            idTarea: joi.number().required(),
            nombre: joi.string().optional(),
            descripcion: joi.string().optional(),
            idUsuarioAsignado: joi.number().optional()
        })

        const validation = schemaTaskUpdate.validate(data)

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

        const schemaProjStatusTaskUpdate = joi.object().keys({
            idTarea: joi.number().required(),
            estado: joi.string().valid(StatusTask.COMPLETE_STATUS)
        })

        const validation = schemaProjStatusTaskUpdate.validate(data)

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