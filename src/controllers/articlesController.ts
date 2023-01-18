//IMPORTS
import { Request, Response } from "express";
import { title } from "process";
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
                message: "Erreur serveur",
                data: undefined
            });
            console.log(err);
        }
    }

    // récupération d'un article
    async getArticlesById(req: Request, res: Response)
    {

        const articlesId: number = parseInt(req.params.id);

        // message d'erreur pour id différent d'un nombre
        if (Number.isNaN(Number(articlesId)))
        {
            res.status(400).json({
                status: "FAILED",
                message: "La requête incomprise par le serveur / syntaxe incorrecte.",
                data: undefined
            });
        };

        try
        {
            // récupération d'un article en appelant le fichier articlesService
            const articles = await articlesService.getArticlesById(articlesId);

            // article inexistant
            if (articles === undefined)
            {
                res.status(404).json({
                    status: "FAILED",
                    message: "L'article est inexistant",
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} \nL'article est inexistant`);
                return;
            };
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
                message: "Erreur serveur",
                data: undefined
            });
            console.log(err);
        };
    };

    //création d'un article
    async postArticles(req: Request, res: Response)
    {
        const title: string = req.body.title;
        const chronicle: string = req.body.chronicle;

        // @ts-ignore
        const userId: number = req.userId?.userId!;

        // message d'erreur pour un titre inexistant
        if (title === undefined || typeof title !== typeof String())
        {
            res.status(403).json({
                status: "FAILED",
                message: "Obligation d'avoir un titre en format string",
                data: undefined
            });
            console.log(`${req.method} | ${req.originalUrl} |  \nObligation d'avoir un titre en format string`);
            return;
        }

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
            const articles = await articlesService.postArticles(title, chronicle, userId);

            // message de bonne résolution de la requette
            res.status(201).json({
                status: "OK",
                message: "Le ticket a bien été créé",
                data: articles
            });
        }
        // message d'erreur serveur
        catch (err)
        {
            res.status(500).json({
                status: "FAILED",
                message: "Erreur serveur",
                data: undefined
            });
            console.log(err);
        };
    };

    // modification de l'article (par le user_id)
    async putArticles(req: Request, res: Response)
    {
        const title: string = req.body.title;

        const chronicle: string = req.body.chronicle;

        const articlesId: number = parseInt(req.body.id);
        // @ts-ignore
        const userId: number = req.userId?.userId!;


        // message d'erreur pour id demandé différent d'un nombre
        if (Number.isNaN(Number(articlesId)))
        {
            res.status(400).json({
                status: "FAILED",
                message: "La requête incomprise par le serveur / syntaxe incorrecte.",
                data: undefined
            });
        };

        // message d'erreur pour un titre inexistant ou qui n'est pas au format string
        if (title === undefined || typeof title !== typeof String())
        {
            res.status(403).json({
                status: "FAILED",
                message: "Obligation d'avoir un titre en format string",
                data: undefined
            });
            console.log(`${req.method} | ${req.originalUrl} |  \nObligation d'avoir un titre en format string`);
            return;
        };


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
            const checkArticle = await articlesService.getArticlesById(articlesId);

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
            const articles = await articlesService.putArticles(articlesId, title, chronicle);

            // message d'erreur pour un article non défini
            if (articles === undefined)
            {
                res.status(404).json({
                    status: "FAILED",
                    message: "article inexistant",
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
        const articlesId: number = parseInt(req.params.id);
        console.log(articlesId);
        
        // @ts-ignore
        const userId: number = req.userId?.userId!;
        console.log(articlesId);
        
        // message d'erreur pour id demandé différent d'un nombre
        if (isNaN(articlesId))
        {
            res.status(400).json({
                status: "FAILED",
                message: "La requête incomprise par le serveur / syntaxe incorrecte.",
                data: undefined
            });

            return;
        };

        try
        {
            // on récupère l'article existant avec le bon user en appelant le fichier articlesService
            const checkArticle = await articlesService.getArticlesById(articlesId);

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
            const articles = await articlesService.deleteArticles(articlesId);

            // message d'erreur pour un article non défini
            if (articles === undefined)
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
                data: articles
            });
            console.log(`${req.method} | ${req.originalUrl} | \nL'article a été supprimé avec succès`);
        }
        // message d'erreur serveur
        catch (err)
        {
            res.status(500).json({
                status: "FAILED",
                message: "Erreur serveur",
                data: undefined
            });
        };
    };
};
