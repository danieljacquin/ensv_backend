import { NextFunction, Request, Response } from "express";

import { Jwt } from "../config/jwt";


export class AuthMiddleware{

 static async validateJwt(req: Request, res: Response, next: NextFunction){
    const authorization = req.header('Authorization');
    if(!authorization) return res.status(401).json({error: 'no token privided'});
    if(!authorization.startsWith('Bearer')) return res.status(401).json({error: 'invalied Bearer token'});

    const token = authorization.split(' ').at(1) || '';

    try {

    const payload = await Jwt.validateToken<{id: number, name: string}>(token);
    if(!payload) return res.status(401).json({error: 'invalid token'});

    //const user = await this.userService.findById(payload.id);
    //if(!user) return res.status(401).json({error: 'Invalid token - user not found'});

        req.body.id = payload.id;

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'internal server error'});
    }
 }


}