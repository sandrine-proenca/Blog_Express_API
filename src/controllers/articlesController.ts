//IMPORTS
import { Request, Response } from "express";
import { ArticlesService } from "../services/articlesService";

const articlesService = new ArticlesService();

export class ArticlesController
{

    // récupération de tous les articles
    async getAllArticles(req: Request, res: Response)
    {
        try
        {
            // récupération de tous les articles en appelant le fichier articlesService
            const articles = await articlesService.getAllArticles();

            // aucun article existant
            if (articles === undefined)
            {
                res.status(403).json({
                    status: "FAILED",
                    message: "Il n'existe aucun article",
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} \nIl n'existe aucun article`);
                return;
            }
            // message de bonne résolution de la requette
            res.status(201).json({
                status: "OK",
                message: "Les articles existent",
                data: articles
            });
        }
        // message d'erreur serveur
        catch (err)
        {
            res.status(500).json({
                status: "FAILED",
                message: "Erreur serveur"
            });
            console.log(err);
        }
    }

    // récupération d'un article
    async getArticlesById(req: Request, res: Response)
    {

        const articlesId: number = parseInt(req.params.id);
        try
        {            
            // récupération d'un article en appelant le fichier articlesService
            const article = await articlesService.getArticlesById(articlesId);

            // article inexistant
            if (article === undefined)
            {
                res.status(403).json({
                    status: "FAILED",
                    message: "L'article est inexistant",
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} \nL'article est inexistant`);
                return;
            }
            // message de bonne résolution de la requette
            res.status(201).json({
                status: "OK",
                message: "Les articles existent",
                data: article
            });
        }
        // message d'erreur serveur
        catch (err)
        {
            res.status(500).json({
                status: "FAILED",
                message: "Erreur serveur"
            });
            console.log(err);
        };
    };

    //création d'un article
    async postArticles(req: Request, res: Response)
    {
        const chronicle: string = req.body.chronicle;

        // @ts-ignore
        const userId: number = req.userId?.userId!;

        // message d'erreur pour un chronicle inexistant
        if (chronicle === undefined || typeof chronicle !== typeof String())
        {
            res.status(403).json({
                status: "FAILED",
                message: "Obligation d'avoir un chronicle en format string",
                data: undefined
            });
            console.log(`${req.method} | ${req.originalUrl} |  \nObligation d'avoir un chronicle en format string`);
            return;
        }
        try
        {
            // créer un nouvel article en appelant le fichier articlesService
            const article = await articlesService.postArticles(chronicle, userId);

            // message de bonne résolution de la requette
            res.status(201).json({
                status: "OK",
                message: "Le ticket a bien été créé",
                data: article
            });
        }
        // message d'erreur serveur
        catch (err)
        {
            res.status(500).json({
                status: "FAILED",
                message: "Erreur serveur"
            });
            console.log(err);
        };
    };

    // modification de l'article (par le user_id)
    async putArticles(req: Request, res: Response)
    {
        const chronicle: string = req.body.chronicle;
        
        const articleId: number = parseInt(req.params.id);
        // @ts-ignore
        const userId: number = req.userId?.userId!;

        // message d'erreur pour un chronicle inexistant ou qui n'est pas au format string
        
        if (chronicle === undefined || typeof chronicle !== typeof String())
        {
            res.status(403).json({
                status: "FAILED",
                message: "Obligation d'avoir un chronicle en format string",
                data: undefined
            });
            console.log(`${req.method} | ${req.originalUrl} |  \nObligation d'avoir un chronicle en format string`);
            return;
        };
        
        try
        {
            // on récupère l'article demandé et existant avec le user identifié (en appelant le fichier articlesService)
            const checkArticle = await articlesService.getArticlesById(articleId);

            // message d'erreur pour un article existant, mais pas le bon user
            if (checkArticle && checkArticle.user_id !== userId)
            {
                res.status(403).json({
                    status: "FAILED",
                    message: "Le ticket n'est pas à vous",
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} | \nLe ticket n'est pas à vous`);
                return;
            };

            // changer l'article par le user déjà identifié
            const article = await articlesService.putArticles(articleId, chronicle);


            // message d'erreur pour un article non défini
            if (article === undefined)
            {
                res.status(404).json({
                    status: "FAILED",
                    message: "Une erreur est survenue lors de l'édition de l'article",
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} | \nUne erreur est survenue lors de l'édition de l'article`);
                return;
            };

            // message de la bonne résolution de la requette
            res.status(201).json({
                status: "OK",
                message: "L'article a bien été modifié",
                data: checkArticle
            });
            console.log(`${req.method} | ${req.originalUrl} | \nL'article a bien été modifié`);
        }
        // message d'erreur serveur
        catch (err)
        {
            res.status(500).json({
                status: "FAILED",
                message: "Erreur serveur"
            });
        };
    };

    //suppression d'un article
    async deleteArticles(req: Request, res: Response)
    {
        console.log("test deleteArticles", req.body);
        const articleId: number = parseInt(req.params.id);
        // @ts-ignore
        const userId: number = req.userId?.userId!;
        const id = parseInt(req.params.id);
        try
        {
            // on récupère l'article existant avec le bon user en appelant le fichier articlesService
            const checkArticle = await articlesService.getArticlesById(articleId);

            // message d'erreur pour un article existant, mais pas le bon user
            if (checkArticle && checkArticle.user_id !== userId)
            {
                res.status(403).json({
                    status: "FAILED",
                    message: "Le ticket n'est pas à vous",
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} | \nLe ticket n'est pas à vous`);
                return;
            };
            // on supprime l'article existant avec le bon user en appelant le fichier articlesService
            const article = await articlesService.deleteArticles(id);

            // message d'erreur pour un article non défini
            if (article === undefined)
            {
                res.status(403).json({
                    status: "FAILED",
                    message: "Il n'y a aucun article",
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} | \nIl n'y a aucun article`);
                return;
            };
            // message de bonne résolution de la requette
            res.status(201).json({
                status: "OK",
                message: "L'article a été supprimé avec succès",
                data: article
            });
            console.log(`${req.method} | ${req.originalUrl} | \nL'article a été supprimé avec succès`);
        }
        // message d'erreur serveur
        catch (err)
        {
            res.status(500).json({
                status: "FAILED",
                message: "Erreur serveur"
            });
        };
    };
};
