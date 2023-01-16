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
            // les articles existent
            res.status(201).json({
                status: "OK",
                message: "Les articles existent",
                data: articles
            });
        }
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

        const articlesId = parseInt(req.params.id);
        try
        {
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
            res.status(201).json({
                status: "OK",
                message: "Les articles existent",
                data: article
            });
        }
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
        const chronicle = req.body;
        const userID = req.userId;

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
            const article = await articlesService.postArticles(chronicle, userID);
            if (userID === undefined)
            {
                res.status(400).json({
                    status: "FAILED",
                    message: "Le USER n'existe pas",
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} | \nLe USER n'existe pas`);
                return;
            };
            res.status(201).json({
                status: "OK",
                message: "Le ticket a bien été créé",
                data: article
            });
        }
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
    async putArticles(req: Request, res: Response){
        const chronicle = req.body;
        const id = req.params.id;
        const userId = parseInt(req.userId);
        // message d'erreur pour un chronicle inexistant
        if (chronicle === undefined || typeof chronicle !== typeof String()){
            res.status(403).json({
                status: "FAILED",
                message: "Obligation d'avoir un chronicle en format string",
                data: undefined
            });
            console.log(`${req.method} | ${req.originalUrl} |  \nObligation d'avoir un chronicle en format string`);
            return;
        };
        try {
            const validArticle = articlesService.getArticlesById(id);
            if (validArticle && validArticle.user_id !== userId){
                res.status(403).json({
                    status: "FAIL",
                    message: "Le ticket n'est pas a vous",
                    data: undefined
                });
                return;
            };
        }
    }
}