import {Request, Response, Router} from "express";

export const adressesRouter = Router({});

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


adressesRouter.get('/', (req: Request, res: Response) => {
    res.send(addresses)
})
adressesRouter.get('/:id', (req: Request, res: Response) => {
    const address = addresses.find((address) => address.id === +req.params.id);
    if(address) {
        res.json(address)
    } else {
        res.sendStatus(404)
    }
})
adressesRouter.delete('/:id', (req: Request, res: Response) => {
    const filteredAdresses = addresses.filter((address) => address.id !== +req.params.id);
    const deletedAddress = addresses.find((a) => a.id === +req.params.id)
    addresses = filteredAdresses
    if(deletedAddress) {
        res.json(deletedAddress)
    } else {
        res.sendStatus(404)
    }
})