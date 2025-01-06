let products = [
    {
        id: 1,
        title: 'tomato',
        url: "https://marketplace-nodejs.onrender.com/products/2"
    },
    {
        id: 2,
        title: 'cucumber',
        url: 'http://4pda.ru/'
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

    createProduct(title: string, url:string) {
        const newProduct = { id: +(new Date()), title, url }
        products.push(newProduct)

        if (title) {
            return newProduct;
        }
    },

    getProductById(id: number)  {
        return products.find((product) => product.id === id)
    },

    updateProduct(id: number, title: string, url: string) {
        let product =  products.find((product) => product.id === id);
        if (product) {
            product.title = title;
            product.url = url
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