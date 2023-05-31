import { PaymentAction } from "./paymentAction";
import { Player } from "./player";

describe('Actions', () => {
  let action: PaymentAction;

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

  test('action should allow to revert execution', () => {
    expect(action.revert).toBeDefined();
  });

  test('execution should pay and collect for players', () => {
    const from = new Player('from', { money: 1000 });
    const to = new Player('to', { money: 1000 });
    const action = new PaymentAction(from, to, 100, 'reason');
    action.exe();
    expect(from.money).toBe(900);
    expect(to.money).toBe(1100);
  });

  test('revert a non executed action should throw', () => {
    expect(() => action.revert()).toThrow(PaymentAction.ActionNotExecutedError);
  });

  test('revert execution should pay and collect for players', () => {
    const from = new Player('from', { money: 1000 });
    const to = new Player('to', { money: 1000 });
    const action = new PaymentAction(from, to, 100, 'reason');
    action.exe();
    action.revert();
    expect(from.money).toBe(1000);
    expect(to.money).toBe(1000);
  });
})