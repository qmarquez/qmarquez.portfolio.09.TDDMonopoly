import moment from "moment";
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

  test('game instance should haven\'t a bank if any player has added', () => {
    expect(game.bank).toBeUndefined();
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

  test('if the name choosed for the player has been already taken, should throw an error', () => {
    game.addPlayer('name');
    expect(() => game.addPlayer('name')).toThrow(Monopoly.NameAlreadyTakenError);
  });

  test('the game should return all the player\'s name', () => {
    game.addPlayer('name');
    game.addPlayer('name2');
    expect(game.playersNames).toEqual(['name', 'name2']);
  });

  test('the game should return the created player on the addition', () => {
    const player = game.addPlayer('name');
    expect(player).toEqual(game.players['name']);
  });

  test('the game should know who is the banker', () => {
    game.addPlayer('name');
    game.addPlayer('name2');
    expect(game.bank).toEqual(game.players['name']);
  });

  test('when the game starts, hasStarted should turn into moment instance', () => {
    game.addPlayer('name');
    expect(moment.isMoment(game.hasStarted)).toBeTruthy();
  });

  describe('addPlayer - order handling', () => {
    test('players must have a sequential order when are added', () => {
      game.addPlayer('name');
      game.addPlayer('name2');
      expect(game.players['name'].order).toBe(1);
      expect(game.players['name2'].order).toBe(2);
    });

    test('the game shouldn\'t do anything if the newOrder is the same than the current', () => {
      game.addPlayer('name');
      expect(() => game.secureUpdateOrder(game.players['name'], { newOrder: 1 })).not.toThrow();
    });

    test('should throw if the new order it\'s grater than the lastOrderAdded', () => {
      game.addPlayer('name');
      game.addPlayer('name2');
      expect(() => game.secureUpdateOrder(game.players['name'], { newOrder: 5 })).toThrow(Monopoly.NotAllowedChoosenOrderError);
    });

    test('the game should handle the collition: insert and push (to upper position)', () => {
      game.addPlayer('name');
      game.addPlayer('name2');
      game.secureUpdateOrder(game.players['name'], { newOrder: 2 });
      expect(game.players['name'].order).toBe(2);
      expect(game.players['name2'].order).toBe(1);
    });

    test('the game should know who is the next player to play', () => {
      game.addPlayer('name');
      game.addPlayer('name2');
      expect(game.nextPlayer).toEqual(game.players['name']);
    });

    test('should allow to finish the current player turn', () => {
      expect(game.nextTurn).toBeDefined();
    });

  });

  test('hasStarted should only setted on first player adding', () => {
    game.addPlayer('name');
    const hasStarted = game.hasStarted;
    game.addPlayer('name2');
    expect(game.hasStarted).toBe(hasStarted);
  });

  test('a player could be created with a custom amount of money', () => {
    const player = game.addPlayer('name', { money: 1000 });
    expect(player.money).toBe(1000);
  });

  test('game should allow to pay', () => {
    expect(game.pay).toBeDefined();
  });

  test('game should have a history of actions', () => {
    expect(game.actions).toBeDefined();
  });

  test('when a pay is made action should be added to the history', () => {
    const from = game.addPlayer('from');
    const to = game.addPlayer('to');
    game.pay(from, to, { amount: 100 });
    expect(game.actions.length).toBe(1);
  });

  describe('game state', () => {
    test('monopoly should be able to return the last state of the game', () => {
      expect(game.state).toBeDefined();
    });

    test('should know all the players', () => {
      const n = game.addPlayer('name');
      const n2 = game.addPlayer('name2');
      expect(game.state.players).toEqual([n, n2]);
    });

    test('should have the last state', () => {
      const n = game.addPlayer('name');
      const n2 = game.addPlayer('name2');
      game.pay(n, n2, { amount: 100 });
      expect(game.state.players).toEqual([n, n2]);
      expect(n.money).toBe(1400);
      expect(n2.money).toBe(1600);
    });

    test('should have the next player to play', () => {
      const n = game.addPlayer('name');
      expect(game.state.nextPlayer).toEqual(n);
    });
  });
});