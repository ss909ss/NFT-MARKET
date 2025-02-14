import { Route, Routes } from 'react-router'
import routes from './routes/Routes'
import Layout from './Layout/Layout'
import ProfilePage from './pages/Profile/Profile'
import OnSale from './components/onSale/onSale'
import Favorites from './components/Favorites/Favorites'
import { ToastContainer, } from 'react-toastify';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<Layout />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="/profile/*" element={<ProfilePage />}>
            <Route path="created" element={<OnSale />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
