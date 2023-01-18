import express = require('express');
import { UsersController } from '../controllers/usersController';
import { authenticateJWT } from '../middleware/auth';

export const usersRouter = express.Router();

const usersController = new UsersController();

usersRouter.post('/register', authenticateJWT, usersController.register);
usersRouter.post('/login', authenticateJWT, usersController.login);


