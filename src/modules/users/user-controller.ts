import { Request, Response } from "express";
import UserService from "./user-service";
import { errorHandler } from "../../config/error-handler";


class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    create = (req: Request, res: Response) => {
        this.userService.create(req.body)
            .then(user => res.status(200).json(user))
            .catch(error => errorHandler(error, res)
            )
    }

    getAll = (req: Request, res: Response) => {
        this.userService.getAll(req.query)
            .then(users => res.status(200).json(users))
            .catch(error => errorHandler(error, res)
            )
    }

    update = (req: Request, res: Response) => {
        this.userService.update({ id: parseInt(req.params.id) }, req.body)
        .then(user => res.status(200).json(user))
        .catch(error => errorHandler(error, res))
    }

    delete = (req: Request, res: Response) => {
        this.userService.delete({ id: parseInt(req.params.id) })
        .then(user => res.status(200).json(user))
        .catch(error => errorHandler(error, res))
    }
}

export default UserController;