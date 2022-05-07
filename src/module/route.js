import UserController from '../functions/UserController'
import GroupController from '../functions/GroupController'
import ProjectController from '../functions/ProjectController'
import AssignmentController from '../functions/AssignmentController'


const userRouter = [
    {
        path: '/login',
        method: 'post',
        callback: UserController.login
    },
]

const groupRouter = [
    {
        path: '/groups',
        method: 'get',
        callback: GroupController.getGroups
    },
    {
        path: '/group',
        method: 'post',
        callback: GroupController.createGroup
    },
    {
        path: '/group',
        method: 'put',
        callback: GroupController.updateGroupName
    }
]

const projectRouter = [
    {
        path: '/projects',
        method: 'get',
        callback: ProjectController.getProjectsByGroupId
    },
    {
        path: '/project',
        method: 'post',
        callback: ProjectController.createProject
    },
    {
        path: '/project/name',
        method: 'put',
        callback: ProjectController.updateProjectName
    },
    {
        path: '/project',
        method: 'delete',
        callback: ProjectController.deleteProject
    }
]

const assignmentRouter = [
    {
        path: '/assignments',
        method: 'get',
        callback: AssignmentController.getAssignmentsByProjectId
    },
    {
        path: '/assignment',
        method: 'post',
        callback: AssignmentController.createAssignment
    },
    {
        path: '/assignment/name',
        method: 'put',
        callback: AssignmentController.updateAssignmentName
    },
    {
        path: '/assignment/isfinished',
        method: 'put',
        callback: AssignmentController.updateAssignmentIsFinished
    },
    {
        path: '/assignment',
        method: 'delete',
        callback: AssignmentController.deleteAssignment
    }
]


const routes = [
    ...userRouter,
    ...groupRouter,
    ...projectRouter,
    ...assignmentRouter
]


export default function(app, dbInstance) {
    try {
        routes.forEach(route => {
            app[route.method](
                route.path,
                async function(req, res) {
                    try {
                        await route.callback(dbInstance, req, res)
                    } catch (e) {
                        let status = 500
                        if (e.message == 'QueryError') {
                            status = 400
                        }
                        // logger
                        res.status(status).send('failed')
                    }
                }
            )
        })
    } catch (e) {
        console.log(e)
    }
}