import { dataSource } from "./data-source";


export class Database {

    static async connect() {

        try {

            await dataSource.initialize();
            console.log("database initialized");
            return true;

        } catch (error) {
            console.log(error)
        }

    }
}