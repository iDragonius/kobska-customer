import Logo from '@/assets/logo-colored.svg'
import WhiteLogo from '@/assets/logo-white.svg'
import styles from './Header.module.scss'
import Languages from '@/components/ui/languages/Languages'

import { useRouter } from 'next/router'
import Link from 'next/link'
import Burger from '@/assets/icons/burger.svg'
import Close from '@/assets/icons/close.svg'
import { useScrollContext } from '@/context/providers/ScrollContextProvider'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useWindowSizeContext } from '@/context/providers/WindowSizeContextProvider'
import LanguagesMobile from '@/components/ui/languages/LanguagesMobile'
export interface IHeader {
  setOpen: (state: boolean) => void
  open: boolean
}
const Header = ({ setOpen, open }: IHeader) => {
  const { route } = useRouter()

  const { scrollY } = useScrollContext()
  const { width } = useWindowSizeContext()
  return (
    <div className={styles.main}>
      <div className={styles.marginContainer}>
        <Link href={'/'}>
          {route === '/' && scrollY === 0 && !open ? <WhiteLogo /> : <Logo />}
        </Link>
        <div className={styles.wrapper}>
          {width > 900 ? (
            <>
              {process.env.LANGUAGE_MODE === 'multi' && (
                <>
                  <div className={styles.breadcrumb} />
                  <Languages scrollY={scrollY} route={route} />
                </>
              )}
            </>
          ) : (
            <>
              {open ? (
                <Close
                  onClick={() => setOpen(false)}
                  className={'cursor-pointer'}
                  style={{ stroke: '#111827' }}
                />
              ) : (
                <Burger
                  style={
                    route === '/' && scrollY === 0 && !open
                      ? { stroke: '#fff' }
                      : { stroke: '#000' }
                  }
                  className={'cursor-pointer'}
                  onClick={() => setOpen(true)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
