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
});