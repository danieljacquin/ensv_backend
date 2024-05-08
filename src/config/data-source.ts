import { DataSource } from "typeorm";
import { envs } from "./envs";
import { Category } from "../model";

export const dataSource = new DataSource({
    type: 'postgres',
    host: envs.host,
    port: envs.db_port,
    username: envs.username,
    password: envs.password,
    database: envs.database,
    entities: ["src/model/**/*.ts"],
    synchronize: true,
    logging: true
});