'use client'
import { Links } from '@/constants/index'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import MobileMenu from './MobileMenu'
import LanguageMenu from './LanguageMenu'
import { useSelector, useDispatch } from 'react-redux'
import { mobileChange } from '@/store/redux/isMobile'
import { RootState } from '@/store'
import { tabletChange } from '@/store/redux/isTablet'
import { setScreenHeight } from '@/store/redux/screenHeight'
import { setScreenWidth } from '@/store/redux/screenWidth'
import { mobileMenuChange } from '@/store/redux/isMobileMenu'
import CrunchyLogo from './CrunchyLogo'
import { useTranslation } from '@/hooks/useTranslation'
import useClickableHandlers from '@/hooks/useClickableHandlers'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

export const Navbar = () => {
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile)
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet)
  const isMenuOpen = useSelector(
    (state: RootState) => state.isMobileMenu.mobileMenu,
  )
  const selectedLink = useSelector((state: RootState) => state.page.currentPage)
  const screenWidth = useSelector((state: RootState) => state.screenWidth.width)
  const screenHeight = useSelector(
    (state: RootState) => state.screenHeight.height,
  )
  const [smallNav, setSmallNav] = useState(false)

  const dispatch = useDispatch()
  const { t } = useTranslation('index')

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setSmallNav(false)
      } else {
        setSmallNav(true)
      }
    })
  }

  const { targetRef } = useIntersectionObserver(observerCallback, {
    threshold: 0,
  })

  useEffect(() => {
    if (typeof window != 'undefined') {
      const handleResize = () => {
        const screenWidth = window.innerWidth
        const screenHeight = window.innerHeight

        dispatch(setScreenHeight(screenHeight))
        dispatch(setScreenWidth(screenWidth))

        if (screenWidth <= 768) {
          dispatch(mobileChange(true))
          dispatch(tabletChange(false))
        } else if (screenWidth <= 1030) {
          dispatch(mobileChange(false))
          dispatch(tabletChange(true))
        } else {
          dispatch(mobileChange(false))
          dispatch(tabletChange(false))
          if (isMenuOpen) {
            dispatch(mobileMenuChange(false))
          }
        }
      }

      window.addEventListener('resize', handleResize)
      handleResize()

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [dispatch, isTablet, isTablet, screenWidth, screenHeight])

  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers()
  return (
    <>
      <div
        ref={targetRef}
        id="targetto"
        style={{
          position: 'absolute',
          top: '50px',
          width: '1px',
          height: '1px',
        }}
      />
      <div className="flex justify-center min-w-[100svw]">
        <nav
          className={`fixed w-auto 2xl:min-w-[1450px] xl:min-w-[75svw] min-w-[100svw]  top-0 z-50 gap-4 bg-cool-gray-900 transition-all duration-1000 ease-in-out rounded-b-xl md:px-10 px-5 ${
            isMenuOpen
              ? `navbar h-[280px] py-5 bg-opacity-0 ${
                  smallNav &&
                  'h-[250px] bg-opacity-100 py-2 shadow-md shadow-black'
                }`
              : smallNav
                ? 'bg-opacity-100 h-[70px] py-1 shadow-md shadow-black'
                : 'py-5 bg-opacity-0 h-[150px] '
          }`}
        >
          <div className="flex items-center">
            <CrunchyLogo smallNav={smallNav} />
            <div
              className={`flex flex-center items-start ml-auto transition-all duration-1000 ease-in-out`}
            >
              {isMobile || isTablet ? (
                <MobileMenu smallNav={smallNav} />
              ) : (
                <div>
                  <ul
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`flex max-lg:text-base max-xl:gap-6 max-lg:gap-5 transition-all duration-1000 ease-in-out ${
                      smallNav
                        ? 'text-md font-medium gap-8 mt-2'
                        : 'text-lg font-semibold'
                    }  text-stone-200 antialiased gap-12 `}
                  >
                    {Links.map((link) => (
                      <Link
                        href={link.href}
                        key={link.key}
                        className={`hover:text-log-col hover:scale-110 cursor-none  ${
                          selectedLink === link.href && link.href !== '/'
                            ? 'text-log-col'
                            : ''
                        } relative group transition-all duration-300 ease-in-out transform origin-bottom whitespace-nowrap`}
                      >
                        {t(link.text)}
                        <span
                          className={`absolute -bottom-1 left-0 h-0.5 bg-log-col ${
                            selectedLink === link.href && link.href !== '/'
                              ? 'w-full'
                              : 'w-0 transition-all group-hover:w-full'
                          }`}
                        ></span>
                      </Link>
                    ))}
                    <div
                      className="h-auto w-auto flex justify-center"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <LanguageMenu smallNav={smallNav} />
                    </div>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
