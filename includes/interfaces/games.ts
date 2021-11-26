import { ModelData } from './model'
import { CreatePlayerData, PlayerData } from '@includes/interfaces/players'

export interface GameData extends ModelData {
	GameId: string
	GameName: string
  GameCode: string
  ViewWinsAsRomanNumerals: boolean
  Players: Array<PlayerData>
}

export interface CreateGameData {
  GameName: string
  ViewWinsAsRomanNumerals: boolean
  Players: Array<CreatePlayerData>
}

export interface SetGameWinDisplayData {
  GameId: string,
  ViewWinsAsRomanNumerals: boolean
}

export interface RemoveGameData {
  GameId: string
}
