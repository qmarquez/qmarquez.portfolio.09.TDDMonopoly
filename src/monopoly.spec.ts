import { Monopoly } from "./monopoly";

describe('Monopoly', () => {
  let game: Monopoly;
  beforeEach(() => {
    game = new Monopoly();
  })

  test('game instance should be created', () => {
    expect(game).toBeInstanceOf(Monopoly);
  });

  test('game instance should have a bank', () => {
    expect(game.bank).toBeDefined();
  });

  test('game instance should have a default initial amount of money for each player', () => {
    expect(game.initialMoneyAmount).toBe(1500);
  });

  test('game should know if has started or not', () => {
    expect(game.hasStarted).toBeFalsy();
  });
});