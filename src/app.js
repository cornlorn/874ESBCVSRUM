import 'dotenv/config';
import express from 'express';
import { database } from './config/database.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {await database();

    app.listen(port, () => {
        console.log(`El servidor se está ejecutando en: http://localhost:${port}`);
    });
} catch (error) {
    console.error('Error al ejecutar el servidor:', error);
}
