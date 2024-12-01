export default interface StakeSelectionProps {
  decreaseStake: () => void;
  increaseStake: () => void;
  setStake: (newStake: number) => void;
};
