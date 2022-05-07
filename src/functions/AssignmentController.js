import Assignment from '../model/Assignment'

export default {

    async getAssignmentsByProjectId(db, req, res) {
        const projectId = req.query['projectId']
        if (!projectId) {
            throw new Error('QueryError')
        }
        const assignment = new Assignment(db)
        const result = await assignment.getAssignmentsByProjectId(projectId)
        const assignments = result.rows.map(item => {
            return {
                assignmentId: item.assignment_id,
                projectId: item.project_id,
                assignmentName: item.name,
                isFinished: item.is_finished
            }
        })
        res.status(200).send(JSON.stringify(assignments))
    },
   
    async createAssignment(db, req, res) {
        const assignment = new Assignment(db)
        const result = await assignment.createAssignment(req.body['projectId'], req.body['assignmentName'])
        if (result.rowCount == 0) {
            throw new Error('QueryError')
        }
        res.status(200).send('success')
    },

    async updateAssignmentName(db, req, res) {
        const assignment = new Assignment(db)
        const result = await assignment.updateAssignmentName(req.body['assignmentId'], req.body['assignmentName'])
        if (result.rowCount == 0) {
            throw new Error('QueryError')
        }
        res.status(200).send('success')
    },

    async updateAssignmentIsFinished(db, req, res) {
        const assignment = new Assignment(db)
        const result = await assignment.updateAssignmentIsFinished(req,body['assignmentId'], req.body['projectId'], req.body['isFinished'])
        if (result.rowCount == 0) {
            throw new Error('QueryError')
        }
        res.status(200).send('success')
    },

    async deleteAssignment(db, req, res) {
        const assignment = new Assignment(db)
        const result = await assignment.deleteAssignment(req.body['assignmentId'])
        if (result.rowCount == 0) {
            throw new Error('QueryError')
        }
        res.status(200).send('success')
    }
}