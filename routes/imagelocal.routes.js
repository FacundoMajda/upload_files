import express from "express";
import {
  index,
  // createView,
  show,
  store,
  // update,
  destroy,
} from "../controllers/imagelocal.controller.js";

const routerLocal = express.Router();
// API CRUD

routerLocal.get("/local/api", index);
routerLocal.get("/local/api/:id/show", show);
routerLocal.post("/local/api", store);
routerLocal.delete("/local/api/:id/destroy", destroy);

export default routerLocal;
