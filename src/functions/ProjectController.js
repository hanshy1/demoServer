import Project from '../model/Project'

export default {

    async getProjectsByGroupId(db, req, res) {
        const groupId = req.query['groupId']
        if (!groupId) {
            throw new Error('QueryError')
        }
        const project = new Project(db)
        const result = await project.getProjectsByGroupId(groupId)
        const projects = {}
        result.rows.forEach(item => {
            // projects[item.project_id].projectName = item.project_name
            if (projects[item.project_id]) {
                projects[item.project_id].projectName = item.project_name
            } else {
                projects[item.project_id] = { projectName: item.project_name }
            }
            const assignment = {
                assignmentId: item.assignment_id,
                projectId: item.project_id,
                assignmentName: item.assignment_name,
                isFinished: item.is_finished
            }
            projects[item.project_id].assignments = [...(projects[item.project_id].assignments || []), assignment]
        })
        const results = Object.keys(projects).map(key => {
            return {
                projectId: key,
                projectName: projects[key].projectName,
                assignments: projects[key].assignments
            }
        })

        res.status(200).send(JSON.stringify(results))
    },
   
    async createProject(db, req, res) {
        const project = new Project(db)
        const result = await project.createProject(req.body['groupId'], req.body['projectName'])
        if (result.rowCount == 0) {
            throw new Error('QueryError')
        }
        res.status(200).send('success')
    },

    async updateProjectName(db, req, res) {
        const project = new Project(db)
        const result = await project.updateProjectName(req.body['projectId'], req.body['projectName'])
        if (result.rowCount == 0) {
            throw new Error('QueryError')
        }
        res.status(200).send('success')
    },

    async deleteProject(db, req, res) {
        const project = new Project(db)
        const result = await project.deleteProject(req.body['projectId'])
        if (result.rowCount == 0) {
            throw new Error('QueryError')
        }
        res.status(200).send('success')
    }
}