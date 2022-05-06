import UserController from '../functions/UserController'
import GroupController from '../functions/GroupController'
// import ProjectController from '../functions/ProjectController'
// import AssignmentController from '../functions/AssignmentController'

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


const routes = [
    ...userRouter,
    ...groupRouter,
]


export default function(app, dbInstance) {
    try {
        routes.forEach(route => {
            app[route.method](
                route.path,
                route.callback(dbInstance)
            )
        })
    } catch (e) {
        console.log(e)
    }
}