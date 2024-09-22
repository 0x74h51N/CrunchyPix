import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { sliderChange } from '@/store/redux/isSlider';

/**
 * Custom hook for managing the activation and deactivation of a drag cursor
 * when entering or leaving a draggable area. It interacts with the global Redux state
 * to toggle the 'slider' state.
 *
 * @returns {Object} An object containing two handler functions:
 *
 * - `hoverStart`: Dispatches an action to activate the drag cursor
 *   when the mouse enters a draggable area.
 *
 * - `hoverEnd`: Dispatches an action to deactivate the drag cursor
 *   when the mouse leaves a draggable area.
 */
const useDragHandler = () => {
  const dispatch = useDispatch();
  const isSlider = useSelector((state: RootState) => state.isSlider.slider);

  const hoverStart = () => {
    if (isSlider === false) {
      dispatch(sliderChange(true));
    }
  };

  const hoverEnd = () => {
    if (isSlider === true) {
      dispatch(sliderChange(false));
    }
  };

  return { hoverStart, hoverEnd };
};

export default useDragHandler;
