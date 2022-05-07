import User from '../model/User'

export default {

    async login(db, req, res) {
        const user = new User(db)
        const result = await user.getUser(req.body['id'],req.body['password'])
        res.status(200).send(!!result[0])
    }
}