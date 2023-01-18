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
    async postArticles(title: string, chronicle: string, userId: number): Promise <TArticle | undefined> {
        const articles: QueryResult <TArticle> = await client.query('INSERT INTO articleS (title, chronicle, user_id) VALUES ($1, $2, $3) RETURNING *',[title, chronicle, userId]);
        if (articles.rowCount>0){
            return articles.rows[0];
        }
        return undefined;
    };

    // modification d'un article
    async putArticles(id: number, chronicle: string): Promise <TArticle | undefined> {
        const articles: QueryResult <TArticle> = await client.query('UPDATE articles SET chronicle=$1 WHERE id=$2 RETURNING *', [chronicle, id]);
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