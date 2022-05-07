var express = require('express');
var path = require('path');
var app = express();
import validateCookies from './middleware/validateCookies'
import router from './src/module/route'
import db from './src/module/dbConnect'

/** DB conncet pool */
// sequelize  ORM framework
var dbConnect = new db()

/** middleware */
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(validateCookies)

/** router */
router(app, dbConnect)

app.get('/', function (req, res) {
	res.location('/index')
	res.status(302).send()
})

app.get('/index', function (req, res) {
	// res.send('<h1>Hello World!</h1>');
	res.sendFile(path.join(__dirname + '/src/pages/test.html'))
})

app.get('/test', function (req, res) {
	res.sendFile(path.join(__dirname + '/src/pages/test1.html'))
})

app.get('/pdf', function (req, res) {
	res.sendFile(path.join(__dirname + '/src/static/test_neu_1.pdf'))
})

app.get('/dbtest', function (req, res) {
	dbConnect.query('select * from users', function(item) {
		res.send(JSON.stringify(item.rows[0]))
	})
})

// 404 message
app.get('*', function(req, res) {
	console.log('404 not found')
	res.status(404).send(`${req.method} ${req.originalUrl} is not found in server.`)
})

app.listen(9999)

console.log('server listen on http://localhost:9999')