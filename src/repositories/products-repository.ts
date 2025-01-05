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

export const productsRepository = {
    findProducts(title: string | null | undefined) {
        if(title) {
            return products.filter((p) => p.title.includes(String(title)))
        } else {
            return products
        }
    },

    createProduct(title: string) {
        const newProduct = { id: +(new Date()), title }
        products.push(newProduct)

        if (title) {
            return products;
        }
    },

    getProductById(id: number)  {
        return products.find((product) => product.id === id)
    },

    updateProduct(id: number, title: string) {
        let product =  products.find((product) => product.id === id);
        if (product) {
            product.title = title;
            return true
        }

        return false
    },

    deleteProduct(id: number) {
        const deletedProduct = products.find((product) => product.id === id)
        products = products.filter((product) => product.id !== id);

        return !!deletedProduct;
    }
}