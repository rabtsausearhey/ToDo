exports.renderHomePage = function (request, response){
    response.render("home_page.hbs");
};

exports.renderTasksPage = function (request, response){
    response.render("tasks_page.hbs");
};

exports.renderSettingsPage = function (request, response){
    response.render("settings_page.hbs");
};
