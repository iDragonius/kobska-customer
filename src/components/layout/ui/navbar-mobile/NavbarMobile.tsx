import NavbarMobileSection from '@/components/layout/ui/navbar-mobile/NavbarMobileSection'
import { ILayoutQuery } from '@/lib/graphql/queries'
import { useEffect } from 'react'
import cx from 'classnames'
import LanguagesMobile from '@/components/ui/languages/LanguagesMobile'
import { useRouter } from 'next/router'
export interface INavbarMobile {
  loading: boolean
  data: Pick<ILayoutQuery, 'navigationMenu'>
  open: boolean
  setOpen: (state: boolean) => void
}

function NavbarMobile({ loading, data, open, setOpen }: INavbarMobile) {
  const { asPath } = useRouter()
  useEffect(() => {
    return () => {
      document.body.style.overflowY = 'auto'
      setOpen(false)
    }
  }, [])
  useEffect(() => {
    setOpen(false)
  }, [asPath])
  if (loading) {
    return <></>
  }
  return (
    <div
      className={cx(
        'h-[calc(100vh-81px)]  w-screen absolute bg-white overflow-y-auto transition-all ease-in-out',
        !open && 'hidden'
      )}
    >
      <div className={'flex flex-col'}>
        {data.navigationMenu.data.attributes.navigations.map(nav => (
          <NavbarMobileSection
            key={nav.id}
            data={nav}
            setOpen={setOpen}
            open={open}
          />
        ))}

        <LanguagesMobile setOpen={setOpen} />
      </div>
    </div>
  )
}

export default NavbarMobile
