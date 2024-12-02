import MoreLessGameHistory from './GameHistory';
import ModalProps from './ModalProps';

export default interface MoreLessHistoryModalProps extends ModalProps {
  games: MoreLessGameHistory[];
};
