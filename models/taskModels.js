const fs = require("fs");
module.exports.selectAllTasks = () => {
    const rawTaskPool = fs.readFileSync("database/tasks.json", "utf8");
    return JSON.parse(rawTaskPool);
};

module.exports.updateTasksPool = taskPool => {
    fs.writeFileSync("database/tasks.json", JSON.stringify(taskPool));
};

module.exports.getTaskSortByStatus = () => {
    const rawTaskPool = fs.readFileSync("database/tasks.json", "utf8");
    const taskPool = JSON.parse(rawTaskPool)["tasks"];

    const ret = {
        "processing": [],
        "completed": []
    };
    taskPool.forEach((val, index) => {
        if(val.status === 'completed!'){
            ret.completed.push(val)
        }else{
            ret.processing.push(val)
        }
    });
    return ret;
};


