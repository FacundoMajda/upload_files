import express from "express";
import {
  index,
  // createView,
  // show,
  store,
  // update,
  destroy,
} from "../controllers/imagecloud.controller.js";

const routerCloud = express.Router();

// API CRUD
routerCloud.get("/cloudinary/api", index);
routerCloud.post("/cloudinary/api", store);
routerCloud.delete("/cloudinary/api/:id/destroy", destroy);

export default routerCloud;
