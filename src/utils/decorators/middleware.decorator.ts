import { ControllerDecoratorParams } from "../../model/decorator";
import { RequestHandler } from "express";
import 'reflect-metadata';
import { IRouter } from "./handlers.decorator";

const Middlewarex = (middlewares: RequestHandler[]) => {
    return (target_: any): MethodDecorator => {
        return (target, propertyKey) => {
            const controllerClass = target.constructor;
            const routers: IRouter[] =   Reflect.hasMetadata(ControllerDecoratorParams.Middleware, controllerClass) ?
        Reflect.getMetadata(ControllerDecoratorParams.Middleware, controllerClass) : [];
            Reflect.defineMetadata(ControllerDecoratorParams.Middleware, middlewares, target);

        }
    };
  }
  export default Middlewarex;

// export function Middleware(middlewares: RequestHandler[]): Function {
//     return (target: any, propertyKey: string): void  =>{
//         console.log("🚀 ~ returnfunction ~ target:", target)
//         // Reflect.defineMetadata(ControllerDecoratorParams.Middleware, 
//         //     middlewares, 
//         //     target, 
//         //     propertyKey
//         // );
//     }
// }

