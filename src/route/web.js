import express from "express";
import { crudPage, getHomePage, postCrudPage, displayCrud } from "../controllers/homeController";
const router = express.Router();

export const initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/crud", crudPage);
  router.post('/post-crud', postCrudPage);
  router.get('/get-crud', displayCrud);

  return app.use("/", router);
};
