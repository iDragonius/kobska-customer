import { ILayoutQuery } from '@/lib/graphql/queries/layout.query'
import styles from './Navbar.module.scss'
import NavbarSection from '@/components/layout/ui/navbar/NavbarSection'
import cx from 'classnames'
import NavbarLoading from '@/components/ui/loading/navbarLoading/NavbarLoading'
import Languages from '@/components/layout/ui/navbar/languages'
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
        <Languages />
      </div>
    </div>
  )
}

export default Navbar
