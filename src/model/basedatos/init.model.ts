// initModels.ts
import sequelize from './database';
import './models/associations'; // Importa asociaciones para que se apliquen

const initModels = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente.');

        // Sincroniza todos los modelos
        await sequelize.sync({ force: false }); // Usa `force: true` para borrar y crear de nuevo las tablas
        console.log('Modelos sincronizados con la base de datos.');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
};

initModels();
