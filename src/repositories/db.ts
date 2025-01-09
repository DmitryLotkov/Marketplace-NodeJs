import {MongoClient, ServerApiVersion} from 'mongodb';
import {Product} from "./product.model";


const localMongoStr = "mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority"
const uri = process.env.MONGO_URI as string || localMongoStr;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const db = client.db('shop');
export const productCollection = db.collection<Product>('products');
export async function runDB() {
    try {
        await client.connect();
        if (uri.includes('+srv')) {
            console.log("You successfully connected to remote MongoDB!");
        } else {
            console.log("You successfully connected to local MongoDB!");
        }
    }
    catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error);
    }
}
