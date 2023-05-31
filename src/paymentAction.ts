import { Player } from "./player";

export class PaymentAction {
  constructor(
    private from: Player,
    private to: Player,
    private amount: number,
    private reason: string,
  ) { }

  public exe() {

  }
}