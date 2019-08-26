const express = require("express");
const taskController = require("../controllers/api/apiTaskController.js");
const renderPartialsController = require("../controllers/api/renderPartialsController.js");

const apiRouter = express.Router();

apiRouter.post("/new-task", taskController.newTask);
apiRouter.delete("/remove-task", taskController.removeTask);
apiRouter.put("/update-task", taskController.updateTask);
apiRouter.put("/update-task-status", taskController.updateTaskStatus);

apiRouter.get("/home-page-content", renderPartialsController.renderHomePart);
apiRouter.get("/tasks-page-content", renderPartialsController.renderTasksPart);
apiRouter.get("/settings-page-content", renderPartialsController.renderSettingsPart);

module.exports = apiRouter;
