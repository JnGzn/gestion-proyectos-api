// models/Project.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from './database';

class Project extends Model {
    public idproject!: number;
    public nameProject!: string;
    public descriptionProject!: string;
    public status!: string;
}

Project.init({
    idproject: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nameProject: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    descriptionProject: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'project',
    modelName: 'Project',
    timestamps: false, 
});

export default Project;
