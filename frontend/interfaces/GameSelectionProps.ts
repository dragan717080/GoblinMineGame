export type GameOption = "odd" | "even" | "lt" | "gt" | "eq";

export default interface GameSelectionProps {
  onClick: (selectedOption: GameOption) => void;
  canSelectOption: boolean;
  text: string;
  multiplier: number;
};
