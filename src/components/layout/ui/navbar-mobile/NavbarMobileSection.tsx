import Link from 'next/link'
import {
  INavigationElement,
  NavigationElementType
} from '@/lib/graphql/queries'
import Drop from '@/assets/icons/mobile-menu.svg'
import NavbarMobileElement from '@/components/layout/ui/navbar-mobile/NavbarMobileElement'
import { useEffect, useState } from 'react'
import cx from 'classnames'
export interface INavbarMobileSection {
  data: INavigationElement
  setOpen: (state: boolean) => void
  open: boolean
}

function NavbarMobileSection({ data, setOpen, open }: INavbarMobileSection) {
  const [active, setActive] = useState<boolean>(false)
  useEffect(() => {
    !open && setActive(false)
  }, [open])
  return (
    <div
      className={
        ' px-[20px] sm:px-[30px] md:px-[40px] border-b border-b-[#DBE5EA] py-[15px]  cursor-pointer '
      }
      style={{ minHeight: '55px' }}
    >
      <div
        className={'flex items-center justify-between h-full '}
        onClick={() => setActive(!active)}
      >
        {data.hasLink ? (
          <Link
            href={data.path}
            className={'text-base font-medium w-full h-full '}
            onClick={() => setOpen(false)}
          >
            {data.label}
          </Link>
        ) : (
          <div className={'text-base font-medium  cursor-pointer'}>
            {data.label}
          </div>
        )}
        {data.navigation_elements.length > 0 && (
          <Drop
            style={{ stroke: '#A0A0A0' }}
            className={active ? 'rotate-180' : ''}
          />
        )}
      </div>

      {data.navigation_elements.length > 0 && (
        <div
          className={cx('flex flex-col py-6 ml-3   ', active ? '' : 'hidden')}
        >
          {data.navigation_elements.map(el => {
            if (el.status) {
              return (
                <NavbarMobileElement
                  setOpen={setOpen}
                  key={el.id}
                  url={data.path}
                  data={el as NavigationElementType}
                />
              )
            }
          })}
        </div>
      )}
    </div>
  )
}

export default NavbarMobileSection
