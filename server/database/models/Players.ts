import Model from '@database/Model'
import { PlayerData } from '@includes/interfaces'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Games from '@database/models/Games'

@Entity()
export default class Players extends Model<PlayerData> {
  @PrimaryGeneratedColumn("uuid")
  PlayerId: string

  @Column('varchar', { length: 50 })
  PlayerName: string

  @Column('varchar', { length: 10 })
  PlayerColor: string

  @Column('numeric', {default: 0})
  Wins: number

  @ManyToOne(() => Games, game => game.GameId, {onDelete: "CASCADE"})
  @JoinColumn({name: "GameId"})
  Game: Games

  getRepository() {
    return Players.getRepository()
  }
}
