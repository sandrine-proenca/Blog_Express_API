// IMPORTS
import express = require('express');
import { ArticlesController } from '../controllers/articlesController';
import { authenticateJWT } from '../middleware/auth';


export const articlesRouter = express.Router();

const articlesController = new ArticlesController();

    // récupération de tous les articles
    articlesRouter.get('/', authenticateJWT, articlesController.getAllArticles);
    articlesRouter.get('/:id', authenticateJWT, articlesController.getArticlesById);
    articlesRouter.post('/', authenticateJWT, articlesController.postArticles);
    articlesRouter.put('/:id', authenticateJWT, articlesController.putArticles);
    articlesRouter.delete('/:id',authenticateJWT, articlesController.deleteArticles);

