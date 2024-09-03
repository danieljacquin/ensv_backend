import { Request, Response } from "express";
import AuthService from "./auth-service";
import { errorHandler } from "../../config/error-handler";



class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

     login = (req: Request, res: Response) => {
        this.authService.login(req.body)
        .then(user => res.status(200).json(user))
        .catch(error => errorHandler(error, res))
    }
}

export default AuthController;