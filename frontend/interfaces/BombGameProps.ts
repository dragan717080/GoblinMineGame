export default interface GameProps {
  setIsSettingGame?: (newIsSettingGame: boolean) => void;
  stake: number;
  bombsAmount: number;
}
