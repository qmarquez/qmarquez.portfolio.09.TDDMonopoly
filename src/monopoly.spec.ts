import { Monopoly } from "./monopoly";
import { Player } from "./player";

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

  test('Monopoly must have a default initial amount of money for each player', () => {
    expect(Monopoly.initialMoneyAmount).toBe(1500);
  });

  test('game should know if has started or not', () => {
    expect(game.hasStarted).toBeFalsy();
  });

  test('game should start when a player is added', () => {
    game.addPlayer('a name');
    expect(game.hasStarted).toBeTruthy();
  });

  test('game could add a player and let it accessible', () => {
    game.addPlayer('name');
    expect(game.players['name']).toBeInstanceOf(Player)
  });

  test('if the player added it\'s the first should be setted as banker', () => {
    game.addPlayer('name');
    expect(game.players['name'].isBank).toBeTruthy();
  });
});