import { Router } from "express";
import { CategoryController } from "../controller/category-controller";
import { CategoryService } from "../service/category-service";

export class CategoryRoutes {
    static get routes(): Router {
        const router = Router();

        const categoryService = new CategoryService();
        const controller = new CategoryController(categoryService);

        router.post('/', controller.create);
        router.get('/', controller.getAll);
        router.get('/:id', controller.findOne);
        router.put('/:id', controller.update);
        router.delete('/:id', controller.delete);

        return router;
    }
}