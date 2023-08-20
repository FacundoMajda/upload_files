import { sequelize, DataTypes } from "../db.js";

const ImageLocal = sequelize.define(
  "ImageLocal",
  {
    original_filename: DataTypes.STRING,
    format: DataTypes.STRING,
  },
  {
    sequelize,
    paranoid: true,
    modelName: "ImageLocal",
    tableName: "images_local",
    underscored: true,
  }
);

// Sincronizamos el modelo con la base de datos
console.log("ImageLocal");
ImageLocal.sync();

// Exportamos el modelo para su uso en otros archivos
export default ImageLocal;
