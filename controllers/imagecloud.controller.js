// @ts-check
// Importamos las dependencias necesarias
import path from "path";
import { join } from "path";
import { myconfig } from "../public/js/config.js";
import ImageCloud from "../models/imagecloud.model.js";
import { unlink } from "fs";
import fileDirName from "../public/js/dirname.js";

const { __dirname } = fileDirName(import.meta);

// Controlador para listar imágenes en Cloudinary
const index = async (req, res) => {
  try {
    const images = await ImageCloud.findAll();

    if (!images || images.length === 0) {
      // Si no hay imágenes, enviamos un mensaje de error 404
      res.json({
        status: 404,
        message: "No hay imágenes registradas en Cloudinary aún.",
      });
      return;
    }

    // Enviamos las imágenes en formato JSON
    return res.json(images);
  } catch (error) {
    // Si ocurre un error, lo mostramos en la consola y enviamos un mensaje de error 500
    console.error(error);
    res.status(500).send("Ocurrió un error al cargar las imágenes.");
  }
};

// Controlador para subir una imagen a Cloudinary
const store = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    // Si no hay archivos en la solicitud, enviamos un mensaje de error 400
    return res.status(400).json({ mensaje: "No hay archivos que subir." });
  }

  const image = req.files.image;

  try {
    // Subimos la imagen a Cloudinary
    const cloudinaryUploadResult = await myconfig.uploader.upload(
      image.tempFilePath
    );

    // Creamos una nueva entrada en la base de datos con los datos de la imagen subida
    const newImage = await ImageCloud.create({
      public_id: cloudinaryUploadResult.public_id,
      url: cloudinaryUploadResult.secure_url,
      format: cloudinaryUploadResult.format,
    });

    // Eliminamos el archivo temporal de la imagen
    unlink(image.tempFilePath, function (error) {
      if (error) {
        console.error(error);
      }
    });

    // Redirigimos a la página de galería
    res.redirect("/gallery");
  } catch (error) {
    // Si ocurre un error, lo mostramos en la consola y enviamos un mensaje de error 500
    console.error(error);
    res.status(500).send("Ocurrió un error al subir la imagen a Cloudinary.");
  }
};

// Controlador para eliminar una imagen desde Cloudinary
const destroy = async (req, res) => {
  try {
    // Buscamos la imagen por su ID en la base de datos
    const image = await ImageCloud.findByPk(req.params.id);
    if (!image) {
      // Si la imagen no se encuentra, enviamos un mensaje de error 404
      return res.status(404).send("La imagen no fue encontrada.");
    }

    // Eliminamos la imagen desde Cloudinary
    await myconfig.uploader.destroy(image.public_id);

    // Eliminamos la entrada de la base de datos
    await image.destroy();

    // Redirigimos a la página de galería
    res.redirect("/gallery");
  } catch (error) {
    // Si ocurre un error, lo mostramos en la consola y enviamos un mensaje de error 500
    console.error(error);
    res
      .status(500)
      .send("Ocurrió un error al eliminar la imagen desde Cloudinary.");
  }
};

// Exportamos los controladores para su uso en las rutas
export { index, store, destroy };
