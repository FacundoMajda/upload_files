const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const ejs = require("ejs");
const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const port = process.env.PORT || 4000;

//variables de entorno
dotenv.config({ path: ".env" });

const { sequelize } = require("./db.js");

// Configurar EJS como motor de plantillas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// default options
app.use(
  fileUpload({
    useTempFiles: false,
  })
);

// Se ejecuta una instancia de conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a base de datos exitosa");
  })
  .catch((error) => console.log("Error al conectar a base de datos", error));

app.use("/", require("./routes/file.routes"));

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
