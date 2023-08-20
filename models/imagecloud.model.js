// Importamos las dependencias necesarias
import { sequelize, DataTypes } from "../db.js";

// Definimos el modelo de la imagen en Cloudinary
const ImageCloud = sequelize.define(
  "ImageCloud",
  {
    original_filename: DataTypes.STRING,
    format: DataTypes.STRING,
    resource_type: DataTypes.STRING,
    url: DataTypes.TEXT,
    secure_url: DataTypes.TEXT,
    asset_id: DataTypes.STRING,
    public_id: DataTypes.STRING,
    version_id: DataTypes.STRING,
    creation: DataTypes.DATE,
  },
  {
    sequelize,
    paranoid: true,
    modelName: "ImageCloud",
    tableName: "images_cloud",
    underscored: true,
  }
);

// Sincronizamos el modelo con la base de datos
console.log("ImageCloud");
ImageCloud.sync();

// Exportamos el modelo para su uso en otros archivos
export default ImageCloud;
