import { Player } from "./player";

export class Monopoly {
  public static initialMoneyAmount = 1500;
  public bank = {};
  public hasStarted = false;
  public players: { [key: string]: Player } = {};

  addPlayer(name: string) {
    this.hasStarted = true;
    this.players[name] = new Player(name);
  }
}