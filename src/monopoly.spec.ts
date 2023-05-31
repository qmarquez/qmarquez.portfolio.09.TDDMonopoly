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

    test('a player can be added in a particular order', () => {
      game.addPlayer('name', { order: 3 });
      expect(game.players['name'].order).toBe(3);
    });

    test('if a player order is already taken, should throw an error', () => {
      game.addPlayer('name', { order: 3 });
      expect(() => game.addPlayer('name2', { order: 3 })).toThrow(Monopoly.OrderAlreadyTakenError);
    });

    test('the game shouldn\'t do anything if the newOrder is the same than the current', () => {
      game.addPlayer('name', { order: 4 });
      expect(() => game.secureUpdateOrder(game.players['name'], { newOrder: 4 })).not.toThrow();
    });

    test('the game should thrown an error in case the selected order collide', () => {
      game.addPlayer('name', { order: 4 });
      game.addPlayer('name2', { order: 5 });
      expect(() => game.secureUpdateOrder(game.players['name'], { newOrder: 5 })).toThrow(Monopoly.OrderAlreadyTakenError);
    });

    test('the game should not thrown an error in case the selected order collide and inCaseOfCollition was provided', () => {
      game.addPlayer('name', { order: 4 });
      expect(() => game.secureUpdateOrder(game.players['name'], { newOrder: 4, inCaseOfCollition: 'insertAndPush' })).not.toThrow();
    });

    test('the game should allow to change the order for a player', () => {
      game.addPlayer('name', { order: 4 });
      game.secureUpdateOrder(game.players['name'], { newOrder: 5 });
      expect(game.players['name'].order).toBe(5);
    });

    test('the game should handle a collition: insert and push', () => {
      game.addPlayer('name', { order: 4 });
      game.addPlayer('name2', { order: 5 });
      game.secureUpdateOrder(game.players['name'], { newOrder: 5, inCaseOfCollition: 'insertAndPush' });
      expect(game.players['name'].order).toBe(5);
      expect(game.players['name2'].order).toBe(6);
    });

    test('the game should know who is the next player to play', () => {
      game.addPlayer('name');
      game.addPlayer('name2');
      expect(game.nextPlayer()).toEqual(game.players['name']);
    });

    test('the last added order pointer should work on edge cases', () => {
      game.addPlayer('name', { order: 1 });
      game.addPlayer('name2');
      game.addPlayer('name4', { order: 4 });
      game.addPlayer('name5');
      game.addPlayer('name3', { order: 3 });
      game.addPlayer('name6');
      expect(game.players['name'].order).toBe(1);
      expect(game.players['name2'].order).toBe(2);
      expect(game.players['name4'].order).toBe(4);
      expect(game.players['name5'].order).toBe(5);
      expect(game.players['name3'].order).toBe(3);
      expect(game.players['name6'].order).toBe(6);
    });
  });

  test('hasStarted should only setted on first player adding', () => {
    game.addPlayer('name');
    const hasStarted = game.hasStarted;
    game.addPlayer('name2');
    expect(game.hasStarted).toBe(hasStarted);
  });

  describe('addPlayer - setMoney', () => {
    test('a player could be created with a custom amount of money', () => {
      const player = game.addPlayer('name', { money: 1000 });
      expect(player.money).toBe(1000);
    });
  });

  test('game should allow to pay', () => {
    expect(game.pay).toBeDefined();
  });
});