import express from "express";
import {
  index,
  store,
  show,
  destroy,
} from "../controllers/imagelocal.controller.js";

const routerLocal = express.Router();
// API CRUD

routerLocal.get("/local/", index);
routerLocal.get("/local/:id/show", show);
routerLocal.post("/local/crear", store);
routerLocal.delete("/local/:id/destroy", destroy);

export default routerLocal;
