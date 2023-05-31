import { PaymentAction } from "./paymentAction";
import { Player } from "./player";

describe('Actions', () => {
  let action: PaymentAction
  beforeEach(() => {
    const from = new Player('from');
    const to = new Player('to');
    action = new PaymentAction(from, to, 100, 'reason');
  });

  test('action instance should be created', () => {
    expect(action).toBeInstanceOf(PaymentAction);
  });

  test('action should allow to execute', () => {
    expect(action.exe).toBeDefined();
  });
})