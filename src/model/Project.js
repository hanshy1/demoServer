import ModelBase from "./ModelBase"

export default class Project extends ModelBase {

    constructor(dbInstance) {
        super(dbInstance)
    }

    getProjectsByGroupId(id) {
        const sqlString = `SELECT a.name as project_name, b.name as assignment_name, * FROM "project" a inner join assignment b on a.project_id = b.project_id WHERE a.group_id=${id} AND a.is_deleted=false AND b.is_deleted=false ORDER BY a.project_id, b.assignment_id ASC`
        // const sqlString = `SELECT * FROM "project" WHERE group_id=${id} AND is_deleted=false`
        return this.executeSQL(sqlString)
    }

    createProject(groupId, projectName) {
        const sqlString = `INSERT INTO "project" (group_id, name, is_deleted) VALUES(${groupId}, '${projectName}', false)`
        return this.executeSQL(sqlString)
    }

    updateProjectName(projectId, projectName) {
        const sqlString = `UPDATE "project" SET name='${projectName}' WHERE project_id=${projectId} AND is_deleted=false`
        return this.executeSQL(sqlString)
    }

    deleteProject(projectId) {
        const sqlString = `UPDATE "project" SET is_deleted=true WHERE project_id=${projectId}`
        return this.executeSQL(sqlString)
    }
}