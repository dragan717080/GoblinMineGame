import GameHistory from './GameHistory';
import ModalProps from './ModalProps';

export default interface HistoryModalProps extends ModalProps {
  games: GameHistory[];
};
