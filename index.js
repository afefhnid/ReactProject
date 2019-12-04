
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from "./src/routes/route";
import database from './src/models/database';

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.use('/', router);

const port = 3002;
database().then(async () => {
    console.log('Database server is connect');
    app.listen(port, () => {
        console.log(`Serveur lancĂŠ sur le port ${port}...`)
    });
})

export default app;