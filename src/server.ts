
import application from './index';
import * as http from 'http';
import 'reflect-metadata';
import configVariables from './config/config.variables';

const PORT = configVariables.port;
const server = http.createServer(application.instance);
server.listen(PORT, () => {
  console.log(`Server is listening on :${PORT}`);
});