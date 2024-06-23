export class ExeptionCustomError {
    statusCode: number
    messageError: string
    error: any

    constructor(statusCode: number, messageError: string, error: any){
        this.statusCode = statusCode
        this.messageError = messageError
        this.error = error
    }
}