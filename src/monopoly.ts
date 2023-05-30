import { Player } from "./player";

export class Monopoly {
  static initialMoneyAmount = 1500;
  static NameAlreadyTakenError = class extends Error {
    constructor(name: string) {
      super(`${name} is already taken`);
    }
  }
  public bank = {};
  public hasStarted = false;
  public players: { [key: string]: Player } = {};
  public get playersNames() {
    return Object.keys(this.players)
      .map(key => this.players[key].name);
  }

  addPlayer(name: string) {
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