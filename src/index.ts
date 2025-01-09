import dotenv from 'dotenv';
import express from 'express';
import bodyParser from "body-parser";
import {productsRouter} from "./routes/products-router";
import {adressesRouter} from "./routes/adresses-router";
import {runDB} from "./repositories/db";

// Загружаем переменные окружения до импорта других модулей
dotenv.config();


const app = express()

const parserMiddleware = bodyParser.json({})

const port = process.env.PORT || 5000;

app.use(parserMiddleware);
app.use('/products', productsRouter)
app.use('/addresses', adressesRouter)


const startApp = async () => {
    await runDB()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()