import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { clickableChange } from '@/store/redux/isClickable';

/**
 * Custom hook for handling the activation and deactivation of a custom pointer cursor
 * when it enters or leaves a clickable area. It interacts with the global Redux state
 * to toggle the 'clickable' state.
 *
 * @returns {Object} An object containing two handler functions:
 *
 * - `handleMouseEnter`: Dispatches an action to activate the custom pointer cursor
 *   when the mouse enters a clickable area.
 *
 * - `handleMouseLeave`: Dispatches an action to deactivate the custom pointer cursor
 *   when the mouse leaves a clickable area.
 */
const useClickableHandlers = () => {
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable,
  );
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    if (!isClickable) {
      dispatch(clickableChange(true));
    }
  };

  const handleMouseLeave = () => {
    if (isClickable) {
      dispatch(clickableChange(false));
    }
  };

  return { handleMouseEnter, handleMouseLeave };
};

export default useClickableHandlers;
