var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routes');
var tasks = require('./routes/tasks');

var app = express();

app.locals.appname = 'Express.js Todo App';
app.locals.moment = require('moment');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/*
 * To process LESS stylesheets into CSS ones, we utilize less-middleware in this manner
 */
app.use(require('less-middleware')(path.join(__dirname, 'public')));
// The other static files are also in the public folder
app.use(express.static(path.join(__dirname, 'public')));

/*
 * Define our routes
 */
app.get('/', routes.index);
app.get('/tasks', tasks.list);
app.post('/tasks', tasks.markAllCompleted);
app.post('/tasks', tasks.add);
app.post('/tasks/:task_id', tasks.markCompleted);
app.delete('/tasks/:task_id', tasks.del);
app.get('/tasks/completed', tasks.completed);

var server = app.listen(3000, function () {
    console.log('Server listening on port ' + server.address().port);
});