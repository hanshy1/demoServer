import ModelBase from "./ModelBase"

export default class Assignment extends ModelBase {

    constructor(dbInstance) {
        super(dbInstance)
    }

    getAssignmentsByProjectId(id) {
        const sqlString = `SELECT * FROM "assignment" WHERE project_id=${id} AND is_deleted=false`
        return this.executeSQL(sqlString)
    }

    createAssignment(projectId, assignmentName) {
        const sqlString = `INSERT INTO "assignment" (project_id, name, is_deleted) VALUES(${projectId}, '${assignmentName}', false)`
        return this.executeSQL(sqlString)
    }

    updateAssignmentName(assignmentId, assignmentName) {
        const sqlString = `UPDATE "assignment" SET name='${assignmentName}' WHERE assignment_id=${assignmentId} AND is_deleted=false`
        return this.executeSQL(sqlString)
    }

    updateAssignmentIsFinished(assignmentId, projectId, isFinished) {
        const sqlString = `UPDATE "assignment" SET is_finished=${isFinished} WHERE assignment_id=${assignmentId} AND prject_id=${projectId}`
        return this.executeSQL(sqlString)
    }

    deleteAssignment(assignmentId) {
        const sqlString = `UPDATE "assignment" SET isdeleted=true WHERE id=${assignmentId}`
        return this.executeSQL(sqlString)
    }
}