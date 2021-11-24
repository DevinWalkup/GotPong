import Players from '@database/models/Players'
import { generateGameCode } from '@includes/functions'
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm'
import moment from 'moment-timezone'


@EventSubscriber()
export class PlayersSubscriber implements EntitySubscriberInterface<Players> {
  createEntity(event: InsertEvent<Players>) {
    const player = event.entity;

    player.CreateDate = moment();
    this.check(event);
  }

  updateEntity(event: UpdateEvent<Players>) {
    const player = event.entity;

    player.UpdateDate = moment();
    this.check(event);
  }

  check(event: InsertEvent<Players> | UpdateEvent<Players>) {
    let regex = new RegExp('<[^>]*>')
    const player = event.entity
    player.PlayerName = player.PlayerName.replace(regex, "");
  }

  beforeInsert(event: InsertEvent<Players>) {
    this.createEntity(event)
  }

  beforeUpdate(event: UpdateEvent<Players>) {
    this.updateEntity(event)
  }
}
