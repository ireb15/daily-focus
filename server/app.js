var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var todoRouter = require("./routes/todo");
var loginRouter = require("./routes/login");
var signupRouter = require("./routes/signup");
var verifyTokenRouter = require("./routes/verifyToken");
var cors = require('cors');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// use cors before all route definitions
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Redirect to HTTP API endpoint routers
app.use("/", indexRouter);
app.use("/todo", todoRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/verifyToken", verifyTokenRouter);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
