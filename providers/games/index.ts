import { CreateGameData, GameData, PlayerData, RemoveGameData, SetGameWinDisplayData } from '../../includes/interfaces'
import { PlayerEntityToModel } from '../players'
import { generateGameCode } from '../../includes/functions'
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export async function CreateGame(data: CreateGameData) : Promise<GameData> {
  let game = await prisma.game.create({
    data: {
      GameName: data.GameName,
      GameCode: generateGameCode(),
      ViewWinsAsRomanNumerals: data.ViewWinsAsRomanNumerals,
      CreateDate: new Date().toISOString(),
      Players: {
        createMany: {
          data: data.Players.map((player) => {
            return {
              PlayerName: player.PlayerName,
              PlayerColor: player.PlayerColor,
              CreateDate: new Date().toISOString()
            }
          })
        }
      }
    },
    include: {
      Players: true
    }
  })

  if (!game.GameId) {
    throw new Error("Error creating the game!");
  }

  return GameEntityToModel(game);
}

export async function GetGame(gameCode: string) : Promise<GameData> {
  let game = await GetGameEntity(gameCode);

  return GameEntityToModel(game);
}

export async function GetGameEntity(gameCode: string) : Promise<any> {
  let game = await prisma.game.findFirst({
    where: {
      GameCode: gameCode
    },
    include: {
      Players: true
    }
  })

  if (!game) {
    throw new Error("The game was not found!");
  }

  return game;
}

export async function SetGameWinDisplay(data: SetGameWinDisplayData): Promise<GameData> {
  let game = await prisma.game.update({
    where: {
      GameId: data.GameId
    },
    data: {
      ViewWinsAsRomanNumerals: data.ViewWinsAsRomanNumerals,
      UpdateDate: new Date().toISOString()
    },
    include: {
      Players: true
    }
  });

  if (!game) {
    throw new Error("The game was not found!");
  }

  return GameEntityToModel(game);
}

export function GameEntityToModel(game) : GameData {
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

export async function DeleteGame(gameId: string) : Promise<boolean> {
  try {
    let deletePlayers = prisma.player.deleteMany({
      where: {
        GameId: gameId
      }
    })

    let deleteGame = prisma.game.delete({
      where: {
        GameId: gameId
      }
    });

    await prisma.$transaction([deletePlayers, deleteGame]);
  }
  catch (e) {
    console.error(e);
    return false;
  }

  return true;
}
