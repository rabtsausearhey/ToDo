const apiRouter = require("./routes/apiRoutes.js");
const webRouter = require("./routes/webRoutes.js");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const express = require("express");
const hbs = require("hbs");

const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.set("views", "views/partials");
app.engine("hbs", expressHbs(
    {
        partialsDir: __dirname + "/views/partials",
        layoutsDir: "views/layouts",
        defaultLayout: "base",
        extname: "hbs"
    }
));

app.use(express.static(__dirname + "/public"));
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use("/api", urlencodedParser, apiRouter);
app.use("/", webRouter);
app.use((req, res, next) => {
    res.status(404).send("Not Found")
});

app.listen(3000);
