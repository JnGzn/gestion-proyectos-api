export enum StatusCode {
    VALIDATOR_ERROR_CODE = 422,
    LOGGIN_ERROR_CODE = 403,
    TOKEN_INVALID_ERROR_CODE = 403,
    INTERNAL_ERROR_CODE = 500,
    NO_CREATE_ERROR_CODE = 500,
    NO_UPDATE_TASK_PENDING_ERROR_CODE = 500,
    NO_UPDATE_PROJECT_CODE = 500,
    NO_UPDATE_TASK_CODE = 500,
    NO_DELETE_ERROR_CODE = 500
}
export enum DescriptionError {
    VALIDATOR_ERROR = "Error en la estructura de la peticion",
    NO_CREATE_ERROR = "El elemento no puedo ser creado",
    NO_DELETE_ERROR = "El elemento no puedo ser eliminado",
    TOKEN_INVALID_ERROR = "Error en la autorizacion",
    NO_UPDATE_TASK_PENDING_ERROR = "El elemento no puedo ser actualizado, existen actividades no completadas",
    NO_UPDATE_PROJECT = "El Proyecto no pudo ser actualizado",
    NO_UPDATE_TASK = "La Tareaa no pudo ser actualizada",
    LOGGIN_ERROR = "Usuario o contraseña incorrecta"
}
