import { Request, Response } from "express";
import { CommentsService } from "../services/commentsService";

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
                    message: "Il n'existe aucun commentaire pour cet article.",
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} \nIl n'existe aucun commentaire pour cet article.`);
                return;
            }
            //il existe un ou des messages pour cet article:
            res.status(201).json({
                status: "OK.",
                message: "Un ou des commentaires existent pour cet article.",
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
    async postComment(req: Request, res: Response){
        console.log(req.body)

        const message: string = req.body.message;
        const articlesId: number = req.body.article_id;

        // @ts-ignore
        const userId: number = req.userId?.userId!;
        console.log(req.userId);

        // Message d'erreur pour absence de commentaire:
        if (message === undefined || typeof message !== typeof String()) {

            res.status(403).json({
                status: "FAILED.",
                message: "Il faut écrire un commentaire, et au format string",
                data: undefined
            });
            console.log(`${req.method} | ${req.originalUrl} |  \nObligation d'avoir un commentaire au format string`);
            return;
        }
        try 
        {
            //créer un nouveau message en appelant le fichier commentsService
            const newMessage = await commentsService.postComment(message, articlesId, userId);

            //message de résolution de la requête:
            res.status(201).json({
                status: "OK",
                message: "Votre commentaire a bien été créé",
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
        const newMessage: string = req.body.newMessage;
        const commentId: number = parseInt(req.params.id);
        const userId: number = req.body.userId;

        if (!newMessage || !commentId) {

            res.status(403).json({
                status: "FAILED.",
                message: "Valeurs manquantes",
                data: undefined
            });
            console.log(`${req.method} | ${req.originalUrl} |  \nObligation d'écrire un commentaire ou d'avoir l'id du commentaire`);
            return;
        }
        try {
            //récupération du message demandé et existant avec le commentId:
            const checkComment = await commentsService.getCommentById(commentId);

            // verifier que ce comment.user_id === req.body.userId
            if (checkComment && checkComment.user_id !== userId) {
                res.status(404).json(
                    {
                        status: "FAILED.",
                        message: "Modification non-autorisée"
                    }
                )

                return;
            }

            //le message est bien modifié:
            const comment = await commentsService.putComment(commentId, newMessage)
            if (comment) {
                res.status(201).json(
                    {
                        status: "OK.",
                        message: "Votre commentaire a bien été modifié.",
                        data: comment
                    }
                )
            }
        }
        catch (err: any) {
            console.log(err);

            res.status(500).json(
                {
                    status: "FAILED",
                    message: "Erreur serveur."
                }
            )
        }
    }

    //supression d'un commentaire dans un article:
    async deleteComment(req: Request, res: Response)
    {
        console.log("test deleteComment", req.body);
        const commentId: number = parseInt(req.params.id);
        
        // @ts-ignore
        const userId: number = req.userId?.userId!;

        try
        {
        //récupérer le commentaire existant avec son id en appelant le fichier commentsService:
            const checkComment = await commentsService.getCommentById(commentId);

            //message d'erreur pour un commentaire inexistant ou sans le bon user:
            if (checkComment === undefined || checkComment.user_id !== userId)
            {
                res.status(403).json({
                    status: "FAILED.",
                    message: "Ce commentaire ne vous appartient pas.",
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} | \nLe ticket n'est pas à vous`);
                return;
            };
            //supprime le commentaire existant avec le bon user en appelant le fichier commentsService
            const comment = await commentsService.deleteCommentById(commentId);

            //message de bonne supression du commentaire:
            res.status(201).json({
                status: "OK.",
                message: "Votre commentaire a été supprimé avec succès.",
                data: comment
            });
            console.log(`${req.method} | ${req.originalUrl} | \nVotre commentaire a été supprimé avec succès.`);
        }
        // message d'erreur serveur:
        catch (err)
        {
            res.status(500).json({
                status: "FAILED.",
                message: "Erreur serveur."
            });
        };
    };
};