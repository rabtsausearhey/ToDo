const tasksModel = require(process.cwd() + '/models/taskModels.js');
const hb = require('express-handlebars').create({

    partialsDir: process.cwd() + '/views/partials',
    layoutsDir: "views/layouts",
    defaultLayout: "base",
    extname: "hbs"

});

exports.renderHomePart = async (req, res) => {
    try {
        hb.render("views/partials/home_page.hbs").then((renderedHtml) => {
            res.json({"code": "ok", "message": "success", "html": renderedHtml});
        });
    } catch (e) {
        res.json({"code": "error", "message": e.message});
    }

};

exports.renderTasksPart = async (req, res) => {
    try {
        const taskPool = tasksModel.getTaskSortByStatus();
        const processing = taskPool.processing;
        const completed = taskPool.completed;
        const completedCount = completed.length;
        const processingCount = processing.length;

        hb.render("views/partials/tasks_page.hbs", {processing,completedCount, completed,processingCount})
            .then((renderedHtml) => {
                res.json({"code": "ok", "message": "success", "html": renderedHtml});
            });
    } catch (e) {
        res.json({"code": "error", "message": e.message});
    }
};

exports.renderSettingsPart = async (request, response) => {
    try {
        hb.render("views/partials/settings_page.hbs").then((renderedHtml) => {
            response.json({"code": "ok", "message": "success", "html": renderedHtml});
        });
    } catch (e) {
        response.json({"code": "error", "message": e.message});
    }
};
