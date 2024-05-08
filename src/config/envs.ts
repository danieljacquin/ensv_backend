import * as envVar from 'env-var';
import * as dotenv from 'dotenv';
dotenv.config();

export const envs = {
    port: envVar.get('PORT').asString(),
    type: envVar.get('TYPE').default('postgres'),
    host: envVar.get('LOCALHOST').asString(),
    db_port: envVar.get('DB_PORT').asPortNumber(),
    username: envVar.get('USER_NAME').asString(),
    password: envVar.get('PASSWORD').asString(),
    database: envVar.get('DATABASE').asString(),
}