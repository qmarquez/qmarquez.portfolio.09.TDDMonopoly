import { Monopoly } from "./monopoly";
import { Player } from "./player";

export class PaymentAction {
  constructor(
    private from: Player,
    private to: Player,
    private amount: number,
    private reason: string,
  ) { }

  public exe() {
    this.from.pay(this.amount);
    this.to.collect(this.amount);
  }

  public revert() {

  }
}