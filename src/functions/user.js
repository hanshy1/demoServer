import User from '../model/User'

export default function(dbInstance) {
    let db = dbInstance
    return async function(req, res) {
        const user = new User(db)
        const result = await user.getUser(req.query['id'],req.query['password'])
        res.status(200).send(`${result}`)
    }
}