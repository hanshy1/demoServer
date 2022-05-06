import ModelBase from "./ModelBase"

export default class Group extends ModelBase {

    constructor(dbInstance) {
        super(dbInstance)
    }

    getGroupsByUserId(id) {
        const sqlString = `SELECT * FROM "group" WHERE user_id='${id}' AND is_deleted=false`
        return this.executeSQL(sqlString)
    }

    createGroup(userId, groupName) {
        const sqlString = `INSERT INTO "group" (user_id, name, is_deleted) VALUES('${userId}', '${groupName}', false)`
        return this.executeSQL(sqlString)
    }

    updateGroupName(groupId, groupName) {
        const sqlString = `UPDATE "group" SET name='${groupName}' WHERE group_id=${groupId} AND is_deleted=false`
        return this.executeSQL(sqlString)
    }

    deleteGroup(groupId, userId) {
        const sqlString = `UPDATE "group" SET isdeleted=true WHERE group_id=${groupId} AND user_id='${userId}'`
        return this.executeSQL(sqlString)
    }
}