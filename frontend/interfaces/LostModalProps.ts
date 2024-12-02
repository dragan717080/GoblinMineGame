export default interface LostModalProps {
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
  startGame: () => void;
  multiplier: number;
  isBombPage?: boolean;
};
