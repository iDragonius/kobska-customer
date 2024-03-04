import styles from './Navbar.module.scss'
import Dropdown from '@/components/ui/dropdown/Dropdown'
import Drop from '@/assets/icons/drop.svg'
import { useState } from 'react'
import {
  INavigationElement,
  NavigationElementType
} from '@/lib/graphql/queries/layout.query'
import NavbarElement from '@/components/layout/ui/navbar/NavbarElement'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { useScrollY } from '@/hooks/scrollY.hook'
import { useScrollContext } from '@/context/providers/ScrollContextProvider'
import Link from 'next/link'
export interface INavbarSection {
  data: INavigationElement
}

function NavbarSection({ data }: INavbarSection) {
  const [view, setView] = useState<boolean>(false)
  const { route } = useRouter()
  const { scrollY } = useScrollContext()

  return (
    <>
      {data.hasLink ? (
        <Link
          href={data.path}
          key={data.id}
          className={styles.navigationHead}
          onMouseOver={() => setView(true)}
          onMouseLeave={() => setView(false)}
        >
          <p
            className={cx(
              route === '/' && scrollY === 0
                ? styles.homeNavigationLabel
                : styles.navigationLabel
            )}
          >
            {data.label}
          </p>
          {data.navigation_elements.length > 0 && (
            <>
              <Drop
                className={cx(
                  route === '/' && scrollY === 0 ? styles.homeDrop : styles.drop
                )}
              />
              {view && (
                <Dropdown>
                  <div className={'p-5'}>
                    {data.navigation_elements.map(element => {
                      if (element.status) {
                        return (
                          <NavbarElement
                            url={data.path}
                            key={element.id}
                            data={element as NavigationElementType}
                          />
                        )
                      }
                    })}
                  </div>
                </Dropdown>
              )}
            </>
          )}
        </Link>
      ) : (
        <div
          key={data.id}
          className={styles.navigationHead}
          onMouseOver={() => setView(true)}
          onMouseLeave={() => setView(false)}
        >
          <p
            className={cx(
              route === '/' && scrollY === 0
                ? styles.homeNavigationLabel
                : styles.navigationLabel
            )}
          >
            {data.label}
          </p>
          {data.navigation_elements.length > 0 && (
            <>
              <Drop
                className={cx(
                  route === '/' && scrollY === 0 ? styles.homeDrop : styles.drop
                )}
              />
              {view && (
                <Dropdown>
                  <div className={'p-5'}>
                    {data.navigation_elements.map(element => {
                      if (element.status) {
                        return (
                          <NavbarElement
                            url={data.path}
                            key={element.id}
                            data={element as NavigationElementType}
                          />
                        )
                      }
                    })}
                  </div>
                </Dropdown>
              )}
            </>
          )}
        </div>
      )}
    </>
  )
}

export default NavbarSection
