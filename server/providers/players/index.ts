import { AddPlayerData, CreatePlayerData, GameData, PlayerData } from '@includes/interfaces'
import Players from '@database/models/Players'
import Games from '@database/models/Games'
import { GameEntityToModel, GetGame, GetGameEntity } from '@server/providers/games'

export async function CreatePlayers(data: Array<CreatePlayerData>, game: Games): Promise<Array<Players>> {
  let createdPlayers: Array<Players> = new Array<Players>()
  for (let p = 0; p < data.length; p++) {
    let player: CreatePlayerData = data[p];
    let createdPlayer = await CreatePlayer(player, game);
    createdPlayers.push(createdPlayer)
  }

  return createdPlayers
}

async function CreatePlayer(data: CreatePlayerData, game: Games): Promise<Players> {
  let player: Players = new Players()

  player.PlayerName = data.PlayerName
  player.PlayerColor = data.PlayerColor
  player.Game = game;

  player = await Players.save(player)

  if (!player.PlayerId) {
    throw new Error('Error creating player')
  }

  return player
}

export async function AddPlayer(data: AddPlayerData): Promise<boolean> {
  let game : Games = await GetGameEntity(data.GameCode);

  await CreatePlayers(data.Players, game);

  return true;
}

export async function AddPlayerWin(playerId: string) : Promise<PlayerData> {
  let player : Players | undefined = await Players.findOne({
    where: {
      PlayerId: playerId
    },
    relations: ['Game']
  });

  if (!player) {
    throw new Error("The player was not found!");
  }

  player.Wins = Number(player.Wins) + 1;
  player = await Players.save(player);

  return PlayerEntityToModel(player);
}

export function PlayerEntityToModel(player: Players, game: Games | null = null): PlayerData {
  return {
    PlayerId: player.PlayerId,
    PlayerName: player.PlayerName,
    PlayerColor: player.PlayerColor,
    Wins: player.Wins,
    GameId: !game ? player.Game.GameId : game.GameId
  }
}
