import {Product} from "./product.model";

let products: Product[] = [
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
    async findProducts(title: string | null | undefined): Promise<Product[]> {
        if(title) {
            return products.filter((p) => p.title.includes(String(title)))
        } else {
            return products
        }
    },

    async createProduct(title: string, url:string):Promise<Product | undefined> {
        const newProduct = { id: +(new Date()), title, url } as Product
        products.push(newProduct)

        if (title) {
            return newProduct;
        }
    },

    async getProductById(id: number)  {
        return products.find((product) => product.id === id);
    },

    async updateProduct(id: number, title: string, url: string) {
        let product =  products.find((product) => product.id === id);
        if (product) {
            product.title = title;
            product.url = url
            return true
        }

        return false
    },

    async deleteProduct(id: number) {
        const deletedProduct = products.find((product) => product.id === id)
        products = products.filter((product) => product.id !== id);

        return !!deletedProduct;
    }
}