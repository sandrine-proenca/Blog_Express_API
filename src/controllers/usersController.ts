// Les imports
import { Request, Response } from "express";
import { UsersService } from "../services/usersService";
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

/**
 * Appel de la class 'UsersService'
 */
const usersService = new UsersService();

/**
 * Class UsersController qui va identifier toutes les erreurs, vérifier si c'est le bon utilisateur, appeler les fonctions asynchrones 'login' et 'register'
 */
export class UsersController {

    /**
     * fonction asynchrone qui vérifie si le mot de passe correspond au nom de l'utilisateur
     * @param req 
     * @param res 
     * @returns 
     */
    async login(req: Request, res: Response) {

        const { name, password } = req.body;

        // vérifier le nom de l'utilisateur existe
        if (name === undefined || typeof name !== typeof String()) {
            res.status(403).json({
                status: "FAILED.",
                message: "Ce nom est invalide ou inexistant.",
                data: undefined
            });
            //console.log(`${req.method} | ${req.originalUrl} | \nLe nom est invalide ou inexistant`);
            return;

        }
        //vérifier que le mot de passe existe
        if (password === undefined || typeof password !== typeof String()) {
            res.status(403).json({
                status: "FAILED.",
                message: "Ce mot de passe est invalide.",
                data: undefined
            });
            //console.log(`${req.method} | ${req.originalUrl} |  \nLe mot de passe n\'existe pas`);
            return;
        }
        try {
            /**
             * constante user qui appelle la fonction asynchrone 'getUserByName' avec le nom dans la classe 'UsersService'
             */
            const user = await usersService.getUserByName(name);
            if (user) {
                //compare les deux mots de passe
                bcrypt.compare(password, user.password, function (err, result) {
                    const accessToken = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET!);
                    if (result === true) {
                        res.status(200).json({
                            status: "OK.",
                            message: "Nom et mot de passe valides.",
                            data: accessToken
                        });
                        //console.log(`${req.method} | ${req.originalUrl} |  \nNom et Password valides`);
                    }
                    else {
                        res.status(403).json({
                            status: "FAILED.",
                            message: "Le mot de passe est invalide.",
                            data: undefined
                        });
                        //console.log(`${req.method} | ${req.originalUrl} | \nLe password est incorrect`);
                    }
                })
            }
            else
            {
                res.status(403).json({
                    status: "FAILED.",
                    message: "Cet utilisateur existe pas",
                    data: undefined
                });
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

    /**
     *  fonction asynchrone qui enregistre un nouvel utilisateur en utilisant la fonction asynchrone 'getUserByName' dans la classe 'UsersService' pour vérifier que le nom de l'utilisateur n'existe pas déjà puis crypte le mot de passe avec 'hash' et ajoute le nouvel utilisateur dans la table 'users'
     * @param req 
     * @param res 
     * @returns 
     */
    async register(req: Request, res: Response) {
        const password: string = req.body.password;
        const name: string = req.body.name;

        if(!name || !password)
        {
            res.status(400).json({
                status: "FAILED.",
                message: "Erreur de synthaxe, veuillez remplir les champs name et password correctement"
            });

            return;
        }

        /**
         * constante qui vérifie si le nom de l'utilisateur n'existe pas déjà en appelant la fonction asynchrone 'getUserByName' dans la classe 'UsersService'
         */
        const user = await usersService.getUserByName(name);

        if(user){
            res.status(400).json({
                status: "FAILED.",
                message: "Cet utilisateur existe déjà, changez de nom svp."
            });

            return;
        }

        bcrypt.hash(password, 10, async (err: any, hash: string) => {
            
            try {
                /**
                 * constante qui appelle la fonction asynchrone 'addUser' dans la classe 'UsersService'
                 */
                const user = await usersService.addUser(name, hash);
                
                res.status(201).json({
                    status: "OK.",
                    message: `Le nom ${name} et le mot de passe associé ont bien été créés.`,
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