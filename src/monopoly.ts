export class Monopoly {
  public static initialMoneyAmount = 1500;
  public bank = {};
  public hasStarted = false;

  addPlayer() {
    this.hasStarted = true;
  }
}