import { Router } from "express";
import NoteController from "../modules/notes/note-controller";
import { CategoryService } from "../modules/categories/category-service";
import NoteService from "../modules/notes/note-service";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { DtoTypeEnum } from "../enum/dtoType.enum";
import {
  CreateNoteRequest,
  FindOneNoteRequest,
  PaginationOptionsRequest,
  UpdateNoteRequest,
} from "../modules/notes/dto/request";
import UserService from "../modules/users/user-service";

class NoteRoutes {
  static get routes(): Router {
    const router = Router();

    const categoryService = new CategoryService();
    const userService = new UserService();
    const noteService = new NoteService(categoryService, userService);
    const controller = new NoteController(noteService);

    router.post(
      "/",
      validationMiddleware(CreateNoteRequest, DtoTypeEnum.BODY),
      controller.create
    );
    router.get("/", validationMiddleware(PaginationOptionsRequest, DtoTypeEnum.PARAMS), controller.getAll);
    router.get(
      "/:id",
      validationMiddleware(FindOneNoteRequest, DtoTypeEnum.PARAMS),
      controller.findOne
    );
    router.put(
      "/:id",
      [
        validationMiddleware(FindOneNoteRequest, DtoTypeEnum.PARAMS),
        validationMiddleware(UpdateNoteRequest, DtoTypeEnum.BODY),
      ],
      controller.update
    );
    router.put(
      "/archiveAndUnarchive/:id",
      validationMiddleware(FindOneNoteRequest, DtoTypeEnum.PARAMS),
      controller.archiveAndUnarchive
    );
    router.delete(
      "/:id",
      validationMiddleware(FindOneNoteRequest, DtoTypeEnum.PARAMS),
      controller.delete
    );

    return router;
  }
}

export default NoteRoutes;
