import express from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import {productsRouter} from "./routes/products-router";
import {adressesRouter} from "./routes/adresses-router";


const app = express()

dotenv.config();
const parserMiddleware = bodyParser.json({})
app.use(parserMiddleware);

const port = process.env.PORT || 5000;

app.use('/products', productsRouter)
app.use('/addresses', adressesRouter)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})