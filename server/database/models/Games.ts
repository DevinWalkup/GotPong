import Model from '@database/Model'
import { GameData } from '@includes/interfaces'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Players from '@database/models/Players'

@Entity()
export default class Games extends Model<GameData> {
	@PrimaryGeneratedColumn("uuid")
  GameId: string

	@Column('varchar', { length: 50 })
	GameName: string

	@Column('varchar', { length: 6 })
	GameCode: string

  @Column('boolean', {default: false})
  ViewWinsAsRomanNumerals: boolean

  @OneToMany(() => Players, player => player.Game, {onDelete: 'CASCADE'})
  Players: Players[]

	getRepository() {
		return Games.getRepository()
	}
}
