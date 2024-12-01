export default interface GameHistory {
  ?id: string;
  ?created_at: string;
  ?updated_at: string;
  bombs: number;
  multiplier: string;
  payoff: number;
}
