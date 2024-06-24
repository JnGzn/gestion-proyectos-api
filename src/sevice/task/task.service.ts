import { DescriptionError, StatusCode } from '../../model/error/error.enum';
import { ExeptionCustomError } from '../../model/error/error.model';
import { iProject } from '../../model/project.model';
import { iTask } from '../../model/task.model';
import { PersistenceService } from '../persistence/persistence.service';

class TaskService {

    private persistenceService: PersistenceService;

    // Constructor Clase ServiceTodo
    constructor() {
        this.persistenceService = new PersistenceService()
    }

    async createTask(task: iTask): Promise<any> {
        const result: any = await this.persistenceService.createTask(task)
        return result
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