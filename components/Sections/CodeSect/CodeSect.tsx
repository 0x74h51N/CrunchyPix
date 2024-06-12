'use client';
import React, { memo } from 'react';
import MonitorFrame from '@/components/Frames/MonitorFrame/MonitorFrame';
import { slideIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import { RootState } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { codeString } from '@/constants/codeString';
import { scrollState } from '@/store/redux/isScrollEnabled';
import TitleText from '../TitleText';

const CodeSect = () => {
  const isScrollEnabled = useSelector(
    (state: RootState) => state.isScrollEnabled.enabled,
  );
  const dispatch = useDispatch();

  const scrollHandlerEnter = () => {
    if (isScrollEnabled) {
      dispatch(scrollState(false));
    }
  };
  const scrollHandlerLeave = () => {
    if (!isScrollEnabled) {
      dispatch(scrollState(true));
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 'some' }}
      className="flex 2xl:flex-row flex-col items-center 2xl:justify-between justify-center w-full h-full 2xl:pr-20 pr-0 2xl:gap-20 xl:gap-14 gap-6"
    >
      <motion.div
        variants={slideIn('left', 'spring', 0.5, 0.5)}
        className="flex flex-col w-full 2xl:max-w-[1000px] justify-center 2xl:p-20 lg:p-14 md:p-10 max-sm:px-4 p-8 h-auto 2xl:min-h-[700px] bg-cool-gray-800 2xl:rounded-r-3xl"
      >
        <TitleText sectName="code_sect" />
      </motion.div>
      <motion.div variants={slideIn('right', 'spring', 0.5, 0.5)}>
        <MonitorFrame>
          <div
            onMouseEnter={scrollHandlerEnter}
            onMouseLeave={scrollHandlerLeave}
            className="h-full w-full overflow-scroll scrollbar-thumb scrollbar-track cursor-none bg-cool-gray-800"
          >
            <SyntaxHighlighter
              language="typescript"
              showLineNumbers
              useInlineStyles={true}
              style={vscDarkPlus}
              customStyle={{
                backgroundColor: 'transparent',
                opacity: '1',
                overflow: 'scroll',
                cursor: 'none',
              }}
              codeTagProps={{
                className: 'line-height-font-size',
              }}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        </MonitorFrame>
      </motion.div>
    </motion.div>
  );
};

export default memo(CodeSect);
