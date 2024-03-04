import { createContext, useContext } from 'react'

export interface IScrollContext {
  scrollY: number
}

export const ScrollContext = createContext<IScrollContext>({
  scrollY: 0
})
