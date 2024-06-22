export interface Config {
    port: string;
    jwtSignSecret: string;
    db: {
        host: string;
        port: number;
        database: string;
        username: string;
        password: string;
    };

}