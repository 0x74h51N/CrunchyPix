import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { clickableChange } from '@/store/redux/isClickable';


const useClickableHandlers = () => {
  const isClickable = useSelector((state: RootState) => state.isClickable.clickable);
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
