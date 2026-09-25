import { MongoClient, ObjectId } from "mongodb"
process.loadEnvFile()

const URI_DB = process.env.URI_DB as string

const cliente = new MongoClient(URI_DB)

const db = cliente.db("biblioteca")
const bookCollection = db.collection("libros")

const connectDb = async () => {
    try {
        await cliente.connect()
        console.log(`conectado a MongoDb`)
    } catch(e){
        console.log(`Error al conectar a MongoDb`)
        process.exit(1)
    }
}

interface IBook {
    title: string
    author: string
    price: number
    stock: number
}

const createBook = async (title: string, author: string, price: number, stock: number) => {
   const newBook = {title, author, price, stock}
   return await bookCollection.insertOne(newBook)
}

const readBook = async () => {
    const books = await bookCollection.find().toArray()
    return books
}

const updateBook = async (id: string, data: IBook) =>  {
   const objectId = new ObjectId(id)
    await bookCollection.updateOne({_id: objectId}, {$set: data})

    return await bookCollection.findOne({ _id: objectId })
}

const deleteBook = async (id: string) =>  {
    const objectId = new ObjectId(id)
    return await bookCollection.deleteOne({_id: objectId})
}

await connectDb()
