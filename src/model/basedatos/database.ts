import { Sequelize } from 'sequelize';
import configVariables from '../../config/config.variables';

const sequelize = new Sequelize(
    configVariables.db.database,
    configVariables.db.username,
    configVariables.db.password,
    {
        host: configVariables.db.host,
        port: configVariables.db.port,
        dialect: 'mysql',
        logging: false, 
    });

export default sequelize;