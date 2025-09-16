import { Router } from "express";
import NoteController from "../modules/notes/note-controller";
import { CategoryService } from "../modules/categories/category-service";
import NoteService from "../modules/notes/note-service";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { DtoTypeEnum } from "../enum/dtoType.enum";
import {
  CreateNoteRequest,
  FindOneNoteRequest,
  FindUserFromTokenRequest,
  PaginationOptionsRequest,
  UpdateNoteRequest,
} from "../modules/notes/dto/request";
import UserService from "../modules/users/user-service";
import { AuthMiddleware } from "../middlewares/auth.middleware";

class NoteRoutes {
  static get routes(): Router {
    const router = Router();

    const categoryService = new CategoryService();
    const userService = new UserService();
    const noteService = new NoteService(categoryService, userService);
    const controller = new NoteController(noteService);

    router.post(
      "/",
      [
        AuthMiddleware.validateJwt(userService),
        validationMiddleware(CreateNoteRequest, DtoTypeEnum.BODY),
      ],
      controller.create
    );
    router.get(
      "/",
      [
        AuthMiddleware.validateJwt(userService),
        validationMiddleware(PaginationOptionsRequest, DtoTypeEnum.QUERY),
      ],
      controller.getAll
    );
    router.get(
      "/:id",
      [
        AuthMiddleware.validateJwt(userService),
        validationMiddleware(FindOneNoteRequest, DtoTypeEnum.PARAMS),
      ],
      controller.findOne
    );
    router.put(
      "/",
      [
        AuthMiddleware.validateJwt(userService),
        validationMiddleware(FindUserFromTokenRequest, DtoTypeEnum.BODY),
        validationMiddleware(UpdateNoteRequest, DtoTypeEnum.BODY),
      ],
      controller.update
    );
    router.put(
      "/archiveAndUnarchive/:id",
      [
        AuthMiddleware.validateJwt(userService),
        validationMiddleware(FindOneNoteRequest, DtoTypeEnum.PARAMS),
      ],
      controller.archiveAndUnarchive
    );
    router.delete(
      "/:id",
      [
        AuthMiddleware.validateJwt(userService),
        validationMiddleware(FindOneNoteRequest, DtoTypeEnum.PARAMS),
      ],
      controller.delete
    );

    return router;
  }
}

export default NoteRoutes;
