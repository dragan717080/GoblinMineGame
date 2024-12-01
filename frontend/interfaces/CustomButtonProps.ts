export default interface CustomButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  isFullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}
