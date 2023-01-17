import { Request, Response } from "express";
import { UsersService } from "../services/usersService";
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

const usersService = new UsersService();

export class UsersController {

    async login(req: Request, res: Response) {

        const { name, password } = req.body;

        // vérifier le nom de l'utilisateur existe

        if (name === undefined || typeof name !== typeof String()) {
            res.status(403).json({
                status: "FAILED.",
                message: "Le nom est invalide ou inexistant.",
                data: undefined
            });
            //console.log(`${req.method} | ${req.originalUrl} | \nLe nom est invalide ou inexistant`);
            return;

        }
        //vérifier que le mot de passe existe
        if (password === undefined || typeof password !== typeof String()) {
            res.status(403).json({
                status: "FAILED.",
                message: "Le mot de passe est invalide.",
                data: undefined
            });
            //console.log(`${req.method} | ${req.originalUrl} |  \nLe mot de passe n\'existe pas`);
            return;
        }
        try {
            const user = await usersService.getUserByName(name);
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    const accessToken = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET!);
                    if (result === true) {
                        res.status(201).json({
                            status: "OK.",
                            message: "Nom et mot de passe valides.",
                            data: accessToken
                        });
                        //console.log(`${req.method} | ${req.originalUrl} |  \nNom et Password valides`);
                    }
                    else {
                        res.status(404).json({
                            status: "FAILED.",
                            message: "Le mot de passe est invalide.",
                            data: undefined
                        });
                        //console.log(`${req.method} | ${req.originalUrl} | \nLe password est incorrect`);
                    }
                })
            }
        }
        catch (err) {
            res.status(500).json({
                status: "FAILED.",
                message: "Erreur serveur."
            })
            //console.log(err);
        };
    }

    async register(req: Request, res: Response) {
        const password: string = req.body.password;
        const name: string = req.body.name;

        if(!name || !password)
        {
            res.status(400).json({
                status: "FAILED.",
                message: "Structure incorrecte, le champ name ou password n'existe pas"
            });

            return;
        }

        const user = await usersService.getUserByName(name);

        if(user){
            res.status(403).json({
                status: "FAILED.",
                message: "Cet utilisateur existe déjà, changez de nom."
            });

            return;
        }

        bcrypt.hash(password, 10, async (err: any, hash: string) => {
            
            try {
                const user = await usersService.addUser(name, hash);
                
                res.status(201).json({
                    status: "FAILED.",
                    message: "Le nom: ${name} et son mot de passe associé sont valides.",
                    data: user
                });
                //console.log(`${req.method} | ${req.originalUrl} |  \nLe nom: ${name} et son mot de passe associé sont valides`);
            }
            catch (err) {
                res.status(500).json({
                    status: "FAILED.",
                    message: "Erreur serveur."
                })
                //console.log(err);
            };
        });
    }
}