import { NextFunction, Request, Response } from "express";

import { Jwt } from "../config/jwt";
import UserService from "../modules/users/user-service";

export class AuthMiddleware {
  static validateJwt(userService: UserService) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const authorization = req.header("Authorization");

      if (!authorization)
        return res.status(401).json({ error: "no token privided" });
      if (!authorization.startsWith("Bearer"))
        return res.status(401).json({ error: "invalied Bearer token" });

      const token = authorization.split(" ").at(1) || "";

      try {
        const payload = await Jwt.validateToken<{ id: number }>(token);
        if (!payload) return res.status(401).json({ error: "invalid token" });

        const user = await userService.findOne({ id: payload.id });
        /*if (!user)
          return res
            .status(401)
            .json({ error: "Invalid token - user not found" });*/
        req.user = {
          userId: user.id
        }

        next();
      } catch (error) {
        res.status(500).json({ error: "internal server error" });
      }
    };
  }
}
