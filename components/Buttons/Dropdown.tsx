import useClickableHandlers from '@/hooks/useClickableHandlers';
import { RootState } from '@/store';
import React, {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Option } from '@/types/common.types';
import { useOutsideClick } from '@/hooks/useOutsideClick';

type dropdownProps = {
  classes: string;
  defaultValue: string | React.ReactNode;
  options: Option[];
  setSelectedOption: Dispatch<SetStateAction<string>>;
  hoverMode?: boolean;
  ulClasses?: string;
  flagMode?: boolean;
  selectedOption?: string;
  liClass?: string;
  style?: React.CSSProperties;
  openClass: string;
  closeClass: string;
};

const Dropdown = ({
  classes,
  defaultValue,
  options,
  setSelectedOption,
  openClass,
  closeClass,
  hoverMode = false,
  ulClasses,
  flagMode = false,
  selectedOption,
  liClass,
  style,
}: dropdownProps) => {
  const [isRotated, setIsRotated] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const isTouch = useSelector((state: RootState) => state.isTouch.touch);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleToggleDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setDropdownOpen(!isDropdownOpen);
  };
  useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  const mouseEnterHandler = () => {
    if (!isTouch && hoverMode) {
      setDropdownOpen(true);
    }
    handleMouseEnter();
  };
  const mouseLeaveHandler = () => {
    if (!isTouch && hoverMode) {
      setDropdownOpen(false);
    }
    handleMouseLeave();
  };
  useEffect(() => {
    setIsRotated(isDropdownOpen);
  }, [isDropdownOpen]);
  useEffect(() => {
    if (isDropdownOpen) {
      setDropdownOpen(false);
    }
  }, []);
  const [summary, setSummary] = useState<string | React.ReactNode>(
    () => defaultValue,
  );
  const clickHandler = (option: Option) => {
    setSelectedOption(option.key.toLowerCase());
    setSummary(option.value);
    setDropdownOpen(false);
  };
  return (
    <div
      ref={dropdownRef}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      className="flex flex-col items-center h-full"
    >
      <button
        onClick={(e) => handleToggleDropdown(e)}
        className="flex flex-row justify-between items-center gap-1 z-20 bg-transparent cursor-none w-full h-full"
      >
        <div className="p text-start pl-3 truncate ..." style={style}>
          {summary}
        </div>
        <div>
          <Image
            src="/arrow.svg"
            alt="Arrow"
            priority
            width={8}
            height={8}
            className={`transition-transform duration-500 ease-in-out ${
              isRotated ? 'rotate' : ''
            }`}
          />
        </div>
      </button>
      <div
        className={`${classes} bg-cool-gray-800 rounded-lg shadow-sm shadow-black ${isDropdownOpen ? openClass : closeClass}`}
      >
        {isDropdownOpen && (
          <ul className={`${ulClasses} ul font-medium leading-6 text-[15px]`}>
            {options.map((option, index) => (
              <li
                data-tip={option.disabledTip}
                key={option.key.toLowerCase() + index}
                className={`w-full hover:text-log-col hover:brightness-75 transition-text duration-300 ease-in-out cursor-none ${selectedOption?.toLowerCase() === option.key.toLowerCase() ? 'bg-cool-gray-700' : ''} ${liClass} ${option.disabledTip && 'disabled text-cool-gray-600 hover:!text-cool-gray-400 tooltip tooltip-bottom tooltip-error'}`}
                onClick={() => !option.disabledTip && clickHandler(option)}
              >
                <div className="flex items-center gap-1">
                  {option.value}
                  {flagMode && <span>{option.key}</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default memo(Dropdown);
