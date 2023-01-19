/**
 * Table des articles
 */
type TArticle = {
    id: number,
    title: string,
    chronicle: string,
    creat_date: Date,
    deleted_date: Date,
    user_id: number
}
export default TArticle;