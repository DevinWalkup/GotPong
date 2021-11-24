import Games from '@database/models/Games'
import Players from '@database/models/Players'
import {
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent,
	UpdateEvent,
} from 'typeorm'
import moment from 'moment-timezone'


@EventSubscriber()
export class GamesSubscriber implements EntitySubscriberInterface<Games> {
  createEntity(event: InsertEvent<Games>) {
    const game = event.entity;

    if (!game.Players.length) {
      game.Players = new Array<Players>();
    }

    game.CreateDate = moment();

    this.check(event);
  }

  updateEntity(event: UpdateEvent<Games>) {
    const game = event.entity;

    game.UpdateDate = moment();

    this.check(event);
  }

	check(event: InsertEvent<Games> | UpdateEvent<Games>) {
    let regex = new RegExp('<[^>]*>')
		const game = event.entity
		game.GameName = game.GameName.replace(regex, "");
	}

	beforeInsert(event: InsertEvent<Games>) {
		this.createEntity(event)
	}

	beforeUpdate(event: UpdateEvent<Games>) {
		this.updateEntity(event)
	}
}
