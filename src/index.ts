import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";


const app = express()

dotenv.config();
const parserMiddleware = bodyParser.json({})
app.use(parserMiddleware);

const port = process.env.PORT || 5000;

app.get('/', (_req: Request, res: Response) => {
    let helloMessage = 'Hello World!';
    res.send(helloMessage)
})

let products = [
    {
        id: 1,
        title: 'tomato',
    },
    {
        id: 2,
        title: 'cucumber',
    }
]

let addresses = [
    {
        id: 1,
        value: 'sadovaya 20',
    },
    {
        id: 2,
        value: 'Nezalejnasti 12',
    }
]
app.get('/products', (req: Request, res: Response) => {
    if(req.query.title) {
        const product = products.filter((p) => p.title.includes(String(req.query.title)))
        res.json(product)
    } else {
        res.json(products)
    }
})

app.post('/products', (req: Request, res: Response) => {
    const newProduct = { id: +(new Date()), title: req.body.title }
    products.push(newProduct)

    if(req.body.title) {
        res.status(201).json(products);
    } else {
        res.json(404)
    }
})
app.put('/products/:id', (req: Request, res: Response) => {
    const product = products.find((product) => product.id === +req.params.id);
    if(product) {
        product.title = req.body.title
        res.json(product)
    } else {
        res.sendStatus(404)
    }
})

app.get('/products/:id', (req: Request, res: Response) => {
    const product = products.find((product) => product.id === +req.params.id);
    if(product) {
        res.json(product)
    } else {
        res.sendStatus(404)
    }
})
app.get('/products/:productTitle', (req: Request, res: Response) => {
    const product = products.find((product) => product.title === req.params.productTitle);

    if(product) {
        res.json(product)
    } else {
        res.sendStatus(404)
    }
})

app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses)
})
app.get('/addresses/:id', (req: Request, res: Response) => {
    const address = addresses.find((address) => address.id === +req.params.id);
    if(address) {
        res.json(address)
    } else {
        res.sendStatus(404)
    }
})
app.delete('/addresses/:id', (req: Request, res: Response) => {
    const filteredAdresses = addresses.filter((address) => address.id !== +req.params.id);
    const deletedAddress = addresses.find((a) => a.id === +req.params.id)
    addresses = filteredAdresses
    if(deletedAddress) {
        res.json(deletedAddress)
    } else {
        res.sendStatus(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})