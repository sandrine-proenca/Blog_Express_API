// IMPORTS
const client = require('../client');


export class ArticlesService {

    // récupération de tous les articles
    async getAllArticles() {
        const data = await client.query('SELECT * FROM articles');
        if (data.rowCount) {
            return data.rows;
        }
        return undefined;
    };

    // récupération d'un article
    async getArticlesById(id: number){
        const data = await client.query('SELECT * FROM articles WHERE id=$1', [id]);
        if (data.rowCount) {
            return data.rows[0];
        }
        return undefined;
    };

    // création d'un article
    async postArticles(chronicle: string){
        const data = await client.query('INSERT INTO articleS (chronicle) VALUES ($1) RETURNING *',[chronicle]);
        if (data.rowCount){
            return data.rows[0];
        }
        return undefined;
    };

    // modification d'un article
    async putArticles(id: number, chronicle: string,userID: number){
        const data = await client.query('UPDATE articleS SET chronicle=$2 WHERE id=$1 RETURNING *', [id, chronicle, userID]);
        if (data.rowCount) {
            return data.rows[0];
        }
        return undefined
    };

    // suppression d'un article
    async deleteArticles(id: number) {
        const data = await client.query('DELETE FROM articles WHERE id=$1 RETURNING *', [id]);
        if (data.rowCount) {
            return data.rows[0];
        }
        return undefined;
    };
}