import { Player } from "./player";

export class PaymentAction {
  public static ActionNotExecutedError = class extends Error {
    constructor() {
      super(`Action not already executed`);
    }
  }
  public static ActionAlreadyExecutedError = class extends Error {
    constructor() {
      super(`Action already executed`);
    }
  }

  private executed = false;

  constructor(
    private from: Player,
    private to: Player,
    private data: {
      amount: number,
      reason: string,
      fromBank?: boolean,
    }
  ) { }

  public exe() {
    if (this.executed) {
      throw new PaymentAction.ActionAlreadyExecutedError();
    }
    this.from.pay(this.data.amount, { asBank: !!this.data.fromBank });
    this.to.collect(this.data.amount);
    this.executed = true;
  }

  public revert() {
    if (!this.executed) {
      throw new PaymentAction.ActionNotExecutedError();
    }
    this.from.collect(this.data.amount);
    this.to.pay(this.data.amount);
    this.executed = false;
  }
}