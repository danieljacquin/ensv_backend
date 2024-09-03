import { Router } from "express";
import { CategoryRoutes } from "./category-route";
import NoteRoutes from "./note-route";
import UserRoutes from "./user.route";
import AuthRoutes from "./auth-route";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/category", CategoryRoutes.routes);
    router.use("/api/note", NoteRoutes.routes);
    router.use("/api/user", UserRoutes.routes);
    router.use("/api/auth", AuthRoutes.routes);

    return router;
  }
}
