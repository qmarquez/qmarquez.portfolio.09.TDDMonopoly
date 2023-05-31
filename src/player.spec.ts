import { Monopoly } from "./monopoly";
import { Player } from "./player";

describe('Player', () => {
  let player: Player;

  beforeEach(() => {
    player = new Player('name');
  });

  test('player instance should be created', () => {
    expect(player).toBeInstanceOf(Player);
  });

  test('player instance should have a name', () => {
    expect(player.name).toBe('name');
  });

  test('player instance should have default banker value', () => {
    expect(player.isBank).toBeFalsy();
  });

  test('player could be setted as banker from config property', () => {
    const player = new Player('name', { isBank: true });
    expect(player.isBank).toBeTruthy();
  });

  test('player instance should have monopoly default initial amount of money', () => {
    expect(player.money).toBe(Monopoly.initialMoneyAmount);
  });

  test('player could set initial amount of money from config property', () => {
    const player = new Player('name', { money: 1000 });
    expect(player.money).toBe(1000);
  });

  test('player should have an order property, by default 0', () => {
    expect(player.order).toBe(0);
  });

  test('player order could be setted from config property', () => {
    const player = new Player('name', { order: 1 });
    expect(player.order).toBe(1);
  });

  test('player order could be updated', () => {
    player.order = 1;
    expect(player.order).toBe(1);
  });

  test('player toString method shlould return properly', () => {
    expect(player.toString()).toBe('Player (name)');
  });

  test('player toString method shlould return properly with bank player', () => {
    const player = new Player('name', { isBank: true });
    expect(player.toString()).toBe('Bank (name)');
  });

  test('player should be able to pay', () => {
    const player = new Player('name', { money: 1000 });
    player.pay(500);
    expect(player.money).toBe(500);
  });

  test('player should be able to collect money', () => {
    const player = new Player('name', { money: 1000 });
    player.collect(500);
    expect(player.money).toBe(1500);
  });

  test('player money shounld\'t be able to modify from outside', () => {
    const player = new Player('name', { money: 1000 });
    player.money = 500;
    expect(player.money).toBe(1000);
  });

  test('if paymet is setted as a bank, the player shouldn\'t receive the money', () => {
    const player = new Player('name', { money: 1000, isBank: true });
    player.pay(500, { asBank: true });
    expect(player.money).toBe(1000);
  });

  test('if paymet is setted asBank but the player is not the bank, should throw', () => {
    const player = new Player('name', { money: 1000 });
    expect(() => player.pay(500, { asBank: true })).toThrow(Player.PaymenAsBankNotAllowedError);
  });

  test('if collectment is setted as a bank, the player shouldn\'t receive the money', () => {
    const player = new Player('name', { money: 1000, isBank: true });
    player.collect(500, { asBank: true });
    expect(player.money).toBe(1000);
  });
});