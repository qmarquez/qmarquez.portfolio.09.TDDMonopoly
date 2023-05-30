import { Monopoly } from "./monopoly";

describe('Monopoly', () => {
  let game;
  beforeEach(() => {
    game = new Monopoly();
  })

  test('game instance should be created', () => {
    expect(game).toBeInstanceOf(Monopoly);
  });
});