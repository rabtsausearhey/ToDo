const tasksModel = require(process.cwd() + '/models/taskModels.js');
exports.newTask = (req, res) => {
    try {
        const newTask = req.body;
        const taskPool = tasksModel.selectAllTasks();
        const id = taskPool.nextId;
        newTask.id = id;
        taskPool.nextId++;
        taskPool.count++;
        taskPool['tasks'].push(newTask);
        tasksModel.updateTasksPool(taskPool);
        res.json({"code": "ok", "message": "task was saved", id});
    } catch (e) {
        res.json({"code": "error", "message": e.message});
    }
};

exports.removeTask = (req, res) => {
    try {
        const id = parseInt(req.body.taskId);
        const taskPool = tasksModel.selectAllTasks();
        let check = false;
        taskPool.tasks.forEach((value, index) => {
            if (value.id === id) {
                taskPool.tasks.splice(index, 1);
                taskPool.count--;

                tasksModel.updateTasksPool(taskPool);
                check = true;
                return true;
            }
        });
        if (check) {
            res.json({"code": "ok", "message": "task was removed"});
        } else {
            res.json({"code": "error", "message": "task not fined"});
        }
    } catch (e) {
        res.json({"code": "error", "message": e.message});
    }
};

exports.updateTask = (req, res) => {
    try {
        const params = req.body;
        const id = parseInt(params.id);
        const status = params.status;
        const priority = params.priority;
        const content = params.content;
        const taskPool = tasksModel.selectAllTasks();
        let check = false;
        taskPool.tasks.forEach((val, index) => {
            if (val.id === id) {
                taskPool.tasks[index].status = status;
                taskPool.tasks[index].priority = priority;
                taskPool.tasks[index].content = content;
                tasksModel.updateTasksPool(taskPool);
                check = true;
                return true;
            }
        });
        if (check) {
            res.json({"code": "ok", "message": "task has been updated"});
        } else {
            res.json({"code": "error", "message": "task not find"});
        }
    } catch (e) {
        res.json({"code": "error", "message": e.message});
    }
};

exports.updateTaskStatus = (req, res) => {
    try {
        const params = req.body;
        const id = parseInt(params.id);
        const status = params.status;
        const taskPool = tasksModel.selectAllTasks();
        let check = false;
        taskPool.tasks.forEach((val, index) => {
            if (val.id === id) {
                taskPool.tasks[index].status = status;
                tasksModel.updateTasksPool(taskPool);
                check = true;
                return true;
            }
        });
        if (check) {
            res.json({"code": "ok", "message": "task status has been updated"});
        } else {
            res.json({"code": "error", "message": "task not find"});
        }
    } catch (e) {
        res.json({"code": "error", "message": e.message});
    }
};
