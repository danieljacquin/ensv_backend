import express, { Router, json } from "express";
import cors from "cors";
import { Database } from "./config/database";
import { handle404 } from "./config/error-handler";

export class Server {
  public app = express();
  private port: string;
  private routes: Router;

  constructor(port: string, routes: Router) {
    this.port = port;
    this.routes = routes;
  }

  async start() {
    //start database
    const isInitialized = await Database.connect();

    if (isInitialized) {
      //start node server
      this.app.use(json()); //Middleware to parse JSON bodies
      this.app.use(cors());
      this.app.use(this.routes);

      this.app.use(handle404);

      this.app.listen(this.port, () =>
        console.log(`server running port ${this.port}`)
      );
    }
  }
}
