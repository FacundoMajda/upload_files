//@ts-check
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import ejs from "ejs";
import createError from "http-errors";
import { sequelize } from "./db.js";

import routerLocal from "./src/routes/imagelocal.routes.js";
import routerCloud from "./src/routes/imagecloud.routes.js";
import views from "./src/routes/galeria.routes.js";

const app = express();
const port = process.env.PORT || 4000;

// Routes setup
app.use("/upload/local", routerLocal);
app.use("/upload/cloudinary", routerCloud);
app.use("/galeria", views);

// static files
app.use(express.static("public"));

// Configurar el motor de plantillas EJS
app.set("views", path.join(__dirname, "views")); // Establecer la ubicación de las vistas
app.set("view engine", "ejs"); // Usar EJS como motor de plantillas

// Middlewares
app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// fileupload & default options
app.use(fileUpload());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

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
    await sequelize.authenticate();
    console.log("Conexión a base de datos exitosa");
  } catch (error) {
    console.log("Error al conectar a base de datos", error);
  }
  console.log(`Servidor escuchando en el puerto ${port}`);
});
