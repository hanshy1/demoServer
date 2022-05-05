export default class User {

    constructor(dbInstance) {
        this.db = dbInstance
    }

    getUser(id, password) {
        const sqlString = `SELECT * FROM "user" WHERE id='${id}' and password='${password}'`
        return this.db.query(sqlString)
            .then(res => {
                if (res.rows[0]) {
                    return Promise.resolve(true)
                }
                return Promise.resolve(false)
            })
            .catch(e => {
                return Promise.reject(e)
            })
    }

    addUser(id, password) {

    }

    updatePassword(id, oldPassword, newPassword) {

    }
}