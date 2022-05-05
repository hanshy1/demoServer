import UserController from '../functions/user'


const routes = [
    {
        path: '/user',
        method: 'get',
        callback: UserController
    }
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