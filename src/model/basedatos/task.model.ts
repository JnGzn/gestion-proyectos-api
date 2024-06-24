// models/Task.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from './database';
import Project from './project.model';
import User from './user.model';

class Task extends Model {
    public idtask!: number;
    public nameTask!: string;
    public descriptionTask!: string;
    public project_idproject!: number;
    public user_iduser!: number;
    public statusT!: string;
}

Task.init({
    idtask: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nameTask: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    descriptionTask: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    project_idproject: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Project,
            key: 'idproject',
        },
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
    },
    user_iduser: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: User,
            key: 'iduser',
        },
    },
    statusT: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'task',
    modelName: 'Task',
    timestamps: false, 
});

export default Task;
