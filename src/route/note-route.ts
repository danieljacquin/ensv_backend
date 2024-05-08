import { Router } from "express";
import { CategoryService } from "../service/category-service";
import NoteService from "../service/note-service";
import NoteController from "../controller/note-controller";

class NoteRoutes {

    static get routes(): Router {

        const router = Router();

        const categoryService = new CategoryService();
        const noteService = new NoteService(categoryService);
        const controller = new NoteController(noteService);

        router.post('/', controller.create);
        router.get('/', controller.getAll);
        router.get('/:id', controller.findOne);
        router.put('/:id', controller.update);
        router.put('/archiveAndUnarchive/:id', controller.archiveAndUnarchive);
        router.delete('/:id', controller.delete);

        return router;
    }
}

export default NoteRoutes;