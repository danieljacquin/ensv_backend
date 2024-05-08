import { Router } from "express";
import { CategoryRoutes } from "./category-route";
import NoteRoutes from "./note-route";

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/category', CategoryRoutes.routes);
        router.use('/api/note', NoteRoutes.routes);

        return router;
    }

}