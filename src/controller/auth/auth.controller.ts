import { Request, Response } from 'express';
import authService from '../../sevice/auth.service';
import Controller from '../../utils/decorators/controller.decorator';
import { Get, Post } from '../../utils/decorators/handlers.decorator';

@Controller('/v1/gestion/autenticate')
export default class AuthController {

  @Post('/')
  public async login(req: Request, res: Response) {
    // console.log("🚀 ~ AuthController ~ login ~ req:", res)
    try {
      
      const body = req.body
      console.log("🚀 ~ AuthController ~ login ~ user:", body)
    
      const response = await authService.login(body.user, body.pwd)

      res.status(200).json({
        data: response,
        err: null
    }).end()

      return 
    } catch (error: any) {
      res.status(401).json({ error: error.message });
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
