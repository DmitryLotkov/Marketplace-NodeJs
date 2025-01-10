import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {productsService} from "../repositories/product-service";

export const productsRouter = Router({});

productsRouter.get('/', async (req: Request, res: Response) => {
    const foundProducts = await productsService.findProducts(req.query?.title as string | undefined)
    res.json(foundProducts)
})

const titleValidation = body('title').trim().isLength({ min: 3, max: 10 }).withMessage('title length should be form 3 to 10 symbols');
const urlValidation = body('url').trim().isURL().withMessage('the passed string does not match the URL pattern');

productsRouter.post('/',
    titleValidation,
    urlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

    const newProducts = await productsService.createProduct(req.body.title, req.body.url)
    res.status(201).json(newProducts);
})

productsRouter.put('/:id',
    titleValidation,
    urlValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
    const isUpdated = await productsService.updateProduct(req.params.id, req.body.title, req.body.url);

    if (isUpdated) {
        let product = await productsService.getProductById(req.params.id)
        res.json(product)
    } else {
        res.sendStatus(404)
    }
})

productsRouter.get('/:id', async (req: Request, res: Response) => {
    const product = await productsService.getProductById(req.params.id);
    if(product) {
        res.json(product)
    } else {
        res.sendStatus(404)
    }
});

productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isProductDelete = await productsService.deleteProduct(req.params.id)
    if(isProductDelete) {
        res.status(204).send("Продукт успешно удален")
    } else {
        res.sendStatus(404)
    }
})