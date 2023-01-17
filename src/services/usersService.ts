import {client} from '../client'
import { TPartialUser, TUser } from '../types/types';
export class UsersService{

    async getUserByName(name: string): Promise<TUser | undefined>
    {

        const data = await client.query('SELECT * FROM users WHERE name = $1', [name]);
        console.log(data.rows, name);

        if(data.rowCount){
            return data.rows[0];
        }

        return undefined;
        
}

    async addUser(name: string, hash: string): Promise<TPartialUser | undefined>
    {
        const data = await client.query('INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id, name', [name, hash]);
        
        if(data.rowCount){

            return data.rows[0];
        }

        return undefined
    }
}