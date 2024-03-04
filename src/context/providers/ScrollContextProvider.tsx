import { ReactNode, useContext } from 'react'
import { useScrollY } from '@/hooks/scrollY.hook'
import { ScrollContext } from '@/context/ScrollContext'

export interface IScrollContextProvider {
  children: ReactNode
}

function ScrollContextProvider({ children }: IScrollContextProvider) {
  const scrollY = useScrollY()

  return (
    <ScrollContext.Provider value={{ scrollY }}>
      {children}
    </ScrollContext.Provider>
  )
}

export const useScrollContext = () => useContext(ScrollContext)

export default ScrollContextProvider
