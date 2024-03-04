import { useRouter } from 'next/router'
import Drop from '@/assets/icons/mobile-menu.svg'
import { useState } from 'react'
import cx from 'classnames'
import Link from 'next/link'
import styles from '@/components/layout/ui/navbar/Navbar.module.scss'
import Forward from '@/assets/icons/forward.svg'
export interface ILanguagesMobile {
  setOpen: (state: boolean) => void
}

function LanguagesMobile({ setOpen }: ILanguagesMobile) {
  const { locales, asPath, locale } = useRouter()
  const [active, setActive] = useState<boolean>(false)

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
        <p className={'text-base font-medium  '}>
          {locale === 'en'
            ? 'Change language'
            : locale === 'az'
            ? 'Dilini dəyişdirmək'
            : 'Изменить язык'}
        </p>
        <Drop
          style={{ stroke: '#A0A0A0' }}
          className={active ? 'rotate-180' : ''}
        />
      </div>
      <div className={cx('ml-5 py-3 ', active ? 'block' : 'hidden')}>
        {locales?.map(lc => {
          return (
            <Link
              href={asPath}
              key={lc}
              locale={lc}
              onClick={() => setOpen(false)}
              className={cx(styles.navigationLink)}
            >
              <Forward className={cx(styles.forward)} />
              <div
                className={styles.navbarElement}
                style={{ paddingBlock: '6px' }}
              >
                <p>{lc}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default LanguagesMobile
