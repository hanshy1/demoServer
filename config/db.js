const pg = require('pg')

//tcp://用户名：密码@localhost/数据库名
// const conString = "tcp://admin:1qaz!QAZ@localhost:5432/progress_dev"

const config = {
    user: 'postgres',
    password: 'admin',
    database: 'progress_dev',
    port: 5433,
    max: 20,
    idleTimeoutMillis: 3000
}

// const client = new pg.Client(conString);

export default function createConnnectPool() {
    return new pg.Pool(config)
}





