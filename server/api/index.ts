import { loadAPIRoutes } from '@includes/functions'
import { Router } from 'express'

const api = Router()
export default api

loadAPIRoutes(api, ['games', 'players'])

// prevent fall thru
api.use((req, res) => res.status(404).send({"message": "Nope"}))
