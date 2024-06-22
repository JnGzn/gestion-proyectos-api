import { Request, Response } from 'express';
import authService from '../../sevice/auth.service';
import Controller from '../../utils/decorators/controller.decorator';
import { Get, Post } from '../../utils/decorators/handlers.decorator';
import { UserValidator } from '../../validators/user.validator';
import { ExeptionCustomError } from '../../model/error.model';
import { StatusCode } from '../../model/error.enum';

@Controller('/v1/gestion/autenticate')
export default class AuthController {

  @Post('/')
  public async login(req: Request, res: Response) {
    // console.log("🚀 ~ AuthController ~ login ~ req:", res)
    try {

      const body = req.body
      UserValidator.validateRequest(req.body)
      console.log("🚀 ~ AuthController ~ login ~ user:", body)



      const response = await authService.login(body.user, body.pwd)

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



// @Controller('/cats')
// export default class CatController {
//   private cats: Array<{ name: string }> = [
//     { name: 'Tom' },
//     { name: 'Kitty' },
//   ];
//   @Get('')
//   public index(req: Request, res: Response): void {
//     res.json({ cats: this.cats });
//   }
//   @Post('')
//   public add(req: Request, res: Response): void {
//     this.cats.push(req.body);
//     res.status(204).json();
//   }
//   @Get('/:name')
//   public findByName(req: Request, res: Response): unknown {
//     const { name } = req.params;
//     const foundCat = this.cats.find((c) => c.name === name);
//     if (foundCat) {
//       return res.json({ cat: foundCat });
//     }
//     return res.status(404).json({ message: 'Cat not found!' });
//   }
// }

