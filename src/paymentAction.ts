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

  private _executed = false;
  public get executed() {
    return this._executed;
  }

  constructor(
    private from: Player,
    private to: Player,
    private data: {
      amount: number,
      reason: string,
      fromBank?: boolean,
      toBank?: boolean,
    }
  ) { }

  public exe() {
    if (this._executed) {
      throw new PaymentAction.ActionAlreadyExecutedError();
    }
    this.from.pay(this.data.amount, { asBank: !!this.data.fromBank });
    this.to.collect(this.data.amount, { asBank: !!this.data.toBank });
    this._executed = true;
  }

  public revert() {
    if (!this._executed) {
      throw new PaymentAction.ActionNotExecutedError();
    }
    this.from.collect(this.data.amount, { asBank: !!this.data.fromBank });
    this.to.pay(this.data.amount, { asBank: !!this.data.toBank });
    this._executed = false;
  }
}