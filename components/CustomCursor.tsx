'use client';
import { RootState } from '@/store';
import { setTouch } from '@/store/redux/isTouch';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const CustomCursor = () => {
  const isBrowser = typeof window !== 'undefined';
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const isTouchDevice = useSelector((state: RootState) => state.isTouch.touch);
  const isSlider = useSelector((state: RootState) => state.isSlider.slider);
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [isInitialMove, setIsInitialMove] = useState(true);
  const cursorDisabled = useSelector(
    (state: RootState) => state.cursorDisabled.disabled,
  );
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable,
  );
  const { t } = useTranslation(['index']);
  const dispatch = useDispatch();
  const requestRef = useRef<number>();

  useEffect(() => {
    if (isBrowser && !isTouchDevice) {
      const handleTouchStart = () => {
        dispatch(setTouch(true));
      };

      window.addEventListener('touchstart', handleTouchStart);

      return () => {
        window.removeEventListener('touchstart', handleTouchStart);
      };
    }
  }, [isBrowser, isTouchDevice, dispatch]);

  const updateMousePosition = useCallback(
    (clientX: number, clientY: number) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
      if (circleRef.current) {
        circleRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    },
    [],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isInitialMove) {
        setIsCursorVisible(true);
        setIsInitialMove(false);
      }

      const { clientX, clientY } = e;
      updateMousePosition(clientX, clientY);
    },
    [isInitialMove, updateMousePosition],
  );

  useEffect(() => {
    if (!isTouchDevice) {
      const onMouseMove = (e: MouseEvent) => {
        requestRef.current = requestAnimationFrame(() => handleMouseMove(e));
      };

      document.addEventListener('mousemove', onMouseMove);

      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
        document.removeEventListener('mousemove', onMouseMove);
      };
    }
  }, [handleMouseMove, isTouchDevice]);

  if (isTouchDevice || cursorDisabled) {
    return null;
  }

  return (
    <div className="relative">
      <div
        ref={circleRef}
        className={`flex items-center justify-center fixed z-[1000] rounded-full border-2
        border-cool-gray-100 pointer-events-none cursor-none`}
        style={{
          transition:
            'width 300ms ease-in-out, height 300ms, transform 85ms ease-out, backgroundColor 300ms ease-in-out',
          width: isSlider ? '70px' : isClickable ? '20px' : '45px',
          height: isSlider ? '70px' : isClickable ? '20px' : '45px',
          margin: isSlider ? '-7px' : '-20px',
          visibility: isCursorVisible ? 'visible' : 'hidden',
        }}
      />
      <div
        ref={cursorRef}
        className={`flex items-center justify-center fixed z-[999] rounded-full m-[1px] bg-log-col pointer-events-none cursor-none`}
        style={{
          transition:
            'width 300ms ease-in-out, height 300ms ease-in-out, transform 60ms ease-out',
          width: isSlider ? '55px' : '5px',
          height: isSlider ? '55px' : '5px',
          visibility: isCursorVisible && !isClickable ? 'visible' : 'hidden',
        }}
      >
        <span className="transition-all duration-200 text-cool-gray-50 text-justify font-bold text-sm antialiased z-[1000]">
          {isSlider && t('dragQuinn.drag')}
        </span>
      </div>
    </div>
  );
};

export default CustomCursor;
