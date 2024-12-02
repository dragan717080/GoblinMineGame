import MoreLessGameHistory from './MoreLessGameHistory';
import ModalProps from './ModalProps';

export default interface MoreLessHistoryModalProps extends ModalProps {
  games: Array<MoreLessGameHistory>;
};
