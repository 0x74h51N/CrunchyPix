'use client';

import LogoImage from '@/components/LogoImage';
import { memo, useState } from 'react';
import { LuCopy, LuCopyCheck } from 'react-icons/lu';

const TopTitle = ({
  title,
  code,
  language,
}: {
  title: string;
  code: string;
  language: string;
}) => {
  const [copied, setCopied] = useState(false);

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
      <div className="flex items-center gap-1 p-3 pb-4">
        <div className="w-5 h-5 flex grayscale rounded-sm">
          <LogoImage tooltip={false} logoKey={language} index={0} />
        </div>
        <span className="text-sm">
          {title === 'preformatted' ? 'Bash' : title}
        </span>
      </div>
      <div className="p-4 hover:text-log-col">
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

export default memo(TopTitle);
