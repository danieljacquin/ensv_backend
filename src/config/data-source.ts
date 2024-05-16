import { DataSource } from "typeorm";
import { envs } from "./envs";

import * as path from 'path';

// Determine the environment and set the entities path
const isDevelopment = envs.node_env !== 'production';

const entitiesPath = path.join(__dirname, '..', isDevelopment ? "model/**/*.ts" : "model/**/*.js");
const migrationsPath = path.join(__dirname, '..', isDevelopment ? "migrations/**/*.ts" : "migrations/**/*.js");

export const dataSource = new DataSource({
    type: 'postgres',
    host: envs.host,
    port: envs.db_port,
    username: envs.username,
    password: envs.password,
    database: envs.database,
    entities: [entitiesPath],
    migrations: [migrationsPath],
    synchronize: isDevelopment,
    logging: isDevelopment
});