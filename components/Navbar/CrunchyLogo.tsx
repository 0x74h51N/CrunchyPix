import Image from 'next/image'
import Link from 'next/link'
import TypingText from '../typeText'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { clickableChange } from '@/store/redux/isClickable'

const CrunchyLogo = ({ smallNav }: { smallNav: boolean }) => {
  const dispatch = useDispatch()
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile)
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet)

  const screenWidth = useSelector((state: RootState) => state.screenWidth.width)
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable,
  )
  const handleMouseEnter = () => {
    if (isClickable == false) {
      dispatch(clickableChange(true))
    }
  }
  const handleMouseLeave = () => {
    if (isClickable == true) {
      dispatch(clickableChange(false))
    }
  }
  return (
    <Link
      href="/"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex flex-row items-center justify-center pointer-events-auto cursor-none"
    >
      <Image
        src={'/logo_leftw.svg'}
        width={smallNav ? 12.5 : isMobile ? 18.5 : isTablet ? 27.5 : 32.5}
        height={100}
        alt="Crunchypix"
        priority
        className={`${
          smallNav ? '' : 'navImage'
        } transition-all hover:scale-105 duration-1000 ease-in-out pb-3`}
      />
      {smallNav || screenWidth <= 300 ? null : (
        <div
          className={`flex items-center logo_text lg:mt-0 -mt-1 lg:-ml-2 -ml-1 ${
            smallNav
              ? 'text-[25px]'
              : isMobile
                ? 'text-[30px]'
                : isTablet
                  ? 'text-[45px]'
                  : 'text-[55px]'
          } text-stone-50 hover:scale-105 transition-all duration-1000 ease-in-out`}
        >
          <TypingText text="Crunchy" typingSpeed={50} _code={false} />
          <span className="mt-12 -ml-1">
            <TypingText
              text="Pix"
              _code={false}
              typingSpeed={70}
              delay={400}
              textClass={`text-log-col`}
            />
          </span>
        </div>
      )}
      <Image
        src={'/logoRight.svg'}
        width={smallNav ? 19.3 : isMobile ? 28 : isTablet ? 40 : 50}
        height={100}
        alt="Crunchypix"
        priority
        className={`${
          smallNav
            ? 'mt-2'
            : 'navImage lg:translate-y-6 translate-y-[22px] -translate-x-2'
        } hover:scale-105 transition-all duration-1000 ease-in-out `}
      />
    </Link>
  )
}

export default CrunchyLogo
