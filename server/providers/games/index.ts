import { CreateGameData, GameData, PlayerData, SetGameWinDisplayData } from '@includes/interfaces'
import Games from '@database/models/Games'
import { CreatePlayers, PlayerEntityToModel } from '@server/providers/players'
import { generateGameCode } from '@includes/functions'

export async function CreateGame(data: CreateGameData) : Promise<GameData> {
  let game: Games = new Games();

  game.GameName = data.GameName;
  game.GameCode = generateGameCode();

  game = await Games.save(game)

  if (!game.GameId) {
    throw new Error("Error creating the game!");
  }

  try {
  game.Players = await CreatePlayers(data.Players, game);
  }
  catch (e) {
    await Games.delete(game);
    throw e;
  }

  return GameEntityToModel(game);
}

export async function GetGame(gameCode: string) : Promise<GameData> {
  let game : Games = await GetGameEntity(gameCode);

  if (!game) {
    throw new Error("The game was not found!");
  }

  return GameEntityToModel(game);
}

export async function GetGameEntity(gameCode: string) : Promise<Games> {
  let game: Games | undefined = await Games.findOne({
    where: {
      GameCode: gameCode
    },
    relations: ['Players']
  });

  if (!game) {
    throw new Error("The game was not found!");
  }

  return game;
}

export async function SetGameWinDisplay(data: SetGameWinDisplayData): Promise<GameData> {
  let game: Games | undefined = await Games.findOne({
    where: {
      GameId: data.GameId
    },
    relations: ['Players']
  });

  if (!game) {
    throw new Error("The game was not found!");
  }

  game.ViewWinsAsRomanNumerals = data.ViewWinsAsRomanNumerals;
  game = await Games.save(game);

  return GameEntityToModel(game);
}

export function GameEntityToModel(game: Games) : GameData {
  let players: Array<PlayerData> = new Array<PlayerData>();

  game.Players.forEach((player) => {
    players.push(PlayerEntityToModel(player, game));
  })

  return {
    GameId: game.GameId,
    GameName: game.GameName,
    GameCode: game.GameCode,
    ViewWinsAsRomanNumerals: game.ViewWinsAsRomanNumerals,
    Players: players
  }
}
