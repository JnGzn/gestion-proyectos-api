
import configVariables from '../../config/config.variables';
import mysql, { Pool } from 'mysql2/promise';

class DatabaseConnection {
  //private static instance: DatabaseConnection;
  private pool: Pool;

  public get connection(): Pool {
    return this.pool;
  }
  constructor() {
    this.pool = mysql.createPool({
      host: configVariables.db.host,
      port: configVariables.db.port,
      user: configVariables.db.username,
      password: configVariables.db.password,
      database: configVariables.db.database
    });
  }

  getInstance(): Pool {
    return this.pool;
  }

  public async query<T>(sql: string, params: any[] = []): Promise<T> {
    const [results] = await this.pool.execute(sql, params);
    return results as T;
  }

  public async close(): Promise<void> {
    await this.pool.end();
  }
}


export default DatabaseConnection;
