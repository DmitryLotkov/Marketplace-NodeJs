import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";

export const productsRouter = Router({});

productsRouter.get('/', (req: Request, res: Response) => {
    const foundProducts = productsRepository.findProducts(req.query?.title as string | undefined)
    res.json(foundProducts)
})

productsRouter.post('/', (req: Request, res: Response) => {
    const newProducts = productsRepository.createProduct(req.body.title)
    res.status(201).json(newProducts);
})

productsRouter.put('/:id', (req: Request, res: Response) => {
    const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title);

    if (isUpdated) {
        let product = productsRepository.getProductById(+req.params.id)
        res.json(product)
    } else {
        res.sendStatus(404)
    }
})

productsRouter.get('/:id', (req: Request, res: Response) => {
    const product = productsRepository.getProductById(+req.params.id);
    if(product) {
        res.json(product)
    } else {
        res.sendStatus(404)
    }
});

productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isProductDelete = productsRepository.deleteProduct(+req.params.id)
    if(isProductDelete) {
        res.status(204).send("Продукт успешно удален")
    } else {
        res.sendStatus(404)
    }
})