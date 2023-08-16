const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
// const ejs = require("ejs");
const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");
const createError = require("http-errors");

//environment
dotenv.config({ path: ".env" });
const app = express();
const port = process.env.PORT || 4000;

const { sequelize } = require("./db.js");

// // Configurar EJS como motor de plantillas
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// static files
app.use(express.static("public"));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// static files
app.use(express.static("public"));

app.use(fileUpload());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// default options
app.use(
  fileUpload({
    useTempFiles: false,
  })
);

// app.use("/", require("./routes/file.routes"));

// upload signing API
app.use("/api/signupload", signuploadRouter);
app.use("/api/signuploadform", signuploadformRouter);

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

app.listen(port, async () => {
  try {
    sequelize.authenticate().then(() => {
      console.log("Conexión a base de datos exitosa");
    });
  } catch {
    (error) => console.log("Error al conectar a base de datos", error);
  }
  console.log(`Servidor escuchando en el puerto ${port}`);
});
