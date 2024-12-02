export default interface StakeSelectionProps {
  stake: number;
  decreaseStake: () => void;
  increaseStake: () => void;
  setStake: (newStake: number) => void;
};
