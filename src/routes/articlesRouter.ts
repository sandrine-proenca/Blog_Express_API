// IMPORTS
const express = require('express');
const authenticateJWT = require('../middleware/auth');

const ArticlesController = require('../controllers/articlesController');

const articlesRouter = express.Router();
const articlesController = new ArticlesController();

    // récupération de tous les articles
    articlesRouter.get('/', authenticateJWT, articlesController.getAllArticles);

