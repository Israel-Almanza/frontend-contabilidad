import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LayoutSplashScreen } from '../core/context/SplashScrean'
import { useNavigation } from '../core/hooks/useNavigation'
import { AuthContext } from './modules/auth/context'
import { AuthPage } from './modules/auth/page/AuthPage'
import { AppRouter } from './router/AppRouter'

export const Navigation = () => {
  const { verifed } = useNavigation()
  console.log(verifed)
 // if (!verifed) return <LayoutSplashScreen />

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <RoutesPublic>
            <AuthPage />
          </RoutesPublic>
        }
      />
      <Route
        path="/*"
        element={
          <RoutesPrivate>
            <AppRouter />
          </RoutesPrivate>
        }
      />
    </Routes>
  )
}
const RoutesPublic = ({ children }: any) => {
  const {
    authState: { token }
  } = useContext(AuthContext)
  console.log(token)
  return token === null ? children : <Navigate to="/" />
}
const RoutesPrivate = ({ children }: any) => {
  const {
    authState: { token }
  } = useContext(AuthContext)
  console.log(token)
  return token !== null ? children : <Navigate to="/login" />
}
