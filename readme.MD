# Template node Express typescript

install dependencies
`npm i`

start dev server
`npm start`

BLOG_EXPRESS_API

    .DOC

    Utilisateurs:

        ENREGISTRER:
        `/api/users/register`
        Créer un nouvel utilisateur

        IDENTIFICATION:
        `/api/users/login`
        Identifier un utilisateur
    
    -> CORPS: {name: string, password: string}


    Articles:

        OBTENTION:
        `/api/articles`
        Afficher tous les articles
        `/api/articles/:id`
        Afficher un article déterminé
        -> CORPS: {id: number}

        CREATION:
        `/api/articles`
        Poster un nouvel article
        -> CORPS: {title: string, chronicle: string, user_id: number}

        RECTIFICATION:
        `/api/articles`
        Modifier un article déterminé
        -> CORPS: {id: number, title: string, chronicle: string}

        SUPPRESSION:
        `/api/articles/:id`
        supprimer un article déterminé
        -> CORPS: {id: number}

    


    Commentaires:

        OBTENTION:
        `/api/comments/:articleId`
        Afficher tous les commentaires d'un article
        -> CORPS: {commentId: number, articleId: number}

        CREATION:
        `/api/comments`
        Poster un nouveau commentaire
        -> CORPS: {message: string, articleId:number, userId: number}

        RECTIFICATION:
        `/api/comments`
        Modifier un commentaire déterminé
        -> CORPS: {id: number, message: string}

        SUPPRESSION:
        `/api/comments/:id`
        supprimer un commentaire déterminé
        -> CORPS: {id: number}