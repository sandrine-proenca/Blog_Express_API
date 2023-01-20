# Template node Express typescript

install dependencies
`npm i`

start dev server
`npm start`

# BLOG_EXPRESS_API .DOC


## UTILISATEURS:

## Enregistrer:

### `/api/users/register`

Créer un nouvel utilisateur

**CORPS: {name: string, password: string}** 

## Identifier:

### `/api/users/login`

Identifier un utilisateur

**CORPS: {name: string, password: string}** 



# ARTICLES:

## Obtention:
### `/api/articles`

Afficher tous les articles

### `/api/articles/:id`

Afficher un article déterminé

**CORPS: {id: number}**    

## Création:

### `/api/articles`

 Poster un nouvel article

**CORPS: {title: string, chronicle: string, user_id: number}** 


## Rectification:

### `/api/articles`

Modifier un article déterminé 

**CORPS: {id: number, title: string, chronicle: string}** 

## Suppression:
### `/api/articles/:id`

supprimer un article déterminé

**CORPS: {id: number}** 




# COMMENTAIRES:

## Obtention:
### `/api/comments/:articleId`

Afficher tous les commentaires d'un article

**CORPS: {commentId: number, articleId: number}** 

## Création:

### `/api/comments`

Poster un nouveau commentaire

**CORPS: {message: string, articleId:number, userId: number}** 

## Rectification:

### `/api/comments`

Modifier un commentaire déterminé

**CORPS: {id: number, message: string}** 

## Suppression:

### `/api/comments/:id`

supprimer un commentaire déterminé

**CORPS: {id: number}** 

