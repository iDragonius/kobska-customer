import { ReactNode } from 'react'
import ScrollContextProvider from '@/context/providers/ScrollContextProvider'
import WindowSizeContextProvider from '@/context/providers/WindowSizeContextProvider'

export interface IProviders {
  children: ReactNode
}

function Providers({ children }: IProviders) {
  return (
    <WindowSizeContextProvider>
      <ScrollContextProvider>{children}</ScrollContextProvider>
    </WindowSizeContextProvider>
  )
}

export default Providers
