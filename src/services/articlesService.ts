// IMPORTS
import {client} from "../client"
import { QueryResult } from "pg";
import TArticle from "../types/TArticle";


/**
 * classe qui appelle les fonctions asynchrones 'getAllArticles', 'getArticlesById', 'postArticles', 'putArticles' et 'deleteArticles'
 */
export class ArticlesService {

    /**
     * fonction asynchrone 'getAllArticles' qui va appeler toutes les informations concernant les articles dans la BDD (postgres)
     * @returns 
     */
    async getAllArticles(): Promise <TArticle[] | undefined> {
        const articles: QueryResult<TArticle> = await client.query('SELECT * FROM articles');
        if (articles.rowCount>0) {
            return articles.rows;
        }
        return undefined;
    };

    /**
     * fonction asynchrone 'getArticlesById' qui va appeler toutes les informations concernant l'article dans la BDD (postgres)
     * @param id 
     * @returns 
     */
    async getArticlesById(id: number): Promise <TArticle | undefined> {
        const  articles: QueryResult<TArticle> = await client.query('SELECT * FROM articles WHERE id=$1', [id]);
        if ( articles.rowCount>0) {
            return  articles.rows[0];
        }
        return undefined;
    };

    /**
     * fonction asynchrone 'postArticles' qui va ajouter toutes les informations concernant l'article dans la BDD (postgres)
     * @param title 
     * @param chronicle 
     * @param userId 
     * @returns 
     */
    async postArticles(title: string, chronicle: string, userId: number): Promise <TArticle | undefined> {
        const articles: QueryResult <TArticle> = await client.query('INSERT INTO articles (title, chronicle, user_id) VALUES ($1, $2, $3) RETURNING *',[title, chronicle, userId]);
        if (articles.rowCount>0){
            return articles.rows[0];
        }
        return undefined;
    };

    /**
     * fonction asynchrone 'putArticles' qui va modifier les informations concernant un article dans la BDD (postgres)
     * @param id 
     * @param title 
     * @param chronicle 
     * @returns 
     */
    async putArticles(id: number, title: string, chronicle: string): Promise <TArticle | undefined> {
        
        const articles: QueryResult <TArticle> = await client.query('UPDATE articles SET title=$1, chronicle=$2 WHERE id=$3 RETURNING *', [title, chronicle, id]);
        if (articles.rowCount) {
            return articles.rows[0];
        }
        return undefined
    };

    /**
     * fonction asynchrone 'deleteArticles' qui va supprimer un article déterminé dans la BDD (postgres)
     * @param id 
     * @returns 
     */
    async deleteArticles(id: number):Promise <TArticle | undefined> {
        const articles: QueryResult <TArticle> = await client.query('DELETE FROM articles WHERE id=$1 RETURNING *', [id]);
        if (articles.rowCount) {
            return articles.rows[0];
        }
        return undefined;
    };
}