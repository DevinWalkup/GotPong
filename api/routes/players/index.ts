import express from "express";
import {AddPlayer, AddPlayerWin} from "../../../providers/players";
import {AddPlayerData} from "@includes/interfaces";

const app = express();

app.post('/newPlayer', (req, res) => {
  let playerData : AddPlayerData = req.body;

  if (playerData.Players.some((player) => !player.PlayerName) || !playerData.GameCode) {
    return res.status(400).send({"message": "The player(s) is missing required information!"});
  }

  AddPlayer(playerData).then((resp) => {
    if (!resp) {
      return res.status(500).send({"message": "There was an error adding the player(s)!"});
    }

    return res.status(200).send({"success": resp});
  }).catch((err) => {
    return res.status(500).send({"message": err.message});
  })
})
  .patch('/addWin', (req, res) => {
    let playerId = req.body.PlayerId;

    if (!playerId) {
      return res.status(400).send({"message": "The player id was not provided!"});
    }

    AddPlayerWin(playerId).then((resp) => {
      return res.status(200).send({"player": resp});
    }).catch((err) => {
      return res.status(500).send({"message": err.message});
    })
  })

export default app;
