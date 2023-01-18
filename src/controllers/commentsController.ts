import { Request, Response } from "express";
import { CommentsService } from "../services/commentsService";
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

const commentsService = new CommentsService();

export class CommentsController {

    //récupération de tous les commentaires d'un article:
    async getAllCommentsByArticleId(req: Request, res: Response) {
        //console.log(req.params.articleId)
        const articleId = req.params.articleId
        try {
            // récupération de tous les messages d'un article en appelant le fichier commentsService:
            const comments = await commentsService.getAllCommentsByArticleId(Number(articleId));

            // aucun message existant pour cet article:
            if (comments === undefined) {
                res.status(403).json({
                    status: "FAILED.",
                    message: "Il n'existe aucun message pour cet article.",
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} \nIl n'existe aucun message pour cet article.`);
                return;
            }
            //il existe un ou des messages pour cet article:
            res.status(201).json({
                status: "OK.",
                message: "Un ou des messages existent pour cet article.",
                data: comments
            });
        }
        // message d'erreur serveur
        catch (err) {
            res.status(500).json({
                status: "FAILED.",
                message: "Erreur serveur."
            });
            console.log(err);
        }
    }

    //création d'un commentaire dans un article:
    async postComment(req: Request, res: Response) {
        console.log(req.body)

        const message: string = req.body.message;
        const articleId: number = req.body.articleId;

        // @ts-ignore
        const userId: number = req.userId?.userId!;
console.log(req.userId);

        // Message d'erreur pour absence de commentaire:
        if (message === undefined || typeof message !== typeof String()) {

            res.status(403).json({
                status: "FAILED.",
                message: "Il faut écrire un message, et en format string",
                data: undefined
            });
            console.log(`${req.method} | ${req.originalUrl} |  \nObligation d'avoir un chronicle en format string`);
            return;
        }
        try {
            //créer un nouveau message en appelant le fichier commentsService
            const newMessage = await commentsService.postComment(message, articleId, userId);

            //message de résolution de la requête:
            res.status(201).json({
                status: "OK",
                message: "Votre message a bien été créé",
                data: newMessage
            });
        }

        catch (err) {

            res.status(500).json({
                status: "FAILED.",
                message: "Erreur serveur."
            });
            console.log(err);
        }
    }



    //modification d'un commentaire dans un article:
    async putComment(req: Request, res: Response) {

    }

    //supression d'un commentaire dans un article:
    async deleteComment(req: Request, res: Response) {

    }
}