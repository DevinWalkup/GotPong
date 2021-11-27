import { AddPlayerData, CreatePlayerData, PlayerData } from '@includes/interfaces'
import { GetGameEntity } from '../games'
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export async function CreatePlayers(data: Array<CreatePlayerData>, game): Promise<Array<any>> {
  let createdPlayers: Array<any> = new Array<any>()
  for (let p = 0; p < data.length; p++) {
    let player: CreatePlayerData = data[p];
    let createdPlayer = await CreatePlayer(player, game);
    createdPlayers.push(createdPlayer)
  }

  return createdPlayers
}

async function CreatePlayer(data: CreatePlayerData, game): Promise<any> {
  let isUpNext = false;
  let upNextPlayers = game.Players.filter((player) => player.IsUpNext);
  if (!upNextPlayers.length || upNextPlayers < game.PlayersPerRound) {
    isUpNext = true;
  }

  let player = await prisma.player.create({
    data: {
      PlayerName: data.PlayerName,
      PlayerColor: data.PlayerColor,
      CreateDate: new Date().toISOString(),
      IsUpNext: isUpNext,
      Game: {
        connect: {
          GameId: game.GameId
        }
      }
    },
  })

  if (!player.PlayerId) {
    throw new Error('Error creating player')
  }

  return player
}

export async function AddPlayer(data: AddPlayerData): Promise<boolean> {
  let game = await GetGameEntity(data.GameCode);

  await CreatePlayers(data.Players, game);

  return true;
}

export async function AddPlayerWin(playerId: string) : Promise<PlayerData> {
  let player  = await prisma.player.update({
    where: {
      PlayerId: playerId
    },
    data: {
      Wins: {increment: 1},
      UpdateDate: new Date().toISOString()
    },
    include: {
      Game: true
    }
  });

  if (!player) {
    throw new Error("The player was not found!");
  }

  return PlayerEntityToModel(player);
}

export async function SetPlayingUsers(playerIds: Array<string>) : Promise<boolean> {
  let queries = [];
  let currentDate = new Date().toISOString();

  playerIds.forEach((playerId) => {
    queries.push(prisma.player.update({
      where: {
        PlayerId: playerId
      },
      data: {
        IsPlaying: true,
        UpdateDate: currentDate
      }
    }))
  })

  try {
    await prisma.$transaction(queries);
  }
  catch {
    return false;
  }

  return true;
}

export async function SetUpNextUsers(playerIds: Array<string>) : Promise<boolean> {
  let queries = [];
  let currentDate = new Date().toISOString();

  playerIds.forEach((playerId) => {
    queries.push(prisma.player.update({
      where: {
        PlayerId: playerId
      },
      data: {
        IsUpNext: true,
        UpdateDate: currentDate
      }
    }))
  })

  try {
    await prisma.$transaction(queries);
  }
  catch {
    return false;
  }

  return true;
}

export function PlayerEntityToModel(player: any, game: any | null = null): PlayerData {
  return {
    PlayerId: player.PlayerId,
    PlayerName: player.PlayerName,
    PlayerColor: player.PlayerColor,
    Wins: player.Wins,
    GameId: !game ? player.Game.GameId : game.GameId,
    IsPlaying: player.IsPlaying,
    IsUpNext: player.IsUpNext
  }
}
