import {Request, Response, Router} from "express";
import {adressesRepository} from "../repositories/adresses-repository";

export const adressesRouter = Router({});

adressesRouter.get('/', (req: Request, res: Response) => {
    const allAdresses = adressesRepository.getAllAdresses()
    res.send(allAdresses)
})
adressesRouter.get('/:id', (req: Request, res: Response) => {
    const addressById = adressesRepository.getAddressById(+req.params.id);
    if(addressById) {
        res.json(addressById)
    } else {
        res.sendStatus(404)
    }
})
adressesRouter.delete('/:id', (req: Request, res: Response) => {
    const isAddressDelete = adressesRepository.deleteAddress(+req.params.id)
    if(isAddressDelete) {
        res.status(204).send("Адрес успешно удален")
    } else {
        res.sendStatus(404)
    }
})