import { RequestHandler } from 'express';
import { MetadataKeys } from './metadata.keys';
import 'reflect-metadata';

export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}
export interface IRouter {
  method: Methods;
  path: string;
  middleware: RequestHandler[];
  handlerName?: string | symbol;
}
const methodDecoratorFactory = (method: Methods) => {

  return (path: string, middlewareP: RequestHandler[] = []): MethodDecorator => {

    return (target, propertyKey) => {
      const controllerClass = target.constructor;
      const routers: IRouter[] = Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass) ?
        Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass) : [];
      routers.push({
        method,
        path,
        middleware: middlewareP,
        handlerName: propertyKey,
      });

      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
    }
  }
}

export const Get = methodDecoratorFactory(Methods.GET);
export const Post = methodDecoratorFactory(Methods.POST);
export const Put = methodDecoratorFactory(Methods.PUT);
export const Delete = methodDecoratorFactory(Methods.DELETE);

