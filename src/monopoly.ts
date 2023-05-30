import { find } from "lodash";
import { Player } from "./player";

export class Monopoly {
  public static initialMoneyAmount = 1500;
  public static NameAlreadyTakenError = class extends Error {
    constructor(name: string) {
      super(`${name} is already taken`);
    }
  }
  public get bank() {
    return find(this.players, { isBank: true });
  };
  public hasStarted = false;
  public players: { [key: string]: Player } = {};
  public get playersNames() {
    return Object.keys(this.players)
      .map(key => this.players[key].name);
  }

  public addPlayer(name: string) {
    if (this.players[name]) {
      throw new Monopoly.NameAlreadyTakenError(name);
    }

    this.players[name] = new Player(
      name,
      { isBank: !this.hasStarted, }
    );
    this.hasStarted = true;
    return this.players[name];
  }
}