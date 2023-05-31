import { find } from "lodash";
import { Player } from "./player";
import moment from "moment"

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
  public hasStarted: boolean | moment.Moment = false;
  public players: { [key: string]: Player } = {};
  private nOfPlayers = 0;
  public get playersNames() {
    return Object.keys(this.players)
      .map(key => this.players[key].name);
  }

  public addPlayer(name: string, order?: number) {
    if (this.players[name]) {
      throw new Monopoly.NameAlreadyTakenError(name);
    }

    if (order && find(this.players, { order })) {
      throw new Monopoly.OrderAlreadyTakenError(order);
    }

    this.players[name] = new Player(
      name,
      {
        isBank: !this.hasStarted,
        order: order || ++this.nOfPlayers,
      }
    );
    this.hasStarted = moment();
    return this.players[name];
  }

  public secureUpdateOrder(player: Player, data: { newOrder: number, inCaseOfCollition?: string }) {
    const playerInOrder = find(this.players, { order: data.newOrder });
    if (playerInOrder && player !== playerInOrder && !data.inCaseOfCollition) {
      throw new Monopoly.OrderAlreadyTakenError(data.newOrder);
    }
  }
}