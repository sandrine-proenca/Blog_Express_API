// IMPORTS
import {client} from "../client"
import { QueryResult } from "pg";
import TArticle from "../types/TArticle";





export class ArticlesService {

    // récupération de tous les articles
    async getAllArticles(): Promise <TArticle[] | undefined> {
        const articles: QueryResult<TArticle> = await client.query('SELECT * FROM articles');
        if (articles.rowCount>0) {
            return articles.rows;
        }
        return undefined;
    };

    // récupération d'un article
    async getArticlesById(id: number): Promise <TArticle | undefined> {
        const  articles: QueryResult<TArticle> = await client.query('SELECT * FROM articles WHERE id=$1', [id]);
        if ( articles.rowCount>0) {
            return  articles.rows[0];
        }
        return undefined;
    };

    // création d'un article
    async postArticles(chronicle: string, userId: number): Promise <TArticle | undefined> {
        const articles: QueryResult <TArticle> = await client.query('INSERT INTO articleS (chronicle, user_id) VALUES ($1, $2) RETURNING *',[chronicle, userId]);
        if (articles.rowCount>0){
            return articles.rows[0];
        }
        return undefined;
    };

    // modification d'un article
    async putArticles(id: number, chronicle: string, userId: number): Promise <TArticle | undefined> {
        const articles: QueryResult <TArticle> = await client.query('UPDATE articleS SET chronicle=$2 WHERE id=$1 RETURNING *', [id, chronicle, userId]);
        if (articles.rowCount) {
            return articles.rows[0];
        }
        return undefined
    };

    // suppression d'un article
    async deleteArticles(id: number, userId: number):Promise <TArticle | undefined> {
        const articles: QueryResult <TArticle> = await client.query('DELETE FROM articles WHERE id=$1 RETURNING *', [id, userId]);
        if (articles.rowCount) {
            return articles.rows[0];
        }
        return undefined;
    };
}