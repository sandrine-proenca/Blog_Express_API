import express = require('express');
import { CommentsController } from '../controllers/commentsController';

export const commentsRouter = express.Router();

const commentsController = new CommentsController();

commentsRouter.