/* Cette fonction est un middleware permettant de déchiffrer le token 
et extraire l'id du user pour l'ajouter dans req */

import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import * as jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: () => void) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET!, (err: any, token: string | JwtPayload | undefined)=>{
            if (err) {
                return res.sendStatus(403);
            }
            req.userId = token;
            next();
        });
    } else {
        res.sendStatus(401);
    };
};