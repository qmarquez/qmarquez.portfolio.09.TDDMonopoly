import { PaymentAction } from "./paymentAction";
import { Player } from "./player";

describe('Actions', () => { 
  test('action instance should be created', () => {
    const from = new Player('from');
    const to = new Player('to');
    const action = new PaymentAction(from, to, 100, 'reason');
    expect(action).toBeInstanceOf(PaymentAction);
  });
})