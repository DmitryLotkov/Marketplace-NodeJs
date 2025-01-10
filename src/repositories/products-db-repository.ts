import {productCollection} from "./db";
import {Product} from "./product.model";

export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<Product[]> {
        let filter: Record<string, any> = {};

        if (title) {
            filter.title = { $regex: new RegExp(title, 'i') }; // 'i' делает поиск нечувствительным к регистру
        }

        return productCollection.find(filter).toArray();
    },

    async createProduct(newProduct: Product): Promise<Product> {
        await productCollection.insertOne(newProduct)

        return newProduct
    },

    async getProductById(id: string): Promise<Product | null>  {
        return await productCollection.findOne({id: id});
    },

    async updateProduct(id: string, title: string, url: string) {
        const result = await productCollection.updateOne({id: id}, {$set: { title: title}})
        return result.matchedCount === 1
    },

    async deleteProduct(id: string) {
        const result = await productCollection.deleteOne({id: id})
        return result.deletedCount === 1;
    }
}