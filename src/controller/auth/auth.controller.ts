import { Request, Response } from 'express';
import authService from '../../sevice/auth/auth.service';
import Controller from '../../utils/decorators/controller.decorator';
import { Post } from '../../utils/decorators/handlers.decorator';
import { UserValidator } from '../../validators/user.validator';
import { ExeptionCustomError } from '../../model/error/error.model';
import { StatusCode } from '../../model/error/error.enum';

@Controller('/v1/gestion/autenticate')
export default class AuthController {

  @Post('/')
  public async login(req: Request, res: Response) {
    try {

      const body = req.body
      UserValidator.validateRequest(req.body)

      const response = await authService.login(body.usuario, body.pwd)

      res.status(200).json({
        data: response,
        err: null
      }).end()

      return
    } catch (error: any) {
      // error controlado
      if (error instanceof ExeptionCustomError) {
        res.status(error.statusCode).json({
          data: null,
          error: {
            message: error.messageError,
            error: error.error
          }
        })
        return
      }

      // error no controlado
      res.status(StatusCode.INTERNAL_ERROR_CODE).json({
        data: null,
        error: {
          message: error.messageError,
          error: error.error
        }
      })
    }
  }
}


