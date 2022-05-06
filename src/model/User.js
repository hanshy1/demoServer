import ModelBase from "./ModelBase"

export default class User extends ModelBase {

    constructor(dbInstance) {
        super(dbInstance)
    }

    getUser(id, password) {
        const sqlString = `SELECT * FROM "user" WHERE user_id='${id}' and password='${password}'`
        return this.executeSQL(sqlString)
    }

    getUserById(id) {
        const sqlString = `SELECT * FROM "user" WHERE user_id='${id}'`
        return this.executeSQL(sqlString)
    }

    addUser(id, password) {
        const sqlString = `INSERT INTO "user"(user_id, password, auth, is_deleted) VALUES('${id}', '${password}', null, false)`
        return this.executeSQL(sqlString)
    }

    updatePassword(id, newPassword) {
        const sqlString = `UPDATE "user" SET password='${newPassword}' WHERE user_id='${id}'`
        return this.executeSQL(sqlString)
    }
}