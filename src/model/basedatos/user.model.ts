// models/User.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from './database';

class User extends Model {
    public iduser!: number;
    public username!: string;
    public name!: string;
    public role!: string;
    public pwd!: string;
}

User.init({
    iduser: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(45),
        allowNull: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
    pwd: {
        type: DataTypes.STRING(45),
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'user',
    modelName: 'User',
    timestamps: false, 
});

export default User;
