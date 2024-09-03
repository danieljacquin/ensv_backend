import { Router } from "express";

import AuthService from "../modules/auth/auth-service";
import { DtoTypeEnum } from "../enum/dtoType.enum";
import { validationMiddleware } from "../middlewares/validation.middleware";
import UserService from "../modules/users/user-service";
import AuthController from "../modules/auth/auth-controller";
import { AuthRequest } from "../modules/auth/dto";

class AuthRoutes{

    static get routes(): Router{
        const router = Router();

        const userService = new UserService();
        const authService = new AuthService(userService);
        const controller = new AuthController(authService);

        router.post('/login', validationMiddleware(AuthRequest, DtoTypeEnum.BODY), controller.login);
        return router;
    }
}

export default AuthRoutes;