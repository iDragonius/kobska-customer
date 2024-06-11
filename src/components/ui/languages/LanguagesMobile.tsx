import { useRouter } from 'next/router'
import Drop from '@/assets/icons/mobile-menu.svg'
import { useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import Link from 'next/link'
import styles from '@/components/layout/ui/navbar/Navbar.module.scss'
import Forward from '@/assets/icons/forward.svg'
import { useOnClickOutside } from 'usehooks-ts'
import { getCookie, hasCookie, setCookie } from 'cookies-next'
export interface ILanguagesMobile {
  setOpen: (state: boolean) => void
}

function LanguagesMobile({ setOpen }: ILanguagesMobile) {
  const [active, setActive] = useState<boolean>(false)
  const languages = [
    { label: 'En', value: '/auto/en' },
    { label: `Ru`, value: '/auto/ru' },
    { label: 'Az', value: '/auto/az' }
  ]

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
      className={
        'w-full px-[20px] sm:px-[30px] md:px-[40px] border-b border-b-[#DBE5EA] py-[15px]'
      }
    >
      <div
        className={'flex justify-between items-center cursor-pointer'}
        onClick={() => setActive(!active)}
      >
        <p className={'text-base font-medium  '}>Dil</p>
        <Drop
          style={{ stroke: '#A0A0A0' }}
          className={active ? 'rotate-180' : ''}
        />
      </div>
      <div className={cx('ml-5 py-3 ', active ? 'block' : 'hidden')}>
        {languages?.map(lc => {
          return (
            <div
              translate={'no'}
              key={lc.value}
              onClick={() => {
                setOpen(false)
                langChange(lc.value)
              }}
              className={cx(styles.navigationLink)}
            >
              <Forward className={cx(styles.forward)} />
              <div
                className={styles.navbarElement}
                style={{ paddingBlock: '6px' }}
              >
                <p>{lc.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LanguagesMobile
