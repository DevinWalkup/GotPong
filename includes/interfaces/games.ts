import { ModelData } from './model'
import { CreatePlayerData, PlayerData } from '@includes/interfaces/players'

export interface GameData extends ModelData {
	GameId: string
	GameName: string
  GameCode: string
  ViewWinsAsRomanNumerals: boolean
  Players: Array<PlayerData>
  PlayersPerRound: number
}

export interface CreateGameData {
  GameName: string
  ViewWinsAsRomanNumerals: boolean
  Players: Array<CreatePlayerData>,
  PlayersPerRound: number
}

export interface SetGameWinDisplayData {
  GameId: string,
  ViewWinsAsRomanNumerals: boolean
}

export interface RemoveGameData {
  GameId: string
}

export interface SetPlayersPerRoundData {
  GameId: string
  PlayersPerRound: number,
  CurrentlyPlaying: Array<string>
}
