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
export const adressesRepository = {
    getAllAdresses() {
        return addresses
    },

    getAddressById(id: number) {
        return addresses.find((address) => address.id === id);
    },

    deleteAddress(id: number) {
        const deletedAddress = addresses.find((address) => address.id === id)
        addresses = addresses.filter((address) => address.id !== id);

        return !!deletedAddress;
    }
}