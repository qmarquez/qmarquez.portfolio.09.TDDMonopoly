import { get } from "lodash";
import { Monopoly } from "./monopoly";

interface PlayerConfig {
  isBank: boolean;
}

export class Player {
  public isBank: boolean;
  public money: number;

  constructor(
    public name: string,
    config?: Partial<PlayerConfig>
  ) {
    this.isBank = get(config, 'isBank', false);
    this.money = Monopoly.initialMoneyAmount;
  }
}