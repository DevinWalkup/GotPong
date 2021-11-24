import { Router } from 'express'
import { CreateGameData, SetGameWinDisplayData } from '@includes/interfaces'
import { CreateGame, GetGame, SetGameWinDisplay } from '@server/providers/games'

const router = Router()
export default router

class APIError extends Error {
	constructor(public status: number, public message: string) {
		super(message)
	}

	toJSON() {
		return this.message
	}
}

router
	.post('/create', (req, res) => {
		let data : CreateGameData = req.body;
		if (!data.GameName || !data.Players) {
			return res.status(400).json('Game Name or players were not provided')
    }

    CreateGame(data).then((game) => {
      if (!game) {
        return res.status(500).send({"message": "There was an error creating the game!"});
      }
      return res.status(200).send({"game": game});
    }).catch((err) => {
      return res.status(500).send({"message": err.message});
    })
	})
  .patch('/setWinDisplay', (req, res) => {
    let data : SetGameWinDisplayData = req.body;

    if (!data.GameId) {
      return res.status(400).send({"message": "The game id is required!"});
    }

    SetGameWinDisplay(data).then((resp) => {
      return res.status(200).send({"game": resp});
    }).catch((err) => {
      return res.status(500).send({"message": err.message});
    })
  })
	.get('/join', (req, res) => {
		let gameCode = req.query.gameCode.toString();

    if (!gameCode) {
      return res.status(400).send({"message": "The game code was not provided!"});
    }

    GetGame(gameCode).then((game) => {
      if (!game) {
        return res.status(404).send({"message": "The game was not found!"});
      }

      return res.status(200).send({"game": game});
    }).catch((err) => {
      return res.status(500).send({"message": err.message});
    })
	})
