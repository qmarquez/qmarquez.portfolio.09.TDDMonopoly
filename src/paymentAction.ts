import { Player } from "./player";

export class PaymentAction {
  constructor(
    public from: Player,
    public to: Player,
    public amount: number,
    public reason: string,
  ) { }
}