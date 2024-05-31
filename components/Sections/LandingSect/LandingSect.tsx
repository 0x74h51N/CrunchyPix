'use client'
import { slideIn, staggerContainer, polygonIn } from '@/utils/motion'
import { motion } from 'framer-motion'
import { generateSpans } from '../../GenerateSpans'
import { useTranslation } from '@/hooks/useTranslation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { SocialIcons } from '../../SocialIcons'
import TypingText from '../../typeText'
import { socialIcons } from '@/constants/socialIcons'

const LandingSect = () => {
  const { t } = useTranslation('home')
  const screenHeight = useSelector(
    (state: RootState) => state.screenHeight.height,
  )
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile)
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet)

  return (
    <>
      <motion.div
        variants={staggerContainer(2, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className={`anaDiv relative flex flex-wrap justify-center items-center w-full min-h-[100dvh] overflow-hidden`}
      >
        <div
          className={`w-full flex flex-col text-center justify-center items-center p-8 max-xs:px-4 z-0 pb-40 ${
            screenHeight <= 600 ? 'pb-[0px] z-30' : isMobile ? 'pb-[220px]' : ''
          }`}
        >
          <div
            className={`font-medium lg:text-[40px] sm:text-[30px] text-[25px] text-white`}
          >
            <TypingText
              generateSpan={isMobile || isTablet ? false : true}
              _code={false}
              text={t('landing.intro')}
              typingSpeed={50}
              colorType="vibrantColors"
            />
          </div>
          <div className=" lg:text-[19px] text-[18px] leading-[30px] max-lg:leading-[20px] whitespace-pre-wrap text-white">
            <TypingText
              generateSpan={isMobile || isTablet ? false : true}
              _code={false}
              text={t('landing.description')}
              typingSpeed={50}
              colorType="vibrantColors"
              delay={700}
            />
          </div>

          <motion.h1
            variants={slideIn('up', 'spring', 2, 1.5)}
            className="font-black text-white md:text-[55x] sm:text-[50px] xs:text-[40px] text-[30px] max-w-2xl leading-[40px] mt-2"
          >
            {isMobile || isTablet
              ? t('landing.title')
              : generateSpans({
                  text: t('landing.title'),
                  colorType: 'vibrantColors',
                })}
          </motion.h1>
        </div>

        <motion.div
          variants={polygonIn('down', 'spring', 2, 2.5)}
          className={`absolute h-full w-full pointer-events-none  ${
            isMobile || screenHeight <= 600
              ? `flex flex-row gap-4 justify-center items-center pb-10 ${
                  screenHeight <= 600 && 'pt-[240px] pb-0 z-30'
                }`
              : ''
          }`}
        >
          <SocialIcons
            colorful={true}
            _colorType={'vibrantColors'}
            iconPack={socialIcons}
          />
        </motion.div>
      </motion.div>
    </>
  )
}
export default LandingSect
