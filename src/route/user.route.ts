import { Router } from "express";

import { validationMiddleware } from "../middlewares/validation.middleware";
import UserController from "../modules/users/user-controller";
import { DtoTypeEnum } from "../enum/dtoType.enum";
import UserService from "../modules/users/user-service";
import {
  CreateUserRequest,
  FindOneUserRequest,
  PaginationOptionsRequest,
  UpdateUserRequest,
} from "../modules/users";
import { AuthMiddleware } from "../middlewares/auth.middleware";

class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const controller = new UserController(userService);

    router.post(
      "/",
      validationMiddleware(CreateUserRequest, DtoTypeEnum.BODY),
      controller.create
    );
    router.get(
      "/",
      [
        //AuthMiddleware.validateJwt(userService),
        validationMiddleware(PaginationOptionsRequest, DtoTypeEnum.QUERY),
      ],
      controller.getAll
    );
    router.put(
      "/:id",
      [
        validationMiddleware(FindOneUserRequest, DtoTypeEnum.PARAMS),
        validationMiddleware(UpdateUserRequest, DtoTypeEnum.BODY),
      ],
      controller.update
    );
    router.delete(
      "/:id",
      validationMiddleware(FindOneUserRequest, DtoTypeEnum.PARAMS),
      controller.delete
    );
    return router;
  }
}

export default UserRoutes;
