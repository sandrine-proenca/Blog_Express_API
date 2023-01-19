// Les imports:
import { client } from '../client'
import TComments from '../types/TComments'
import { QueryResult } from "pg";

export class CommentsService {

    // récupération de tous les commentaires d'un article:
    async getAllCommentsByArticleId(articleId: number): Promise<TComments[] | undefined> {
        const comments: QueryResult<TComments> = await client.query('SELECT * FROM comments WHERE article_id = $1', [articleId]);
        console.log(comments, articleId);

        if (comments.rowCount) {
            return comments.rows;
        }

        return undefined;
    }

    // récupération d'un seul commentaire d'un article:
    async getOneCommentByArticleId(commentId: number, articleId: number): Promise <TComments[] | undefined>{
        const comments: QueryResult<TComments> = await client.query('SELECT * FROM comments WHERE id=$1 AND article_id=$2 RETURNING *', [commentId, articleId]);
        if (comments.rowCount){
            return comments.rows;
        }
        return undefined;
    }
// récupération d'un commentaire par son id:
    async getCommentById(id: number): Promise<TComments | undefined> {
        const data: QueryResult<TComments> = await client.query('SELECT * FROM comments WHERE id=$1', [id])
        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    }

    // création d'un commentaire dans un article:
    async postComment(message: string, articleId:number, userId: number): Promise<TComments | undefined> {
        const comments: QueryResult<TComments> = await client.query('INSERT INTO comments (message, article_id, user_id) VALUES ($1, $2, $3) RETURNING *', [message, articleId, userId]);
        if (comments.rowCount) {
            return comments.rows[0];
        }
        return undefined;
    }

    // modification d'un commentaire:
    async putComment(id: number, message: string): Promise<TComments | undefined> {
        const comments: QueryResult<TComments> = await client.query('UPDATE comments SET message=$1 WHERE id=$2 RETURNING *', [message, id]);
        if (comments.rowCount)
            return comments.rows[0];
    }

    // Suppression d'un commentaire:
    async deleteCommentById(id: number): Promise<TComments | undefined> {
        const comments: QueryResult<TComments> = await client.query('DELETE FROM comments WHERE id=$1 RETURNING *', [id]);
        if (comments.rowCount)
            return comments.rows[0];
    }
}