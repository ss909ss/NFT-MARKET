import { Route, Routes } from 'react-router'
import './App.module.scss'
import routes from './routes/Routes'
import Layout from './Layout/Layout'

const App = () => {
 
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route >
    </Routes>
  )
}

export default App
