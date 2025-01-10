import {Product} from "./product.model";
import {productsRepository} from "./products-db-repository";
import {v4} from "uuid";

export const productsService = {
    async findProducts(title: string | null | undefined): Promise<Product[]> {
        return productsRepository.findProducts(title)
    },

    async createProduct(title: string, url:string): Promise<Product> {
        const newProduct = {
            id: v4(),
            title,
            url
        } as Product

        return await productsRepository.createProduct(newProduct)
    },

    async getProductById(id: string): Promise<Product | null>  {
        return productsRepository.getProductById(id);
    },

    async updateProduct(id: string, title: string, url: string) {
        return productsRepository.updateProduct(id, title, url)
    },

    async deleteProduct(id: string) {
        return productsRepository.deleteProduct(id)
    }
}