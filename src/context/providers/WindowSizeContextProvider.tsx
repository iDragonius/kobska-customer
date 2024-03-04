import { ReactNode, useContext, useEffect, useState } from 'react'
import { WindowSizeContext } from '@/context/WindowSizeContext'
import { useWindowSize } from '@/hooks/useWindowSize'

export interface IWindowSizeContextProvider {
  children: ReactNode
}

function WindowSizeContextProvider({ children }: IWindowSizeContextProvider) {
  const windowSize = useWindowSize()
  return (
    <>
      <WindowSizeContext.Provider value={windowSize}>
        {children}
      </WindowSizeContext.Provider>
    </>
  )
}

export const useWindowSizeContext = () => useContext(WindowSizeContext)

export default WindowSizeContextProvider
