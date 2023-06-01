import { find } from "lodash";
import { Player } from "./player";
import moment from "moment"
import { PaymentAction } from "./paymentAction";

export class Monopoly {
  public static initialMoneyAmount = 1500;
  public static NameAlreadyTakenError = class extends Error {
    constructor(name: string) {
      super(`${name} is already taken`);
    }
  }
  public static OrderAlreadyTakenError = class extends Error {
    constructor(
      order: number
    ) {
      super(`order ${order} is already taken`);
    }
  }

  public get bank() {
    return find(this.players, { isBank: true });
  };
  public get state() {
    this.actions
      .filter(action => !action.executed)
      .forEach(action => action.exe());
    const players = Object
      .keys(this.players)
      .map(key => this.players[key]);
    return {
      players
    };
  }
  public hasStarted: boolean | moment.Moment = false;
  public players: { [key: string]: Player } = {};
  private lastOrderAdded = 0;
  public actions: PaymentAction[] = []
  public get playersNames() {
    return Object.keys(this.players)
      .map(key => this.players[key].name);
  }
  private collitionsStrategies = {
    insertAndPush: (player: Player, newOrder: number) => {
      this.playersNames
        .filter(name => this.players[name].order >= newOrder)
        .forEach(name => this.players[name].order++);
      player.order = newOrder;
    }
  }

  public addPlayer(name: string, data: { order?: number, money?: number } = {}) {
    const { order } = data
    if (this.players[name]) {
      throw new Monopoly.NameAlreadyTakenError(name);
    }
    if (order && find(this.players, { order })) {
      throw new Monopoly.OrderAlreadyTakenError(order);
    }
    this.createPlayer(name, data);
    this.checklastOrdedAddedPointer();
    this.setHasStarted();
    return this.players[name];
  }

  private setHasStarted() {
    if (!this.hasStarted) {
      this.hasStarted = moment();
    }
  }

  private createPlayer(name: string, { order, money }: { order?: number, money?: number }) {
    this.players[name] = new Player(
      name,
      {
        isBank: !this.hasStarted,
        order: order ? (this.lastOrderAdded = order) : ++this.lastOrderAdded,
        money
      }
    );
  }

  private checklastOrdedAddedPointer() {
    while (find(this.players, { order: this.lastOrderAdded + 1 })) {
      this.lastOrderAdded++;
    }
  }

  public secureUpdateOrder(player: Player, data: { newOrder: number, inCaseOfCollition?: 'insertAndPush' }) {
    const { newOrder, inCaseOfCollition } = data;
    const playerInOrder = find(this.players, { order: newOrder });
    if (playerInOrder && player !== playerInOrder) {
      if (!inCaseOfCollition) {
        throw new Monopoly.OrderAlreadyTakenError(newOrder);
      }
      this.collitionsStrategies[inCaseOfCollition](player, newOrder);
    } else {
      player.order = newOrder;
    }
  }

  public nextPlayer() {
    return find(this.players, { order: 1 });
  }

  public pay(from: Player, to: Player, data: { amount: number }) {
    const action = new PaymentAction(from, to, { ...data, reason: 'payment' });
    this.actions.push(action);
  }
}

