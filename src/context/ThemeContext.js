import { createContext } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {

  // custom logic
  
  return (
    <ThemeContext.Provider value={{color: '#e35b32'}}>
      {children}
    </ThemeContext.Provider>
  )
}