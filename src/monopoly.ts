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
  public static NotAllowedChoosenOrderError = class extends Error {
    constructor(
      order: number
    ) {
      super(`order ${order} is not allowed`);
    }
  }

  public get bank() {
    return find(this.players, { isBank: true });
  };
  public get state() {
    this.executeActions();
    const players = Object
      .keys(this.players)
      .map(key => this.players[key]);
    return {
      players,
      nextPlayer: this.nextPlayer,
    };
  }
  public hasStarted: boolean | moment.Moment = false;
  public players: { [key: string]: Player } = {};
  private lastOrderAdded = 0;
  public actions: PaymentAction[] = [];

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

  public addPlayer(name: string, data: { money?: number } = {}) {
    if (this.players[name]) {
      throw new Monopoly.NameAlreadyTakenError(name);
    }
    this.createPlayer(name, data);
    this.setHasStarted();
    return this.players[name];
  }

  private setHasStarted() {
    if (!this.hasStarted) {
      this.hasStarted = moment();
    }
  }

  private createPlayer(name: string, { money }: { money?: number }) {
    this.players[name] = new Player(
      name,
      {
        isBank: !this.hasStarted,
        order: ++this.lastOrderAdded,
        money
      }
    );
  }

  public secureUpdateOrder(player: Player, data: { newOrder: number }) {
    const { newOrder } = data;
    if (newOrder > this.lastOrderAdded) {
      throw new Monopoly.NotAllowedChoosenOrderError(newOrder);
    }
    const playerInOrder = find(this.players, { order: newOrder });
    if (player !== playerInOrder) {
      this.collitionsStrategies['insertAndPush'](player, newOrder);
    }
  }

  public get nextPlayer() {
    return find(this.players, { order: 1 });
  }

  public nextTurn() {
    
  }

  public pay(from: Player, to: Player, data: { amount: number }) {
    const action = new PaymentAction(from, to, { ...data, reason: 'payment' });
    this.actions.push(action);
  }

  private executeActions() {
    this.actions
      .filter(action => !action.executed)
      .forEach(action => action.exe());
  }
}

