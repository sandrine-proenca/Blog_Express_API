// import du fichier Client
import { Client } from "pg";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

/**
 * Lien qui va rechercher les informations des tables dans postgres
 */
export const client = new Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD,
    port: 5432,
});

client.connect();
