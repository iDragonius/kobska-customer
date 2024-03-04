import { createContext, useContext } from 'react'

export interface IWindowSizeContext {
  width: number
  height: number
}

export const WindowSizeContext = createContext<IWindowSizeContext>({
  width: 0,
  height: 0
})
