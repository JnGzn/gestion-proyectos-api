// initModels.ts
import sequelize from './database';
import './models/associations'; // Importa asociaciones para que se apliquen

const initModels = async () => {
    try {
        await sequelize.authenticate();

        await sequelize.sync({ force: false }); 
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        throw error
    }
};

initModels();
