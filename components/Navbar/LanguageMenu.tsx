'use client'
import { RootState } from '@/store'
import i18n from '@/i18n/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DE, TR, GB } from 'country-flag-icons/react/3x2'
import Image from 'next/image'
import { languageMenuChange } from '@/store/redux/isLanguageMenu'
import { switchLocaleAction } from '@/i18n/actions/switch-locale'
import useClickableHandlers from '@/hooks/useClickableHandlers'

const LanguageMenu = ({ smallNav }: { smallNav: boolean }) => {
  const isDropdownOpen = useSelector(
    (state: RootState) => state.isLanguageMenu.languageMenu,
  )
  const [isRotated, setIsRotated] = useState(false)
  const dispatch = useDispatch()
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile)
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet)
  const isTouch = useSelector((state: RootState) => state.isTouch.touch)
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers()
  const handleToggleDropdown = () => {
    dispatch(languageMenuChange(!isDropdownOpen))
  }

  const handleChange = async (selectedLanguage: string) => {
    const result = await switchLocaleAction(selectedLanguage)
    if (result.status === 'success') {
      i18n.changeLanguage(selectedLanguage)
    }
    dispatch(languageMenuChange(!isDropdownOpen))
  }
  const mouseEnterHandler = () => {
    if (!isTouch) {
      dispatch(languageMenuChange(true))
      handleMouseEnter()
    }
  }
  const mouseLeaveHandler = () => {
    if (!isTouch) {
      dispatch(languageMenuChange(false))
      handleMouseLeave()
    }
  }
  useEffect(() => {
    setIsRotated(isDropdownOpen)
  }, [isDropdownOpen])
  useEffect(() => {
    if (isDropdownOpen) {
      dispatch(languageMenuChange(false))
    }
  }, [])
  const getFlagComponent = (language: string) => {
    switch (language) {
      case 'en':
        return <GB title="United Kingdom" />
      case 'de':
        return <DE title="Germany" />
      case 'tr':
        return <TR title="Turkey" />
    }
  }
  const languages = [
    { label: 'EN', Component: GB },
    { label: 'DE', Component: DE },
    { label: 'TR', Component: TR },
  ]
  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      className="flex flex-center items-center"
    >
      <button
        onClick={handleToggleDropdown}
        className="flex flex-row gap-1 items-center bg-transparent cursor-none"
      >
        <div className="w-6">{getFlagComponent(i18n.language)}</div>
        <div>
          <Image
            src="/arrow.svg"
            alt="Arrow"
            width={8}
            height={8}
            className={`transition-transform duration-500 ease-in-out ${
              isRotated ? 'rotate' : ''
            }`}
          />
        </div>
      </button>
      <div
        className={`relative mobile-menu text-neutral-200 w-20 right-6 bg-cool-gray-800 rounded-lg shadow-sm shadow-black  ${
          isDropdownOpen
            ? 'open2 border-2 border-cool-gray-700 border-opacity-40'
            : 'close'
        } ${
          smallNav
            ? `${isMobile || isTablet ? 'mt-6' : 'mt-12'} flex justify-center`
            : isMobile || isTablet
              ? `mt-6 flex justify-center`
              : 'mt-[96px]'
        } 
        `}
      >
        {isDropdownOpen && (
          <ul className="ul">
            {languages.map((language) => (
              <li
                key={language.label.toLowerCase()}
                className="hover:text-log-col transition-text duration-300 ease-in-out cursor-none"
                onClick={() => handleChange(language.label.toLowerCase())}
              >
                <div className="flex items-center gap-1">
                  <language.Component />
                  <span>{language.label}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default LanguageMenu
