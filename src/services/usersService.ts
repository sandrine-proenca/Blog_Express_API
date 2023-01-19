import {client} from '../client'
import { TPartialUser, TUser } from '../types/types';
export class UsersService{

    /**
     * fonction asynchrone 'getUserByName' qui va appeler toutes les informations concernant l'utilisateur dans la BDD (postgres)
     * @param name 
     * @returns 
     */
    async getUserByName(name: string): Promise<TUser | undefined>
    {

        /**
         * constante qui va récupérer toutes les informations de l'utilisateur dans la BDD (postgres)
         */
        const data = await client.query('SELECT * FROM users WHERE name = $1', [name]);
        console.log(data.rows, name);

        if(data.rowCount){
            return data.rows[0];
        }

        return undefined;
        
}

/**
 * fonction asynchrone 'addUser' qui va ajouter toutes les informations concernant l'utilisateur dans la BDD (postgres)
 * @param name 
 * @param hash 
 * @returns 
 */
    async addUser(name: string, hash: string): Promise<TPartialUser | undefined>
    {

        /**
         * constante qui va ajouter toutes les nouvelles informations de l'utilisateur dans la BDD (postgres)
         */
        const data = await client.query('INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id, name', [name, hash]);
        
        if(data.rowCount){

            return data.rows[0];
        }

        return undefined
    }
}