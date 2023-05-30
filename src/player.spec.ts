import { Player } from "./player";

describe('Player', () => {
  test('player instance should be created', () => {
    new Player('name');
  });

  test('player instance should have a name', () => {
    const player = new Player('name');
    expect(player.name).toBe('name');
  })
});