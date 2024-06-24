
import express, { Application as ExApplication, Handler } from 'express';
import { controllers } from './controller/index.controller';
import { MetadataKeys } from './utils/decorators/metadata.keys';
import { IRouter } from './utils/decorators/handlers.decorator';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

const swaggerDocument = yaml.load('./swagger.yaml');


export const exRouter = express.Router();

//npx ts-node-dev src/server.ts
class Application {
  private readonly _instance: ExApplication;
  get instance(): ExApplication {
    return this._instance;
  }
  constructor() {
    this._instance = express();
    this._instance.use(express.json());
    this._instance.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.registerRouters();
  }
  private registerRouters() {
    this._instance.get('/', (req, res) => {
      res.json({ message: 'Hello World!' });
    });
    // TODO: register routers

    const info: Array<{ api: string, handler: string }> = [];

    controllers.forEach((controllerClass) => {
      const controllerInstance: { [handleName: string]: Handler } = new controllerClass() as any;

      const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass);
      const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass);
      const exRouter = express.Router();

      routers.forEach(({ method, path, middleware, handlerName }) => {

        exRouter[method](path, middleware, controllerInstance[String(handlerName)])//.bind(controllerInstance));


        info.push({
          api: `${method?.toLocaleUpperCase()} ${basePath + path}`,
          handler: `${controllerClass.name}.${String(handlerName)}`,
        });
      });

      this._instance.use(basePath, exRouter);
    });

    console.table(info);

  }
}
export default new Application();