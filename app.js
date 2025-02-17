const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");

require("./routes/db");

const indexRouter = require("./routes/index");
const shopingCart = require("./routes/shoping-cart/shopingCart");
const product = require("./routes/product/product");
const about = require("./routes/about/about");
const blog = require("./routes/blog/blog");
const contact = require("./routes/contact/contact");
const admin = require("./routes/admin/admin");
const user = require("./routes/user/user");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(cors());
app.use(bodyparser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/shoping-cart", shopingCart);
app.use("/product", product);
app.use("/about", about);
app.use("/blog", blog);
app.use("/contact", contact);
app.use("/login", user);
app.use("/admin", admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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
