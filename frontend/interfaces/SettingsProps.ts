export default interface SettingsProps {
  setIsSettingGame: (newIsSettingGame: boolean) => void;
  bombsAmount: number;
  setBombsAmount: (newBombsAmount: number | ((prevBombsAmount: number) => number)) => void;
  stake: number;
  setStake: (newStake: number | ((prevStake: number) => number)) => void;
}
