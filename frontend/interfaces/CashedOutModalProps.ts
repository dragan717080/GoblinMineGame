import type { ReactNode } from "react";

export default interface CashedOutModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  hasCloseBtn?: boolean;
  children?: ReactNode;
  startGame: () => void;
  multiplier: number;
  payoff: number;
  isBombPage?: boolean;
};
