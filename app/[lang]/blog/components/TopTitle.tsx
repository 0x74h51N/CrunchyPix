'use client';

import useClickableHandlers from '@/hooks/useClickableHandlers';
import { useState } from 'react';
import { LuCopy, LuCopyCheck } from 'react-icons/lu';

const TopTitle = ({ title, code }: { title: string; code: string }) => {
  const [copied, setCopied] = useState(false);
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 800);
    });
  };

  return (
    <div className="bg-base-200 w-full flex -mb-3 px-2 justify-between">
      <span className="p-3 pb-4">
        {title === 'preformatted' ? 'Bash' : title}
      </span>
      <div
        className="p-4 hover:text-log-col"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {copied ? (
          <LuCopyCheck
            className="ml-1.5 text-xl font-normal text-log-col h-5 w-5 flex-shrink-0"
            aria-hidden="true"
          />
        ) : (
          <div onClick={handleCopy}>
            <LuCopy
              className="ml-1.5 text-xl font-normal h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopTitle;
