import { get } from "lodash";
import { Monopoly } from "./monopoly";

interface PlayerConfig {
  isBank: boolean;
  money: number;
}

export class Player {
  public isBank: boolean;
  public money: number;
  public order: number = 0;

  constructor(
    public name: string,
    config?: Partial<PlayerConfig>
  ) {
    this.isBank = get(config, 'isBank', false);
    this.money = get(config, 'money', Monopoly.initialMoneyAmount);
  }
}