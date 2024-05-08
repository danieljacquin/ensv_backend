import { NextFunction, Request, Response } from "express";
import { CustomError } from "../error/custom-error";


export const errorHandler = (error: unknown, res: Response) => {
    if(error instanceof CustomError){
        return res.status(error.statusCode).json({error: error.message});
    }

    return res.status(500).json({error: 'internal server error'});
}

export const handle404 = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Page not found');
}
