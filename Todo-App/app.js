// var express = require('express');
// var routes = require('./routes');
// var tasks = require('./routes/tasks');
// var http = require('http');
// var path = require('path');
// var mongoskin = require('mongoskin');
// var db = mongoskin.db('mongodb://localhost:27017/todo?auto_reconnect', {safe:true});
// var app = express();
//
// var favicon = require('serve-favicon'),
//     logger = require('morgan'),
//     bodyParser = require('body-parser'),
//     methodOverride = require('method-override'),
//     cookieParser = require('cookie-parser'),
//     session = require('express-session'),
//     csrf = require('csurf'),
//     errorHandler = require('errorhandler');
//
// /*
//  * In this middleware, we export the database object to all middlewares.
//  * By doing so , we'll be able to perform database operations in the routes modules
//  */
// app.use(function (req, res, next) {
//     req.db = {};
//     // We simply store the tasks collection in every request
//     req.db.tasks = db.collection('tasks');
//     next();
// });
//
// /*
//  * Access appname from within every Jade template
//  */
// app.locals.appname = 'Express.js Todo App';
//
// app.locals.moment = require('moment');
//
// /*
//  * Set the server port
//  */
// app.set('port', process.env.PORT || 3000);
//
// /*
//  * Define template engine
//  */
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
//
// /*
//  * Display the Express.js favicon (the graphic in the URL address bar of browsers)
//  */
// app.use(express.favicon(path.join('public', 'favicon.ico')));
//
// /*
//  * The out-of-the-box logger will print requests in the terminal window
//  */
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
//
// /*
//  * The methodOverride() middleware is a workaround for HTTP methods that
//  * involve headers. It's not essential for this example but we'll leave it here
//  */
// app.use(methodOverride());
//
// /*
//  * Use CSRF
//  */
// app.use(cookieParser('CEAF3FA4-F385-49AA-8FE4-54766A9874F1'));
// app.use(session({
//     secret: '59B93087-78BC-4EB9-993A-A61FC844F6C9',
//     resave: true,
//     saveUninitialized: true
// }));
// app.use(csrf());
//
// /*
//  * To process LESS stylesheets into CSS ones, we utilize less-middleware in this manner
//  */
// app.use(require('less-middleware')(path.join(__dirname, 'public')));
// // The other static files are also in the public folder
// app.use(express.static(path.join(__dirname, 'public')));
//
// /*
//  * We expose CSRF to templates
//  */
// app.use(function (req, res, next) {
//     res.locals._csrf = req.csrfToken();
//     return next();
// });
//
// app.use(app.router);
//
// /*
//  * Development only
//  */
// if ('development' == app.get('env')) {
//     app.use(express.errorHandler());
// }
//
// /*
//  * When there's a request that matches route/RegExp with :task_id in it
//  * this block it executed
//  */
// app.param('task_id', function (req, res, next, taskId) {
//     req.db.tasks.findById(taskId, function (error, task) {
//         if (error) return next(error);
//         if (!task) return next (new Error('Task is not found'));
//         req.task = task;
//         return next();
//     });
// });
//
// /*
//  * Define our routes
//  */
// app.get('/', routes.index);
// app.get('/tasks', tasks.list);
// app.post('/tasks', tasks.markAllCompleted);
// app.post('/tasks', tasks.add);
// app.post('/tasks/:task_id', tasks.markCompleted);
// app.del('/tasks/:task_id', task.del);
// app.get('/tasks/completed', tasks.completed);
//
// /*
//  * In case of malicious attacks or mistyped URLs, it's a user-friendly
//  * thing to catch all requests with *
//  * Node.js won't come to execute this block
//  */
// app.all('*', function (req, res) {
//     res.send(404);
// });
//
// http.createServer(app).listen(app.get('port'), function () {
//     console.log('Express server listening on port ' + app.get('port'));
// });



