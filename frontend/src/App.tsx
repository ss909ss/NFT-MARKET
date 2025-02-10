import { Route, Routes } from 'react-router'
import './App.module.scss'
import routes from './routes/Routes'
import Layout from './Layout/Layout'
import ProfilePage from './pages/Profile/Profile'
import OnSale from './components/onSale/onSale'
import Collectibles from './components/Collectibles/Collectibles'

const App = () => {

  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route path="/profile/*" element={<ProfilePage />}>
          <Route path="on-sale" element={<OnSale />} />
          <Route path="collectibles" element={<Collectibles />} />
          {/* <Route path="created" element={<Created />} />
        <Route path="likes" element={<Likes />} />
        <Route path="following" element={<Following />} />
        <Route path="followers" element={<Followers />} /> */}
        </Route>
      </Route >

    </Routes>
  )
}

export default App
