import {
  CreateGameData,
  GameData,
  PlayerData,
  SetGameWinDisplayData
} from '../../includes/interfaces'
import { PlayerEntityToModel, SetPlayingUsers, SetUpNextUsers } from '../players'
import { generateGameCode } from '../../includes/functions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function CreateGame(data: CreateGameData): Promise<GameData> {
  let game = await prisma.game.create({
    data: {
      GameName: data.GameName,
      GameCode: generateGameCode(),
      ViewWinsAsRomanNumerals: data.ViewWinsAsRomanNumerals,
      CreateDate: new Date().toISOString(),
      PlayersPerRound: Number(data.PlayersPerRound),
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
    throw new Error('Error creating the game!')
  }

  let returnGame = async() => {
    return GameEntityToModel(await prisma.game.findFirst({
      where: {
        GameId: game.GameId
      },
      include: {
        Players: true
      }
    }))
  }

  let playingUsers = game.Players.splice(0, data.PlayersPerRound).map((player) => player.PlayerId);

  if (!await SetPlayingUsers(playingUsers)) {
    throw new Error("Error setting the playing users!");
  }

  if (data.Players.length === data.PlayersPerRound) {
      return await returnGame();
  } else {
    let notPlaying = game.Players.filter((player) => !playingUsers.includes(player.PlayerId));

    if (!notPlaying) {
      return await returnGame();
    }

    let upNext = [];
    if (notPlaying.length < data.PlayersPerRound) {
      upNext = notPlaying.splice(0, notPlaying.length).map((player) => player.PlayerId);
    } else {
      upNext = notPlaying.splice(0, data.PlayersPerRound).map((player) => player.PlayerId);
    }

    if (!upNext && !upNext.length) {
      return await returnGame();
    }

    if (!await SetUpNextUsers(upNext)) {
      throw new Error("Error setting the up next users!");
    }

    return returnGame();
  }
}

export async function SetNextRound(gameId: string) {
  let game = await prisma.game.findFirst({
    where: {
      GameId: gameId
    },
    include: {
      Players: true
    }
  })

  if (!game) {
    throw new Error("The game was not found!");
  }

  if (game.Players.length === game.PlayersPerRound) {
    return game;
  }

  let nextUpPlayers = game.Players.filter((player) => {
    return !player.IsPlaying && !player.IsUpNext
  });

  let nextUp = []
  if (nextUpPlayers.length < game.PlayersPerRound) {
    nextUp = nextUpPlayers.splice(0, nextUpPlayers.length).map((player) => player.PlayerId);
  } else {
    nextUp = nextUpPlayers.splice(0, game.PlayersPerRound).map((player) => player.PlayerId);
  }

  let date = new Date().toISOString();
  let updateCurrentPlaying = prisma.player.updateMany({
    where: {
      GameId: game.GameId,
      IsPlaying: true
    },
    data: {
      IsPlaying: false,
      UpdateDate: date
    }
  });

  let updateCurrentUpNext = prisma.player.updateMany({
    where: {
      GameId: game.GameId,
      IsUpNext: true
    },
    data: {
      IsUpNext: false,
      IsPlaying: true,
      UpdateDate: date
    }
  });

  await prisma.$transaction([updateCurrentPlaying, updateCurrentUpNext]);

  if (nextUp.length) {
    await SetUpNextUsers(nextUp);
  } else {
    await prisma.player.updateMany({
      where: {
        GameId: game.GameId,
        IsPlaying: false,
        IsUpNext: false
      },
      data: {
        IsUpNext: true,
        UpdateDate: date
      }
    })
  }

  return GameEntityToModel(await prisma.game.findFirst(
    {
      where: {
        GameId: game.GameId
      },
      include: {
        Players: true
      }
  }
  ));
}

export async function GetGame(gameCode: string): Promise<GameData> {
  let game = await GetGameEntity(gameCode)

  return GameEntityToModel(game)
}

export async function GetGameEntity(gameCode: string): Promise<any> {
  let game = await prisma.game.findFirst({
    where: {
      GameCode: gameCode
    },
    include: {
      Players: true
    }
  })

  if (!game) {
    throw new Error('The game was not found!')
  }

  return game
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
  })

  if (!game) {
    throw new Error('The game was not found!')
  }

  return GameEntityToModel(game)
}

export function GameEntityToModel(game): GameData {
  let players: Array<PlayerData> = new Array<PlayerData>()

  game.Players.forEach((player) => {
    players.push(PlayerEntityToModel(player, game))
  })

  return {
    GameId: game.GameId,
    GameName: game.GameName,
    GameCode: game.GameCode,
    ViewWinsAsRomanNumerals: game.ViewWinsAsRomanNumerals,
    Players: players,
    PlayersPerRound: game.PlayersPerRound
  }
}

export async function DeleteGame(gameId: string): Promise<boolean> {
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
    })

    await prisma.$transaction([deletePlayers, deleteGame])
  } catch (e) {
    console.error(e)
    return false
  }

  return true
}
