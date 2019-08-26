const express = require("express");
const webController = require("../controllers/web/webController.js");
const webRouter = express.Router();
webRouter.get("/", webController.renderHomePage);
webRouter.get("/tasks", webController.renderTasksPage);
webRouter.get("/settings", webController.renderSettingsPage)
module.exports = webRouter;
