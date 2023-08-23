import express from "express";
import { index, store, destroy } from "../controllers/imagecloud.controller.js";

const routerCloud = express.Router();

// API CRUD
routerCloud.get("/cloud", index);
routerCloud.post("/cloud/crear", store);
routerCloud.delete("/cloud/:id/destroy", destroy);

export default routerCloud;
