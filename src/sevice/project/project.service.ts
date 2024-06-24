import { DescriptionError, StatusCode } from '../../model/error/error.enum';
import { ExeptionCustomError } from '../../model/error/error.model';
import { iProject } from '../../model/project.model';
import { PersistenceService } from '../persistence/persistence.service';


class ProjectService {

    private persistenceService: PersistenceService;

    // Constructor Clase ServiceTodo
    constructor() {
        this.persistenceService = new PersistenceService()
    }

    async createProject(project: iProject): Promise<any> {
        const result: any = await this.persistenceService.createProject(project)

        const resultData: iProject = {
            id: result.idproject,
            nombre: result.nameProject,
            descripcion: result.descriptionProject,
            estado: result.status,
        }
        return { project: resultData }
    }

    async deleteProject(project: iProject): Promise<any> {
        await this.persistenceService.deleteProject(project)

        return project
    }

    async getProjects(): Promise<any> {
        const result = await this.persistenceService.getAllProjects()


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

    }

    async updateProject(project: iProject): Promise<any> {

        const [result]: any = await this.persistenceService.updateProject(project)


        if (!result) {
            throw new ExeptionCustomError(
                StatusCode.NO_UPDATE_PROJECT_CODE,
                DescriptionError.NO_UPDATE_PROJECT,
                null
            )
        }
        return project
    }
    async updateProjectComplete(projectParm: iProject): Promise<any> {
        const pending: any = await this.persistenceService.countPendingTasks(projectParm)
        if (pending > 0) {
            throw new ExeptionCustomError(
                StatusCode.NO_UPDATE_TASK_PENDING_ERROR_CODE,
                DescriptionError.NO_UPDATE_TASK_PENDING_ERROR,
                null
            )
        }

        return await this.updateProject(projectParm)
    }
}

export default new ProjectService();