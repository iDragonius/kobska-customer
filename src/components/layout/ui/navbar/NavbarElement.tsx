import styles from './Navbar.module.scss'
import { NavigationElementType } from '@/lib/graphql/queries/layout.query'
import { useState } from 'react'
import Forward from '@/assets/icons/forward.svg'
import Link from 'next/link'
import cx from 'classnames'
export interface INavbarElement {
  data: NavigationElementType
  url: string
  years: string[]
}

function NavbarElement({ data, url, years }: INavbarElement) {
  const [hovered, setHovered] = useState<boolean>(false)
  return (
    <div
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={data.type === 'relative' ? url + data.path : data.path}
        className={cx(styles.navigationLink)}
      >
        <Forward className={cx(styles.forward)} />
        <div className={styles.navbarElement}>
          <p>{data.label}</p>
        </div>
      </Link>
      {years.length > 0 && hovered && (
        <div
          className={
            'absolute flex flex-col -right-[200px] -mt-8 px-3  w-[200px] py-1 bg-white shadow-2xl'
          }
        >
          {years.map(year => (
            <Link
              key={year}
              href={
                data.type === 'relative'
                  ? url + data.path + `?year=${year}`
                  : data.path + `?year=${year}`
              }
              className={' py-1 text-[15px] hover:text-navigationHover'}
            >
              {year}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default NavbarElement
