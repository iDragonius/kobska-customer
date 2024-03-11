import { NavigationElementType } from '@/lib/graphql/queries'
import Link from 'next/link'
import cx from 'classnames'
import styles from '@/components/layout/ui/navbar/Navbar.module.scss'
import Forward from '@/assets/icons/forward.svg'
import { useState } from 'react'
import { clsx } from 'clsx'
import Dropdown from '@/components/ui/dropdown/Dropdown'
import Drop from '@/assets/icons/mobile-menu.svg'

export interface INavbarMobileElement {
  data: NavigationElementType
  url: string
  setOpen: (state: boolean) => void
}

function NavbarMobileElement({ data, url, setOpen }: INavbarMobileElement) {
  const years = data.years?.split(',') || []
  const [openYears, setOpenYears] = useState<boolean>(false)
  return years.length ? (
    <>
      <div
        onClick={() => setOpenYears(prevState => !prevState)}
        className={clsx(
          styles.navbarElement,
          'hover:text-navigationHover flex justify-between'
        )}
        style={{ paddingBlock: '8px' }}
      >
        <p>{data.label}</p>
        <Drop
          style={{ stroke: '#A0A0A0' }}
          className={openYears ? 'rotate-180' : ''}
        />
      </div>
      {openYears && (
        <div className={'flex flex-col gap-1.5 ml-5'}>
          {years.map(year => (
            <Link
              href={url + data.path + `?year=${year}`}
              key={year}
              className={'block hover:underline'}
            >
              {year}
            </Link>
          ))}
        </div>
      )}
    </>
  ) : (
    <Link
      href={data.type === 'relative' ? url + data.path : data.path}
      onClick={() => setOpen(false)}
      className={cx(styles.navigationLink)}
    >
      <Forward className={cx(styles.forward)} />
      <div className={styles.navbarElement} style={{ paddingBlock: '8px' }}>
        <p>{data.label}</p>
      </div>
    </Link>
  )
}

export default NavbarMobileElement
