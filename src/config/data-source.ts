import { DataSource } from "typeorm";
import { envs } from "./envs";

// Determine the environment and set the entities path
const isDevelopment = envs.node_env !== 'production';
const entitiesPath = isDevelopment ? "src/model/**/*.ts" : "dist/model/**/*.js";

export const dataSource = new DataSource({
    type: 'postgres',
    host: envs.host,
    port: envs.db_port,
    username: envs.username,
    password: envs.password,
    database: envs.database,
    entities: [entitiesPath],
    synchronize: isDevelopment,
    logging: isDevelopment
});