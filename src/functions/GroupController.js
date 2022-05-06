import Group from '../model/Group'

export default {

    getGroups(dbInstance) {
        let db = dbInstance
        return async function(req, res) {
            try {
                const group = new Group(db)
                const result = await group.getGroupsByUserId(req.query['userId'])
                res.status(200).send(JSON.stringify(result.rows))
            } catch (e) {
                let status = 500
                if (e.message == 'QueryError') {
                    status = 400
                }
                // logger
                res.status(status).send('failed')
            }

        }
    },

    createGroup(dbInstance) {
        let db = dbInstance
        return async function(req, res) {
            try {
                const group = new Group(db)
                const result = await group.createGroup(req.body['userId'], req.body['groupName'])
                if (result.rowCount == 0) {
                    throw new Error('QueryError')
                }
                res.status(200).send('success')
            } catch (e) {
                // logger
                let status = 500
                if (e.message == 'QueryError') {
                    status = 400
                }
                // logger
                res.status(status).send('failed')
            }
        }
    },

    updateGroupName(dbInstance) {
        let db = dbInstance
        return async function(req, res) {
            try {
                const group = new Group(db)
                const result = await group.updateGroupName(req.body['groupId'], req.body['groupName'])
                if (result.rowCount == 0) {
                    throw new Error('QueryError')
                }
                res.status(200).send('success')
            } catch (e) {
                // logger
                let status = 500
                if (e.message == 'QueryError') {
                    status = 400
                }
                // logger
                res.status(status).send('failed')
            }

        }
    }
}