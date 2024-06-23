import { StatsFs } from 'fs';
import { DescriptionError, StatusCode } from '../../model/error/error.enum';
import { ExeptionCustomError } from '../../model/error/error.model';
import { iProject } from '../../model/project.model';
import { PersistenceService } from '../persistence/persistence.service';
import { StatusProject } from '../../model/status.enum';
import { any } from 'joi';

class ProjectService {

    private persistenceService: PersistenceService;

    // Constructor Clase ServiceTodo
    constructor() {
        this.persistenceService = new PersistenceService()
    }

    async createProject(project: iProject): Promise<any> {
        const result: any = await this.persistenceService.executeInsertStoreProcedure('CALL create_project(?,?,?)', [project.nombre, project.descripcion, project.estado])
        console.log("🚀 ~ ProjectService ~ createProject ~ result:", result.affectedRows)

        if (!result.affectedRows) {
            throw new ExeptionCustomError(
                StatusCode.NO_CREATE_ERROR_CODE,
                DescriptionError.NO_CREATE_ERROR,
                null
            )
        }

        return project
    }

    async deleteProject(project: iProject): Promise<any> {
        console.log("🚀 ~ ProjectService ~ createProject ~ project:", project)
        const result: any = await this.persistenceService.executeInsertStoreProcedure('CALL delete_project(?)', [project.id])
        console.log("🚀 ~ ProjectService ~ createProject ~ result:", result.affectedRows)

        if (!result.affectedRows) {
            throw new ExeptionCustomError(
                StatusCode.NO_DELETE_ERROR_CODE,
                DescriptionError.NO_DELETE_ERROR,
                null
            )
        }

        return project
    }

    async getProjects(): Promise<any> {
        try {
            const { result } = await this.persistenceService.executeQueryStoreProcedure('call list_projects();', [])

            if (!result) {
                return;
            }

            // usuario no encontrado
            if (!result || result.length == 0) {
                throw new ExeptionCustomError(
                    StatusCode.LOGGIN_ERROR_CODE,
                    DescriptionError.LOGGIN_ERROR,
                    "Invalid access"
                )
            }

            const projectResponse: any = {

            }
            result.forEach((el: any) => {
                if (!projectResponse[el.idproject]) {
                    projectResponse[el.idproject] = {}

                    projectResponse[el.idproject].idproject = el.idproject
                    projectResponse[el.idproject].nameProject = el.nameProject
                    projectResponse[el.idproject].descriptionProject = el.descriptionProject
                    projectResponse[el.idproject].status = el.status
                    projectResponse[el.idproject].tareas = []

                }
                if (el.idtask) {

                    projectResponse[el.idproject].tareas.push({
                        id: el.idtask,
                        nombre: el.nameTask,
                        descripcion: el.descriptionTask,
                        estado: el.statusT,
                    })
                }
            });




            return { projects: Object.values(projectResponse) };
        } catch (error) {

        }

    }

    async updateProject(project: iProject): Promise<any> {
        console.log("🚀 ~ ProjectService ~ updateProject ~ project:", project)
        // Si se va acompletar validar tareas deben estar completas
        if (project.estado === StatusProject.COMPLETE_STATUS) {

            const { result }: any = await this.persistenceService.executeQueryStoreProcedure(
                'CALL list_task_no_complete(?, ?)',
                [project.id, project.estado])
            console.log("🚀 ~ ProjectService ~ updateProject ~ result:", result[0])

            if (!result[0] || result[0].pendientes > 0) {
                throw new ExeptionCustomError(
                    StatusCode.NO_UPDATE_TASK_PENDING_ERROR_CODE,
                    DescriptionError.NO_UPDATE_TASK_PENDING_ERROR,
                    null
                )
            }

        }


        const result: any = await this.persistenceService.executeInsertStoreProcedure(
            'CALL update_project(?, ?, ?, ?)',
            [project.id, project.nombre, project.descripcion, project.estado])

        console.log("🚀 ~ ProjectService ~ createProject ~ result:", result.affectedRows)

        if (!result.affectedRows) {
            throw new ExeptionCustomError(
                StatusCode.NO_DELETE_ERROR_CODE,
                DescriptionError.NO_DELETE_ERROR,
                null
            )
        }

        return project
    }
}

export default new ProjectService();