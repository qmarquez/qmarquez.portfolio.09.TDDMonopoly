import { get } from "lodash";
import { Monopoly } from "./monopoly";

interface PlayerConfig {
  isBank: boolean;
  money: number;
  order: number;
}

export class Player {
  public static PaymenAsBankNotAllowedError = class extends Error {
    constructor(name: string) {
      super(`${name} is not a bank. Payment asBank to a non bank player is not allowed`);
    }
  }
  public isBank: boolean;
  private _money: number;
  public get money() {
    return this._money;
  };
  public set money(_: number) { }
  public order: number = 0;

  constructor(
    public name: string,
    config?: Partial<PlayerConfig>
  ) {
    this.isBank = get(config, 'isBank', false);
    this._money = get(config, 'money', Monopoly.initialMoneyAmount);
    this.order = get(config, 'order', 0);
  }

  public toString() {
    return `${this.isBank ? 'Bank' : 'Player'} (${this.name})`;
  }

  public pay(amount: number, { asBank } = { asBank: false }) {
    if (!asBank)
      this._money -= amount;
    else if (!this.isBank)
      throw new Player.PaymenAsBankNotAllowedError(this.name);
  }

  public collect(amount: number, { asBank } = { asBank: false }) {
    if (!asBank)
      this._money += amount;
  }
}