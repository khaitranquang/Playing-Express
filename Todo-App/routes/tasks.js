/*
 *
 * GET users listing
 */

exports.list = function (req, res, next) {
    req.db.tasks.find({completed: false}).toArray(function (error, tasks) {
        if (error) return next(error);
        res.render('tasks', {
            title: 'Todo List',
            tasks: tasks || []
        });
    });
};

exports.add = function (req, res, next) {
    // Adding new task requires us to check for the name parameter
    if (!req.body || !req.body.name) return next(new Error('No data provide.'));
    req.db.tasks.save({
        name: req.body.name,
        createTime: new Date(),
        completed: false
    }, function (error, task) {
        if (error) return next(error);
        if (!task) return next(new Error('Failed to save.'));
        console.info('Added %s with id=%s', task.name, task._id);
        // We redirect back to the Todo List
        // page when the saving operation has finished successfully
        res.redirect('/tasks');
    });
};

/*
 * This method marks all incomplete tasks as complete
 */
exports.markAllCompleted = function (req, res, next) {
    // Because we had to reuse the POST route and since it's a good
    // illustration of flow control, we check for the all_done parameter
    // decide if this request comes from the 'all_done' button or the 'add' button
    if (!req.body.all_done || req.body.all_done !== 'true') return next();
    req.db.tasks.update(
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
};

exports.completed = function (req, res, next) {
    req.db.tasks.find({completed: true}).toArray(function (error, tasks) {
        res.render('tasks_completed', {
            title: 'Completed',
            tasks: tasks || []
        });
    });
};

exports.markCompleted = function (req, res, next) {
    if (!req.body.completed) return next(new Error('Param is missing'));
    var completed = req.body.completed === 'true';

    req.db.tasks.updateById(
        req.task._id,
        {$set: {completeTime: completed ? new Date(): null, completed: completed}},
        function (error, count) {
            if (error) return next(error);
            if (count !== 1) return next(new Error('Something went wrong.'));
            console.info('Marked task %s with id=%s completed.', req.task.name, req.task._id);
            res.redirect('/tasks');
        }
    );
};

exports.del = function (req, res, next) {
    req.db.tasks.removeById(req.task._id, function (error, count) {
        if (error) return next(error);
        if (count != 1) return next(new Error('Something went wrong.'));
        console.info('Deleted task %s with id=%s completed.', req.task.name, req.task._id);
        res.status(204).send();
    });
};