
import DatabaseConnection from "./databaseConnection";
import sequelize from '../../model/basedatos/database';
import { Project, Task, User } from '../../model/basedatos/relation.model';
import { iProject } from "../../model/project.model";
import { Op } from "sequelize";
import { StatusTask } from "../../model/status.enum";
import { iTask } from "../../model/task.model";

export class PersistenceService extends DatabaseConnection {

    async queryExample() {
        const result = await Project.findAll()
    }

    async createProject(projectParam: iProject) {
        try {
            const project = await Project.create({
                nameProject: projectParam.nombre,
                descriptionProject: projectParam.descripcion,
                status: projectParam.estado,
            });
            return project
        } catch (error) {
            console.error('Error creating project:', error);
        }
    }

    async deleteProject(projectParam: iProject) {
        try {
            const result = await Project.destroy({
                where: {
                    idproject: projectParam.id,
                },
            });

            return result
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    async updateProject(projectParam: iProject) {
        try {
            const result = await Project.update({
                nameProject: projectParam.nombre,
                descriptionProject: projectParam.descripcion,
                status: projectParam.estado,
            }, {
                where: {
                    idproject: projectParam.id,
                },
            });

            return result
        } catch (error) {
            console.error('Error updating project:', error);
        }
    }


    async countPendingTasks(projectParm: iProject): Promise<number> {
        try {
            const pendingCount = await Task.count({
                where: {
                    project_idproject: projectParm.id,
                    statusT: {
                        [Op.ne]: StatusTask.COMPLETE_STATUS
                    },
                },
            });

            return pendingCount;
        } catch (error) {
            console.error('Error counting pending tasks:', error);
            throw error;
        }
    }


    async createTask(taskParam: iTask) {
        try {
            const task = await Task.create({
                nameTask: taskParam.nombre,
                descriptionTask: taskParam.descripcion,
                statusT: taskParam.estado,
                project_idproject: taskParam.idProyecto,
            });

            return task
        } catch (error) {
            throw error
        }
    }

    async updateTask(taskParm: iTask) {
        try {
            const result = await Task.update({
                nameTask: taskParm.nombre,
                descriptionTask: taskParm.descripcion,
                statusT: taskParm.estado,
                user_iduser: taskParm.idUsuarioAsignado,
            }, {
                where: {
                    idtask: taskParm.id,
                },
            });

            return result
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    async deleteTask(projectParam: iTask) {
        try {
            const result = await Task.destroy({
                where: {
                    idtask: projectParam.id,
                },
            });

            return result
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    async getAllProjects(): Promise<any[]> {
        try {
            const projectTaskData = await Project.findAll({
                attributes: ['idproject', 'nameProject', 'descriptionProject', 'status'],
                include: {
                    model: Task,
                    attributes: ['idtask', 'nameTask', 'descriptionTask', 'statusT'],
                    required: false, // LEFT JOIN
                    as: 'tasks', // Alias para la asociación
                },
            });

            const taskOnlyData = await Task.findAll({
                attributes: ['idtask', 'nameTask', 'descriptionTask', 'statusT'],
                include: {
                    model: Project,
                    attributes: ['idproject', 'nameProject', 'descriptionProject', 'status'],
                    required: false, // RIGHT JOIN
                    as: 'project', // Alias para la asociación
                },
                where: {
                    project_idproject: null, // WHERE project_idproject IS NULL
                },
            });

            // Concatenar resultados de LEFT JOIN y RIGHT JOIN
            const unionResult = [...projectTaskData, ...taskOnlyData];

            return unionResult;
        } catch (error) {
            throw error;
        }
    }

    async authUser(userName: string, pwd: string): Promise<any | null> {
        try {
            const user = await User.findOne({
                attributes: [
                    ['iduser', 'id'], // Alias para iduser como id
                    'username',
                    'role',
                ],
                where: {
                    username: sequelize.where(sequelize.fn('LOWER', sequelize.col('username')), userName.toLowerCase()),
                    pwd: pwd,
                },
            });

            return user ? user.toJSON() : null; // Convertir el resultado a JSON si se encuentra el usuario
        } catch (error) {
            console.error('Error searching for user:', error);
            throw error;
        }
    }


}