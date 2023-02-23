import express from 'express';
import bodyParser from 'body-parser';
import { configViewEngine } from './config/viewEngine';
import { initWebRoutes } from './route/web';

require('dotenv').config()


let app = express();

//confid app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

configViewEngine(app)
initWebRoutes(app)

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log(`Back end is running on the port: ${port}`)
});