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

  test('player coual be setted as banker from config property', () => {
    const player = new Player('name', { isBank: true });
    expect(player.isBank).toBeTruthy();
  });
});