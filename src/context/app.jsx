import { createContext, useState } from 'react'

// 1- Crear el Contexto
export const AppContext = createContext()

// 2- Crear el provider (proveer este contexto)
export function AppProvider({ children }) {
  const [app, setApp] = useState({
    // 3- Definir el estado inicial del contexto
    messageSuccess: '',
  })
  return (
    <AppContext.Provider
      value={{
        // 3- Definir el estado inicial del contexto
        app,
        setApp,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
