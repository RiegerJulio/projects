import { SimpleFighter } from '../../src/Figther';

class F implements SimpleFighter {
  constructor(
    public lifePoints = 100,
    public strength = 10,
    public defense = 10,
  ) { }
  
  attack(enemy: SimpleFighter) { }
  receiveDamage(amount: number) { }
};

const f = (obj: SimpleFighter) => {
  return obj.attack(new F());
}
