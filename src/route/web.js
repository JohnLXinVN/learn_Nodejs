import express from 'express';
import { getHomePage } from '../controllers/homeController';
const router = express.Router()

export const initWebRoutes = (app) => {
    router.get('/', getHomePage)
    return app.get("", router);
}