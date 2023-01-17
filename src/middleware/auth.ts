/* Cette fonction est un middleware permettant de déchiffrer le token 
et extraire l'id du user pour l'ajouter dans req */

import { Request, Response } from "express";

const jwt = require('jsonwebtoken');

export const authenticateJWT = (req: Request, res: Response, next: ) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET, (err: any, token: String)=>{
            if (err) {
                return res.sendStatus(403);
            }
            req.userId = token.userId;
            next();
        });
    } else {
        res.sendStatus(401);
    };
};