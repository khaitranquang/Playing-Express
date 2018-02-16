/*
 *
 * GET users listing
 */

var MongoClient = require('mongodb').MongoClient;

exports.list = function (req, res, next) {
    MongoClient.connect(
        'mongodb://127.0.0.1:27017/todolist',
        function (err, connection) {
            var collection = connection.collection('tasks');
            collection.find({completed:false}).toArray(function (mongoError, document) {
                if (mongoError) return next(mongoError);
                res.render('tasks', {
                    title: 'Todo List',
                    tasks: document || []
                });
            });
        }
    )
};

exports.add = function (req, res, next) {
    if (!req.body || !req.body.name) return next(new Error('No data provide'));
    MongoClient.connect(
        'mongodb://127.0.0.1:27017/todolist',
        function (err, connection) {
            var collection = connection.collection('tasks');
            collection.insert(
                {
                    'name': req.body.name,
                    'createTime': new Date(),
                    'completed': false
                },
                function (error, document) {
                    if (error) return next(error);
                    if (!document) return next(new Error('Failed to save.'));
                    console.log('Insert successfully');
                    res.redirect('/tasks');
                }
            )
        }
    )
};

/*
 * This method marks all incomplete tasks as complete
 */
exports.markAllCompleted = function (req, res, next) {
    // Because we had to reuse the POST route and since it's a good
    // illustration of flow control, we check for the all_done parameter
    // decide if this request comes from the 'all_done' button or the 'add' button
    if (!req.body.all_done || req.body.all_done !== 'true') return next();

    MongoClient.connect(
        'mongodb://127.0.0.1:27017/todolist',
        function (err, connection) {
            var collection = connection.collection('tasks');
            collection.update(
                {
                    completed: false
                },
                {
                    $set: {
                        completeTime: new Date(),
                        completed: true
                    }
                },
                {
                    multi: true
                },
                function (error, count) {
                    if (error) return next(error);
                    console.info('Marked %s task(s) completed.', count);
                    res.redirect('/tasks');
                }
            );
        }
    )
};

exports.completed = function (req, res, next) {
    MongoClient.connect(
        'mongodb://127.0.0.1:27017/todolist',
        function (err, connection) {
            if (err) {
                console.log('Cant connect to database');
                return;
            }
            var collection = connection.collection('tasks');
            collection.find({completed:true}).toArray(function (mongoError, document) {
                if (mongoError) return next(mongoError);
                res.render('tasks_completed', {
                    title: 'Completed',
                    tasks: document || []
                });
            });
        }
    )
};

exports.markCompleted = function (req, res, next) {
    if (!req.body.completed) return next(new Error('Param is missing'));

    var completed = req.body.completed === 'true';

    MongoClient.connect(
        'mongodb://127.0.0.1:27017/todolist',
        function (err, connection) {
            if (err) {
                console.log('Cant connect to database');
                return;
            }
            var collection = connection.collection('tasks');
            var id = req.body.id.toString();
            console.log(id);

            var ObjectID = require('mongodb').ObjectID;

            collection.updateOne(
                {'_id': ObjectID(id)},
                {$set: {completeTime: completed ? new Date(): null, completed: completed}},
                function (error, count) {
                    if (error) return next(error);
                    res.redirect('/tasks');
                }
            );
        }
    );
};

exports.del = function (req, res, next) {
    MongoClient.connect(
        'mongodb://127.0.0.1:27017/todolist',
        function (err, connection) {
            if (err) {
                console.log('Cant connect to database');
                return;
            }
            var collection = connection.collection('tasks');
            var ObjectID = require('mongodb').ObjectID;
            collection.removeOne(
                {'_id': ObjectID(req.body.id)},
                function (error, result) {
                    if (error) return next(error);
                    console.log('Delete successfully');
                    res.status(204).send();
                }
            );
        }
    )
};