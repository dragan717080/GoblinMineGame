export default interface MoreLessGameHistory {
  id?: string;
  created_at?: string;
  updated_at?: string;
  known: number;
  option: string;
  guessed: number;
  stake: number;
  multiplier: number;
  payoff: number;
}
