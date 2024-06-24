import { NextFunction, Request, Response } from 'express';
import projectService from '../../sevice/project/project.service';
import Controller from '../../utils/decorators/controller.decorator';
import { Delete, Get, Post, Put } from '../../utils/decorators/handlers.decorator';
import { ExeptionCustomError } from '../../model/error/error.model';
import { ProjectValidator } from '../../validators/project.validator';
import { iProject } from '../../model/project.model';
import { StatusCode } from '../../model/error/error.enum';
import { StatusProject } from '../../model/status.enum';
import { isOperator, validateToken } from '../../middleware/isAdmin.middleware';

@Controller('/v1/gestion/project')
export default class ProjectController {

  @Post('/', [validateToken])
  public async createProject(req: Request, res: Response) {
    try {

      const body = req.body
      ProjectValidator.validateRequestCreate(req.body)

      const project: iProject = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        estado: StatusProject.INITIAL_STATUS
      }

      const response = await projectService.createProject(project)

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

  @Put('/complete', [isOperator])
  public async updateProjectComplete(req: Request, res: Response) {
    try {

      const body = req.body
      ProjectValidator.validateRequestUpdateStatus(req.body)

      const project: iProject = {
        id: body.idProyecto,
        estado: body.estado
      }

      const response = await projectService.updateProjectComplete(project)

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

  @Delete('/', [validateToken])
  public async deleteProject(req: Request, res: Response) {
    try {

      const body = req.body
      ProjectValidator.validateRequestDelete(req.body)

      const project: iProject = {
        id: body.idProyecto
      }

      const response = await projectService.deleteProject(project)

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

  @Put('/', [validateToken])
  public async updateProject(req: Request, res: Response) {
    try {

      const body = req.body
      ProjectValidator.validateRequestUpdate(req.body)

      const Project: iProject = {
        id: body.idProyecto,
        nombre: body.nombre,
        descripcion: body.descripcion,
        estado: body.estado,
      }

      const response = await projectService.updateProject(Project)

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

  @Get('/', [validateToken])
  //@Middleware([isAdmin])
  public async getProjects(req: Request, res: Response) {
    try {

      const response = await projectService.getProjects()

      res.status(200).json({
        data: response,
        err: null
      }).end()

      return
    } catch (error: any) {
      console.log("🚀 ~ ProjectController ~ getProjects ~ error:", error)
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

