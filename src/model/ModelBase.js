export default class {

    constructor(dbInstance) {
        this.db = dbInstance
    }

    executeSQL(sql) {
        return this.db.query(sql)
            .then(res => {
                return Promise.resolve({ rows: res.rows, rowCount: res.rowCount })
            })
            .catch(e => {
                return Promise.reject(e)
            })
    }
}