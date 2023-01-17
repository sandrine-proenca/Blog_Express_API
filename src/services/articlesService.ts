import { QueryArrayResult, QueryResult } from "pg";
import TArticle from "../types/TArticle";

// IMPORTS
const client = require('../client');


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
    async postArticles(chronicle: string): Promise <TArticle | undefined> {
        const articles: QueryResult <TArticle> = await client.query('INSERT INTO articleS (chronicle) VALUES ($1) RETURNING *',[chronicle]);
        if (articles.rowCount>0){
            return articles.rows[0];
        }
        return undefined;
    };

    // modification d'un article
    async putArticles(id: number, chronicle: string, userID: number): Promise <TArticle | undefined> {
        const articles: QueryResult <TArticle> = await client.query('UPDATE articleS SET chronicle=$2 WHERE id=$1 RETURNING *', [id, chronicle, userID]);
        if (articles.rowCount) {
            return articles.rows[0];
        }
        return undefined
    };

    // suppression d'un article
    async deleteArticles(id: number):Promise <TArticle | undefined> {
        const articles: QueryResult <TArticle> = await client.query('DELETE FROM articles WHERE id=$1 RETURNING *', [id]);
        if (articles.rowCount) {
            return articles.rows[0];
        }
        return undefined;
    };
}