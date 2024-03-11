import { NavigationElementType } from '@/lib/graphql/queries'
import Link from 'next/link'
import cx from 'classnames'
import styles from '@/components/layout/ui/navbar/Navbar.module.scss'
import Forward from '@/assets/icons/forward.svg'

export interface INavbarMobileElement {
  data: NavigationElementType
  url: string
  setOpen: (state: boolean) => void
}

function NavbarMobileElement({ data, url, setOpen }: INavbarMobileElement) {
  return (
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
