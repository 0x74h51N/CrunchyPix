'use client';

import { memo, useState } from 'react';
import { LuCopy, LuCopyCheck } from 'react-icons/lu';
import { IconType } from 'react-icons';
import {
  BiLogoJavascript,
  BiLogoTypescript,
  BiLogoPython,
} from 'react-icons/bi';
import {
  BsFiletypeJson,
  BsFiletypeHtml,
  BsFiletypeCss,
  BsTerminal,
} from 'react-icons/bs';
import { PiTreeStructure } from 'react-icons/pi';
import { CodeLanguages } from '@/types/common.types';

const iconComponents: { [K in CodeLanguages]: IconType | null } = {
  typescript: BiLogoTypescript,
  javascript: BiLogoJavascript,
  python: BiLogoPython,
  json: BsFiletypeJson,
  html: BsFiletypeHtml,
  css: BsFiletypeCss,
  structure: PiTreeStructure,
  bash: BsTerminal,
  text: null,
  table: null,
};
const TopTitle = ({
  title,
  code,
  language,
}: {
  title: string;
  code: string;
  language: CodeLanguages;
}) => {
  const [copied, setCopied] = useState(false);
  const IconComponent = language && iconComponents[language];

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
        {IconComponent && <IconComponent size={19} />}
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
