import mongoose from 'mongoose'

import { env } from './env'

export const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri)
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ MongoDB connection failed', error)
    process.exit(1)
  }
}


