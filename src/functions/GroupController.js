import Group from '../model/Group'

export default {

    async getGroups(db, req, res) {
        const userId = req.query['userId']
        if (!userId) {
            throw new Error('QueryError')
        }
        const group = new Group(db)
        const result = await group.getGroupsByUserId(userId)
        const groups = result.rows.map(item => {
            return {
                groupId: item.group_id,
                userId: item.user_id,
                groupName: item.name
            }
        })
        res.status(200).send(JSON.stringify(groups))
    },

    async createGroup(db, req, res) {
        const group = new Group(db)
        const result = await group.createGroup(req.body['userId'], req.body['groupName'])
        if (result.rowCount == 0) {
            throw new Error('QueryError')
        }
        res.status(200).send('success')
    },

    async updateGroupName(db, req, res) {
        const group = new Group(db)
        const result = await group.updateGroupName(req.body['groupId'], req.body['groupName'])
        if (result.rowCount == 0) {
            throw new Error('QueryError')
        }
        res.status(200).send('success')
    }
}