import express from "express";
import { crudPage, getHomePage, postCrudPage, displayCrud,editCrudPage, putCrudPage, deleteCrudPage } from "../controllers/homeController";
const router = express.Router();

export const initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/crud", crudPage);
  router.post('/post-crud', postCrudPage);
  router.get('/get-crud', displayCrud);
  router.get('/edit-crud', editCrudPage);
  router.post('/put-crud', putCrudPage);
  router.get('/delete-crud', deleteCrudPage);

  return app.use("/", router);
};
