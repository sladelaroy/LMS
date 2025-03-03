import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import { clerkWebHooks } from './controllers/webhooks.js'

const app = express()

await connectDB()

app.use(cors())




app.get('/', (req, res) => {
  res.send("APi working")
})

app.post('/clerk', express.json(), clerkWebHooks)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

