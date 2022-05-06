import dbConnectPool from '../../config/db'

export default class DbConnnecter{

    constructor() {
        this.db = dbConnectPool()
    }

    /**
     * 
     * @param {*} sqlString 
     * @param {*} callback 
     */
    query(sqlString) {
        return new Promise((resolve, reject) => {
            this.db.connect(function(err, client, done) {
                if (err) {
                    // logger err.stack
                    reject(new Error('DBConnectError'))
                } else {
                    client.query(sqlString, function(err, result) {
                        done()
                        if (err) {
                            // logger
                            reject(new Error('QueryError'))
                        }
                        resolve(result)
                    })
                }
            })
        })
    }
} 

