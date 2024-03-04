import styles from '@/components/ui/languages/Languages.module.scss'
import LanguagesIcon from '@/assets/icons/languages.svg'
import { useRouter } from 'next/router'
import cx from 'classnames'
import { useState } from 'react'
import Link from 'next/link'

interface ILanguages {
  scrollY: number
  route: string
}
function Languages({ scrollY, route }: ILanguages) {
  const { locale, locales, asPath } = useRouter()
  const [active, setActive] = useState<boolean>(false)
  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cx(
        scrollY === 0 && route === '/'
          ? styles.homeLanguageContainer
          : styles.languageContainer
      )}
    >
      <div className={styles.languageWrapper}>
        <LanguagesIcon
          className={cx(
            scrollY === 0 && route === '/' ? 'stroke-[#fff]' : 'stroke-[#000]'
          )}
        />
        <p className={styles.language}>
          {locale?.split('')[0].toUpperCase()}
          {locale?.split('')[1]}
        </p>
      </div>
      <div
        className={cx(
          scrollY === 0 && route === '/'
            ? 'absolute top-9 py-1 -left-[1px] w-full flex justify-center flex-col bg-white rounded-[20px] shadow'
            : 'absolute top-9 py-1 -left-[1px] w-full bg-iconBg flex flex-col justify-center rounded-[20px] shadow',
          !active && 'hidden'
        )}
      >
        {locales?.map(lang => {
          if (lang === locale) return <div key={lang}></div>
          return (
            <Link
              key={lang}
              locale={lang}
              href={asPath}
              onClick={() => setActive(false)}
              className={
                'py-1 w-full text-center hover:text-[#27749C] hover:font-bold transition-all ease-in-out'
              }
            >
              {lang[0].toUpperCase() + lang[1]}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Languages
