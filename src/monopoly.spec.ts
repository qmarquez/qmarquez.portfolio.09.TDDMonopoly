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

  test('players must have a sequential order when are added', () => {
    game.addPlayer('name');
    game.addPlayer('name2');
    expect(game.players['name'].order).toBe(1);
    expect(game.players['name2'].order).toBe(2);
  });

  test('a player can be added in a particular order', () => {
    game.addPlayer('name', 3);
    expect(game.players['name'].order).toBe(3);
  });

  test('if a player order is already taken, should throw an error', () => {
    game.addPlayer('name', 3);
    expect(() => game.addPlayer('name2', 3)).toThrow(Monopoly.OrderAlreadyTakenError);
  });

  test('the game should thrown an error in case the selected order collide', () => {
    game.addPlayer('name', 4);
    expect(() => game.secureUpdateOrder(game.players['name'], { newOrder: 4 })).toThrow(Monopoly.OrderAlreadyTakenError);
  });
});