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
    } catch{
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

const args = process.argv.splice(2)
const action = args[0]

const createBook = async (title: string, author: string, price: number, stock: number) => {
   const newBook = {title, author, price, stock}
   return bookCollection.insertOne(newBook)
}

const readBooks = async () => {
    return bookCollection.find().toArray()
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

switch (action) {
    case "info":
        console.log(`
            Comandos disponibles:
            read = obtener todos los libros
            create = crear un libro
            update id = actualizar un libro
            delete id = eliminar un libro
        `)
        break

    case "read":
        console.log(await readBooks())
        break

    case "create":
    const title = args[1]
    const author = args[2]
    const price = Number(args[3])
    const stock = Number(args[4])

    if (title === undefined || author === undefined || args[3] === undefined || args[4] === undefined) {
        console.log("Faltan datos")
        process.exit(1)
    }

    if (isNaN(price) || isNaN(stock)) {
    console.log("El precio y stock deben ser números")
    process.exit(1)
    }

    console.log(await createBook(title, author, price, stock))
    break

    case "update":
    const idUpdate = args[1]
    const titleUpdate = args[2]
    const authorUpdate = args[3]
    const priceUpdate = Number(args[4])
    const stockUpdate = Number(args[5])

    if (idUpdate === undefined || titleUpdate === undefined || authorUpdate === undefined || args[4] === undefined || args[5] === undefined) {
        console.log("Faltan datos")
        process.exit(1)
    }

    if (isNaN(priceUpdate) || isNaN(stockUpdate)) {
    console.log("El precio y stock deben ser números")
    process.exit(1)
    }

    if (!ObjectId.isValid(idUpdate)) {
    console.log("El ID proporcionado no es válido")
    process.exit(1)
}

    const data: IBook = {
        title: titleUpdate,
        author: authorUpdate,
        price: priceUpdate,
        stock: stockUpdate
    }

    console.log(await updateBook(idUpdate, data))
    break

    case "delete":
    const idDelete = args[1]

    if (idDelete === undefined) {
        console.log("Debes proporcionar un ID")
        process.exit(1)
    }

    if (!ObjectId.isValid(idDelete)) {
    console.log("El ID proporcionado no es válido")
    process.exit(1)
}

    const result = await deleteBook(idDelete)

    if (result.deletedCount === 1) {
        console.log("Libro eliminado correctamente")
    } else {
        console.log("No se encontró un libro con ese ID")
    }

    break
    
    default:
        console.log(`
            Comandos no reconocido. Los comandos disponibles son:
            info = comandos disponibles
            read = obtener todos los libros
            create = crear un libro
            update id = actualizar un libro
            delete id = eliminar un libro
        `)
}

await cliente.close()