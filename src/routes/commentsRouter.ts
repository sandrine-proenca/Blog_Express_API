import express = require('express');
import { CommentsController } from '../controllers/commentsController';
import { authenticateJWT } from '../middleware/auth';

export const commentsRouter = express.Router();

const commentsController = new CommentsController();

commentsRouter.get('/:articleId', commentsController.getAllCommentsByArticleId);
commentsRouter.post('/', authenticateJWT, commentsController.postComment);
commentsRouter.put('/', authenticateJWT, commentsController.putComment);
commentsRouter.delete('/:id', authenticateJWT, commentsController.deleteComment);
