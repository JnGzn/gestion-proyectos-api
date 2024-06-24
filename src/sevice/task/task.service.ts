import { DescriptionError, StatusCode } from '../../model/error/error.enum';
import { ExeptionCustomError } from '../../model/error/error.model';
import { iTask } from '../../model/task.model';
import { PersistenceService } from '../persistence/persistence.service';

class TaskService {

    private persistenceService: PersistenceService;

    constructor() {
        this.persistenceService = new PersistenceService()
    }

    async createTask(task: iTask): Promise<any> {
        const result: any = await this.persistenceService.createTask(task)

        const resultData: iTask = {
            id: result.idtask,
            nombre: result.nameTask,
            descripcion: result.descriptionTask,
            estado: result.statusT,
            idProyecto: result.project_idproject
        }
        return { task: resultData }
    }

    async updateTask(task: iTask): Promise<any> {
        const [result]: any = await this.persistenceService.updateTask(task)

        if (!result) {
            throw new ExeptionCustomError(
                StatusCode.NO_UPDATE_TASK_CODE,
                DescriptionError.NO_UPDATE_TASK,
                null
            )
        }
        return task
    }

    async deleteTask(task: iTask): Promise<any> {
        await this.persistenceService.deleteTask(task)

        return task
    }

}

export default new TaskService();