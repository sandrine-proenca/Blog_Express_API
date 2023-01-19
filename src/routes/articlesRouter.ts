// IMPORTS
import express = require('express');
import { ArticlesController } from '../controllers/articlesController';
import { authenticateJWT } from '../middleware/auth';

/**
 * Route qui appelle la fonction asynchrone 'getAllArticles','getArticlesById', 'postArticles', 'putArticles' et 'deleteArticles' dans la classe 'ArticlesController'
 */
export const articlesRouter = express.Router();

/**
 * Appel de la class 'ArticlesController'
 */
const articlesController = new ArticlesController();

    // récupération de tous les articles
    articlesRouter.get('/', articlesController.getAllArticles);

    // récupération d'un article
    articlesRouter.get('/:id', articlesController.getArticlesById);

    // créer un article avec identification de l'utilisateur
    articlesRouter.post('/', authenticateJWT, articlesController.postArticles);

    // modifier un article défini avec identification de l'utilisateur
    articlesRouter.put('/', authenticateJWT, articlesController.putArticles);

    // supprimer un article défini avec identification de l'utilisateur
    articlesRouter.delete('/:id',authenticateJWT, articlesController.deleteArticles);


