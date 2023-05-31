import { PaymentAction } from "./paymentAction";
import { Player } from "./player";

describe('Actions', () => {
  let action: PaymentAction;

  beforeEach(() => {
    const from = new Player('from');
    const to = new Player('to');
    action = new PaymentAction(from, to, { amount: 100, reason: 'reason' });
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
    const action = new PaymentAction(from, to, { amount: 100, reason: 'reason' });
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
    const action = new PaymentAction(from, to, { amount: 100, reason: 'reason' });
    action.exe();
    action.revert();
    expect(from.money).toBe(1000);
    expect(to.money).toBe(1000);
  });

  test('execute an already executed action should throw', () => {
    action.exe();
    expect(() => action.exe()).toThrow(PaymentAction.ActionAlreadyExecutedError);
  });

  test('action should allow to set fromBank, from player shouldn\'t decrese money', () => {
    const from = new Player('from', { money: 1000, isBank: true });
    const to = new Player('to', { money: 1000 });
    const action = new PaymentAction(from, to, { amount: 100, reason: 'reason', fromBank: true });
    action.exe();
    expect(from.money).toBe(1000);
    expect(to.money).toBe(1100);
  });
})