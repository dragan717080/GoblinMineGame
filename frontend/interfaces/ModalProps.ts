import type { ReactNode } from "react";

export default interface ModalProps {
  isOpen: boolean;
  setIsOpen?: (newIsOpen: boolean) => void;
  hasCloseBtn?: boolean;
  children?: ReactNode;
};
