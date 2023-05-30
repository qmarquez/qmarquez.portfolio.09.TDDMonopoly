import { Player } from "./player";

export class Monopoly {
  public static initialMoneyAmount = 1500;
  public bank = {};
  public hasStarted = false;
  public players: { [key: string]: Player } = {};

  static NameAlreadyTakenError = class extends Error {
    constructor(name: string) {
      super(`${name} is already taken`);
    }
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
  }
}