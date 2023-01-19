# Template node Express typescript

install dependencies
`npm i`

start dev server
`npm start`

BLOG_EXPRESS_API

    .DOC

    Utilisateurs:

        ENREGISTRER:
        '/api/users/register'
        Créer un nouvel utilisateur

        IDENTIFICATION:
        '/api/users/login'


    Articles:

        OBTENTION:
        '/api/articles'
        Afficher tous les articles
        '/api/articles/:id'
        Afficher un article déterminé

        CREATION:
        '/api/articles'
        Poster un nouvel article

        RECTIFICATION:
        '/api/articles'
        Modifier un article déterminé

        SUPPRESSION:
        '/api/articles/:id'
        supprimer un article déterminé


    Commentaires:

        OBTENTION:
        '/api/comments/:articleId'
        Afficher tous les commentaires d'un article

        CREATION:
        '/api/comments'
        Poster un nouveau commentaire

        RECTIFICATION:
        '/api/comments'
        Modifier un commentaire déterminé

        SUPPRESSION:
        '/api/comments/:id'
        supprimer un commentaire déterminé