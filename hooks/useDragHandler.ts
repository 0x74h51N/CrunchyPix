import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { sliderChange } from '@/store/redux/isSlider';

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

export default useDragHandler