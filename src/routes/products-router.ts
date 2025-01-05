import {Request, Response, Router} from "express";

export const productsRouter = Router({});

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
productsRouter.get('/', (req: Request, res: Response) => {
    if(req.query.title) {
        const product = products.filter((p) => p.title.includes(String(req.query.title)))
        res.json(product)
    } else {
        res.json(products)
    }
})

productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = { id: +(new Date()), title: req.body.title }
    products.push(newProduct)

    if(req.body.title) {
        res.status(201).json(products);
    } else {
        res.json(404)
    }
})
productsRouter.put('/:id', (req: Request, res: Response) => {
    const product = products.find((product) => product.id === +req.params.id);
    if(product) {
        product.title = req.body.title
        res.json(product)
    } else {
        res.sendStatus(404)
    }
})
productsRouter.get('/:id', (req: Request, res: Response) => {
    const product = products.find((product) => product.id === +req.params.id);
    if(product) {
        res.json(product)
    } else {
        res.sendStatus(404)
    }
});