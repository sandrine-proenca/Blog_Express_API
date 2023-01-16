// imports
import * as express from 'express';
import * as dotenv from 'dotenv';
import { JwtPayload } from 'jsonwebtoken';

declare global
{
    namespace Express
    {
        interface Request
        {
            user?: JwtPayload // permet d'inserer un user a req pour l'id
        }
    }
}


// Init environment variables (see .env.local file if it doesn't exist go to README.md file)
dotenv.config({ path: '.env' });


// Express server creation
const app = express();
const port = process.env.PORT || 8080;

// for parsing application/json
app.use(express.json());


// Add headers before the routes are defined
app.use(function (req, res, next)
{

    res.setHeader('authorization', '');
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});

/************************************************
   * Add the route here
   */



// Bind express server on port 8080
app.listen(port, () =>
{
    console.log(
        `Express server has started on port ${port}. Open http://localhost:${port} to see results`
    );
});
