import Fighter, { SimpleFighter } from '../Figther';
import Battle from './Battle';

export default class PVP extends Battle {
  private _player1: Fighter;
  private _monster: Array<SimpleFighter>;

  constructor(player1: Fighter, monster: Array<SimpleFighter>) {
    super(player1);
    this._player1 = player1;
    this._monster = monster;
  }

  fight(): number {
    this._monster.forEach((monster) => {
      while (this._player1.lifePoints > 0 && monster.lifePoints > 0) {
        this._player1.attack(monster);
        monster.attack(this._player1);
      }
    });

    return super.fight();
  }
}