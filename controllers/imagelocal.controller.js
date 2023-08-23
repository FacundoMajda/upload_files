// @ts-check
import path from "path";
import { join } from "path";
import ImageLocal from "../models/imagelocal.model.js";
import { unlink } from "fs";
import fileDirName from "../public/js/dirname.js";

const { __dirname } = fileDirName(import.meta);

const index = async (req, res) => {
  try {
    const images = await ImageLocal.findAll();

    if (!images || images.length === 0) {
      res.json({
        status: 404,
        message: "No hay imágenes registradas localmente aún.",
      });
      return;
    }

    return res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocurrió un error al cargar las imágenes locales.");
  }
};

const show = async (req, res) => {
  try {
    const image = await ImageLocal.findByPk(req.params.id);
    if (!image) {
      return res.status(404).send("La imagen no fue encontrada.");
    }

    const imagePath = path.join(__dirname, "../files/", `${image.filename}`);
    res.sendFile(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocurrió un error al cargar la imagen local.");
  }
};

const store = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ mensaje: "No hay archivos que subir." });
  }

  const image = req.files.image;
  const originalFilename = image.name.split(".")[0];
  const format = image.name.split(".")[1];

  try {
    const imageExists = await ImageLocal.findOne({
      where: {
        filename: originalFilename,
      },
    });

    if (imageExists) {
      return res
        .status(400)
        .json({ mensaje: "La imagen ya existe en la base de datos local." });
    }

    const uploadPath = path.join(__dirname, "../files/tmp/", image.name);

    image.mv(uploadPath, function (err) {
      if (err) return res.status(500).json(err);
    });

    const newImage = await ImageLocal.create({ filename: originalFilename });

    res.status(201).json({ success: "Imagen subida correctamente." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al subir la imagen local." });
  }
};

const destroy = async (req, res) => {
  try {
    const image = await ImageLocal.findByPk(req.params.id);
    if (!image) {
      return res.status(404).send("La imagen no fue encontrada.");
    }

    const imagePath = path.join(
      __dirname,
      "../files/",
      `${image.original_filename}`
    );
    unlink(imagePath, function (error) {
      if (error && error.code === "ENOENT") {
        return res
          .status(404)
          .json({ message: "El archivo no existe en local." });
      } else if (error) {
        return res.status(500).json({
          message: "Ocurrió un error al querer eliminar el archivo: " + error,
        });
      }
    });

    await image.destroy();
    res.json({ success: "Imagen local eliminada correctamente." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al eliminar la imagen local." });
  }
};

export { index, show, store, destroy };
