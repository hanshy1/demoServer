import User from '../model/User'

export default {

    login(dbInstance) {
        let db = dbInstance
        return async function(req, res) {
            const user = new User(db)
            const result = await user.getUser(req.body['id'],req.body['password'])
            res.status(200).send(!!result[0])
        }
    }
}