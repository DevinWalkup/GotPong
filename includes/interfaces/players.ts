import { ModelData } from './model'

export interface PlayerData extends ModelData {
  PlayerId: string
  PlayerName: string
  PlayerColor: string
  Wins: number
  GameId: string
}

export interface CreatePlayerData {
  PlayerName: string
  PlayerColor: string
}

export interface AddPlayerData {
  GameCode: string,
  Players: Array<CreatePlayerData>
}
