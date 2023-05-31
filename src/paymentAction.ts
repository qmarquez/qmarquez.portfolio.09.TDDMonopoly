import { Player } from "./player";

export class PaymentAction {
  public static ActionNotExecutedError = class extends Error {
    constructor() {
      super(`Action not already executed`);
    }
  }

  private executed = false;

  constructor(
    private from: Player,
    private to: Player,
    private amount: number,
    private reason: string,
  ) { }

  public exe() {
    this.from.pay(this.amount);
    this.to.collect(this.amount);
    this.executed = true;
  }

  public revert() {
    if (!this.executed) {
      throw new PaymentAction.ActionNotExecutedError();
    }
    this.from.collect(this.amount);
    this.to.pay(this.amount);
    this.executed = false;
  }
}