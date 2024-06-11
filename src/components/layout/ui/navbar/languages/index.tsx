import clsx from 'clsx'
import { getCookie, hasCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import cx from 'classnames'

import styles from '../Navbar.module.scss'
import Drop from '@/assets/icons/drop.svg'
import { useOnClickOutside } from 'usehooks-ts'
export interface LanguagesProps {}

const Languages: FC<LanguagesProps> = () => {
  const [isShown, setShown] = useState<boolean>(false)
  const toggle = () => setShown(prevState => !prevState)
  const { route } = useRouter()
  const languages = [
    { label: 'En', value: '/auto/en' },
    { label: `Ru`, value: '/auto/ru' },
    { label: 'Az', value: '/auto/az' }
  ]
  const langRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(langRef, () => {
    setShown(false)
  })
  const [selected, setSelected] = useState<string | null>(null)
  useEffect(() => {
    var addScript = document.createElement('script')
    addScript.setAttribute(
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    )
    document.body.appendChild(addScript)
    if (hasCookie('googtrans')) {
      setSelected(getCookie('googtrans') as string)
    } else {
      setSelected('/auto/en')
    }
    //@ts-ignore
    window.googleTranslateElementInit = googleTranslateElementInit
  }, [])

  const googleTranslateElementInit = () => {
    //@ts-ignore
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'auto',
        autoDisplay: false,
        includedLanguages: 'ru,en,az', // If you remove it, by default all google supported language will be included
        //@ts-ignore
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
      },
      'google_translate_element'
    )
  }
  const langChange = (e: string) => {
    if (hasCookie('googtrans')) {
      setCookie('googtrans', decodeURI(e))
      setSelected(e)
    } else {
      setCookie('googtrans', e)
      setSelected(e)
    }
    window.location.reload()
  }
  return (
    <div
      className={'relative'}
      onMouseOver={() => setShown(true)}
      ref={langRef}
    >
      <div
        className={clsx(
          route === '/' && scrollY === 0 ? 'text-white' : 'text-black',
          'flex gap-3  font-medium items-center py-3 px-2 trans   cursor-pointer  '
        )}
        translate={'no'}
        onClick={toggle}
      >
        {languages.find(el => el.value === selected)?.label}
        <Drop
          className={cx(
            route === '/' && scrollY === 0 ? styles.homeDrop : styles.drop
          )}
        />
      </div>
      {isShown && (
        <div className={'absolute bg-white w-full border mt-1 '}>
          {languages?.map(lc => (
            <div
              translate={'no'}
              className={clsx(
                route === '/' && scrollY === 0 ? '' : '',
                'py-1 px-2 trans  cursor-pointer'
              )}
              key={lc.value}
              onClick={() => {
                langChange(lc.value)
              }}
            >
              {lc.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Languages
