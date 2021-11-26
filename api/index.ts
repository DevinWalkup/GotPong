// index.js
import express from 'express'
import { PrismaClient } from '@prisma/client'
import GameRoute from './routes/games'
import PlayerRoute from './routes/players'


const app = express()

app.use(express.json())
app.use(GameRoute);
app.use(PlayerRoute);

export default {
  path: '/api',
  handler: app
}
