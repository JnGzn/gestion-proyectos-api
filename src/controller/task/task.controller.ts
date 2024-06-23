import { Request, Response } from 'express';
import taskService from '../../sevice/task/task.service';
import Controller from '../../utils/decorators/controller.decorator';
import { Delete, Get, Post, Put } from '../../utils/decorators/handlers.decorator';
import { ExeptionCustomError } from '../../model/error/error.model';
import { TaskValidator } from '../../validators/task.validator';
import { iProject } from '../../model/project.model';
import { StatusCode } from '../../model/error/error.enum';
import { StatusTask } from '../../model/status.enum';
import { iTask } from '../../model/task.model';

@Controller('/v1/gestion/task')
export default class TaskController {

  @Post('/')
  public async createTask(req: Request, res: Response) {
    try {

      const body = req.body
      TaskValidator.validateRequestCreate(req.body)

      const task: iTask = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        estado: StatusTask.INITIAL_STATUS,
        idUsuarioAsignado: body.idUsuarioAsignado,
        idProyecto: body.idProyecto
      }

      const response = await taskService.createTask(task)

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

  @Put('/')
  public async updateProject(req: Request, res: Response) {
    try {

      const body = req.body
      TaskValidator.validateRequestUpdate(req.body)

      const task: iTask = {
        id: body.idTarea,
        nombre: body.nombre,
        descripcion: body.descripcion,
        estado: body.estado,
        idUsuarioAsignado: body.idUsuarioAsignado
      }

      const response = await taskService.updateTask(task)

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

  @Delete('/')
  public async deleteProject(req: Request, res: Response) {
    try {

      const body = req.body
      TaskValidator.validateRequestDelete(req.body)

      const task: iTask = {
        id: body.idTarea
      }

      const response = await taskService.deleteTask(task)

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

