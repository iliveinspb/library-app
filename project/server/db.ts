import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/library'

async function connectToDatabase(): Promise<void> {
  await mongoose.connect(MONGODB_URI)
  console.log('Подключение к MongoDB установлено')
}

export default connectToDatabase
