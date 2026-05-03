import { MongoClient, Db } from 'mongodb'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local')
  }

  cachedClient = new MongoClient(uri)
  cachedDb = cachedClient.db(process.env.MONGODB_DB_NAME || 'dynesis_tech')

  return { client: cachedClient, db: cachedDb }
}
