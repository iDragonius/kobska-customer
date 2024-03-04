import { ILayoutQuery } from '@/lib/graphql/queries/layout.query'
import styles from './Navbar.module.scss'
import NavbarSection from '@/components/layout/ui/navbar/NavbarSection'
import cx from 'classnames'
import NavbarLoading from '@/components/ui/loading/navbarLoading/NavbarLoading'
export interface INavbar {
  loading: boolean
  data: Pick<ILayoutQuery, 'navigationMenu'>
}

function Navbar({ loading, data }: INavbar) {
  if (loading) {
    return <NavbarLoading />
  }

  return (
    <div className={styles.main}>
      <div className={cx(styles.wrapper)}>
        {data?.navigationMenu.data.attributes.navigations.map(navigation => {
          if (navigation.status) {
            return <NavbarSection data={navigation} key={navigation.id} />
          }
        })}
      </div>
    </div>
  )
}

export default Navbar
