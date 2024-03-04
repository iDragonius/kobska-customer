import React, { ReactNode, useEffect, useState } from 'react'
import Header from '@/components/layout/ui/header/Header'
import Footer from '@/components/layout/ui/footer/Footer'
import styles from './Layout.module.scss'

import Navbar from '@/components/layout/ui/navbar/Navbar'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { useScrollContext } from '@/context/providers/ScrollContextProvider'
import { useQuery } from '@apollo/client'
import { ILayoutQuery, LayoutQuery } from '@/lib/graphql/queries/layout.query'
import { LanguagesQueryEnum } from '@/config'
import NavbarMobile from '@/components/layout/ui/navbar-mobile/NavbarMobile'
import { useWindowSizeContext } from '@/context/providers/WindowSizeContextProvider'
interface ILayout {
  children: ReactNode
}
export const Layout = ({ children }: ILayout) => {
  const { route, locale } = useRouter()
  const { scrollY } = useScrollContext()
  const windowSize = useWindowSizeContext()
  const [open, setOpen] = useState<boolean>(false)
  const { data, loading, refetch } = useQuery<ILayoutQuery>(LayoutQuery, {
    variables: {
      locale: LanguagesQueryEnum[locale as keyof typeof LanguagesQueryEnum]
    },
    notifyOnNetworkStatusChange: true
  })

  useEffect(() => {
    refetch().catch(err => {
      console.log(err)
    })
  }, [locale])
  useEffect(() => {}, [open, windowSize.width])
  return (
    <>
      <div className={'min-h-[calc(100vh-80px)] mb-[-61px]'}>
        <div
          className={cx(
            'sticky top-0  z-[1000] transition mb-5  mb:mb-[50px]',
            route === '/' && scrollY === 0 && !open
              ? 'bg-transparent'
              : 'bg-white'
          )}
        >
          <Header setOpen={setOpen} open={open} />
          {windowSize.width > 900 ? (
            <Navbar data={data as ILayoutQuery} loading={loading} />
          ) : (
            <NavbarMobile
              setOpen={setOpen}
              loading={loading}
              data={data as ILayoutQuery}
              open={open}
            />
          )}
        </div>
        <main className={styles.main}>{children}</main>
      </div>

      <Footer data={data as ILayoutQuery} loading={loading} />
    </>
  )
}
