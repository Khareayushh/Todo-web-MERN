import jwt from 'jsonwebtoken';
export const SECRET = 'SECr3t';
import { Request, Response, NextFunction } from "express";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        jwt.verify(token, SECRET, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!payload) {
                return res.sendStatus(403);
            }
            if (typeof payload === "string") {
                return res.sendStatus(403);
            }

            req.headers["userId"] = payload.id;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}