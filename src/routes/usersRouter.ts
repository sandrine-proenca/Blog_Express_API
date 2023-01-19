// Les imports
import express = require('express');
import { UsersController } from '../controllers/usersController';

/**
 * Route qui appelle la fonction asynchrone 'register' et 'login' dans la class UserController
 */
export const usersRouter = express.Router();

/**
 * Appel de la class 'UsersController'
 */
const usersController = new UsersController();


usersRouter.post('/register', usersController.register);

usersRouter.post('/login', usersController.login);


