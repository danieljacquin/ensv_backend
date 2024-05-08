import "reflect-metadata";
import { Server } from './server';
import { AppRoutes } from "./route/routes";
import { envs } from "./config/envs";

(() => {
    main();
})();

function main(){
   new Server(envs.port!, AppRoutes.routes).start();
}

