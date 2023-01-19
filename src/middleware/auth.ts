/* Cette fonction est un middleware permettant de déchiffrer le token 
et extraire l'id du user pour l'ajouter dans req */

import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import * as jwt from 'jsonwebtoken';

/**
 * authentification du mot de passe
 * @param req 
 * @param res 
 * @param next 
 */
export const authenticateJWT = (req: Request, res: Response, next: () => void) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        /**
         * mot de passe crypté
         */
        const token = authHeader.split(' ')[1];
        
        /**
         * vérification du mot de passe donné avec celui enregistré
         */
        jwt.verify(token, process.env.TOKEN_SECRET!, (err: any, token: string | JwtPayload | undefined)=>{
            if (err) {
                return res.sendStatus(403).json({
                    status: "FAILED",
                    message: "Vous ne disposez pas des droits aux accès du contenu"
                });
            }
            req.userId = token;
            next();
        });
    } else {
        res.sendStatus(401).json({
            status: "FAILED",
            message: "Votre mot de passe n'est pas valable"
        });
    };
};