/**
 * Table des commentaires
 */
type TComments = {
    id: number,
    message: string,
    creat_date: Date,
    deleted_date: Date,
    article_id: number,
    user_id: number
}
export default TComments;