import type { ReactNode } from "react";

export default interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  hasCloseBtn?: boolean;
  children: ReactNode;
};
