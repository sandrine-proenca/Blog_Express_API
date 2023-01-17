import { Request, Response } from "express";
import { CommentsService } from "../services/commentsService";
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

const commentsService = new CommentsService();

export class CommentsController{

//récupération de tous les commentaires d'un article:
async getAllCommentsByArticleId(req: Request, res: Response){

}
//récupération d'un seul commentaire d'un article:
async getOneCommentByArticleId(req: Request, res: Response){
    
}
//création d'un commentaire dans un article:

//modification d'un commentaire dans un article:

//supression d'un commentaire dans un article:

}