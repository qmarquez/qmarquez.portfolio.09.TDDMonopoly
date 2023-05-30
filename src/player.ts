import { get } from "lodash";

interface PlayerConfig {
  isBank: boolean;
}

export class Player {
  public isBank: boolean;

  constructor(
    public name: string,
    config?: Partial<PlayerConfig>
  ) {
    this.isBank = get(config, 'isBank', false);
  }
}