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
        const result: any = await this.persistenceService.executeInsertStoreProcedure('CALL create_task(?,?,?, ?, ?)', [task.nombre, task.descripcion, task.estado, task.idProyecto, task.idUsuarioAsignado])

        if(!result.affectedRows) {
            throw new ExeptionCustomError(
                StatusCode.NO_CREATE_ERROR_CODE,
                DescriptionError.NO_CREATE_ERROR,
                null
            )
        }

        return task
    }

    async updateTask(task: iTask): Promise<any> {
        console.log("🚀 ~ ProjectService ~ createProject ~ TASK:", task)
        const result: any = await this.persistenceService.executeInsertStoreProcedure(
            'CALL update_task(?, ?, ?, ?, ?)', 
            [task.id, task.nombre, task.descripcion, task.estado, task.idUsuarioAsignado])
            
        console.log("🚀 ~ ProjectService ~ createProject ~ result:", result.affectedRows)

        if(!result.affectedRows) {
            throw new ExeptionCustomError(
                StatusCode.NO_DELETE_ERROR_CODE,
                DescriptionError.NO_DELETE_ERROR,
                null
            )
        }

        return task
    }

    async deleteTask(task: iTask): Promise<any> {
        console.log("🚀 ~ ProjectService ~ createProject ~ TASK:", task)
        const result: any = await this.persistenceService.executeInsertStoreProcedure('CALL delete_task(?)', [task.id])
        console.log("🚀 ~ ProjectService ~ createProject ~ result:", result.affectedRows)

        if(!result.affectedRows) {
            throw new ExeptionCustomError(
                StatusCode.NO_DELETE_ERROR_CODE,
                DescriptionError.NO_DELETE_ERROR,
                null
            )
        }

        return task
    }

}

export default new TaskService();