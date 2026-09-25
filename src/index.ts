import { MongoClient, ObjectId } from "mongodb"
process.loadEnvFile()

const URI_DB = process.env.URI_DB as string

const cliente = new MongoClient(URI_DB)

const db = cliente.db("biblioteca")
const bookCol = db.collection("libros")

const connectDb = async (URI: string) => {
    try {
        
        console.log(`conectado a MongoDb`)
    } catch(e){
        console.log(`Error al conectar a MongoDb`)
        process.exit(1)
    }
}

interface IBook {
    title: string
    autor: string
    price: number
    stock: number
}

const bookSchema = new Schema<IBook>({
    title: String,
    autor: String,
    price: Number,
    stock: Number
})