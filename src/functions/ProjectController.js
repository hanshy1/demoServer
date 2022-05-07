import Project from '../model/Project'

export default {

    async getProjectsByGroupId(db, req, res) {
        const groupId = req.query['groupId']
        if (!groupId) {
            throw new Error('QueryError')
        }
        const project = new Project(db)
        const result = await project.getProjectsByGroupId(groupId)
        const projects = result.rows.map(item => {
            return {
                projectId: item.project_id,
                groupId: item.group_id,
                projectName: item.name
            }
        })
        res.status(200).send(JSON.stringify(projects))
    },

    async getAllProjects(db, req,  res) {
        // userid 联表查询
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