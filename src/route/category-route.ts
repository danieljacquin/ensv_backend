import { Router } from "express";
import { CategoryController } from "../modules/categories/category-controller";
import { CategoryService } from "../modules/categories/category-service";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { DtoTypeEnum } from "../enum/dtoType.enum";
import { CreateCategoryRequest, FindOneCategoryRequest, UpdateCategoryRequest } from "../modules/categories/dto/request";

export class CategoryRoutes {
    static get routes(): Router {
        const router = Router();

        const categoryService = new CategoryService();
        const controller = new CategoryController(categoryService);

        router.post('/', validationMiddleware(CreateCategoryRequest, DtoTypeEnum.BODY), controller.create);
        router.get('/', controller.getAll);
        router.get('/:id',validationMiddleware(FindOneCategoryRequest, DtoTypeEnum.PARAMS), controller.findOne);
        router.put('/:id',[
            validationMiddleware(FindOneCategoryRequest, DtoTypeEnum.PARAMS),
            validationMiddleware(UpdateCategoryRequest, DtoTypeEnum.BODY),
        ], controller.update);
        router.delete('/:id',validationMiddleware(FindOneCategoryRequest, DtoTypeEnum.PARAMS), controller.delete);

        return router;
    }
}