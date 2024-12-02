export type GameOption = "odd" | "even" | "lt" | "gt" | "eq";

export default interface GameSelectionProps {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  canSelectOption: boolean;
  text: string;
  multiplier: number;
};
