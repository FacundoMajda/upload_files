//@ts-check

import "dotenv/config";
import { join } from "path";
import { unlink } from "fs";
import fileDirName from "./public/js/dirname.js";
import express from "express";
import path from "path";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import ejs from "ejs";
import { sequelize } from "./db.js";

import routerLocal from "./routes/imagelocal.routes.js";
// import routerCloud from "./routes/imagecloud.routes.js";
import views from "./routes/index.routes.js";

const app = express();
const port = process.env.PORT || 4000;

const { __dirname } = fileDirName(import.meta);

// Routes setup
app.use("/local", routerLocal);
// app.use("/cloud", routerCloud);
app.use("/", views);

// static files
app.use(express.static("public"));

//configuración del motor de plantillas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Carpeta public para archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: true,
  })
);
app.use(morgan("dev"));

// fileupload & default options
app.use(fileUpload());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a base de datos exitosa");
  } catch (error) {
    console.log("Error al conectar a base de datos", error);
  }
  console.log(`Servidor en ${process.env.APP_URL}:${port}`);
});
