export default interface SimpleFighter {
  lifePoints: number;
  strength: number;
  
  attack(target: SimpleFighter): void;
  receiveDamage(attackPoints: number): void;
}