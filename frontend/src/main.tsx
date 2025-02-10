import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.module.scss'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from "./store/store";
import { AuthProvider } from './context/authContenxt.tsx'; // Импортируйте AuthProvider
import { UserInfoProvider } from './context/UserInfo.tsx';
import { FavoritesProvider } from './context/favorites.tsx';



createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <AuthProvider>
                <UserInfoProvider>
                    <FavoritesProvider>
                        <App />
                    </FavoritesProvider>
                </UserInfoProvider>
            </AuthProvider>
        </Provider>
    </BrowserRouter>
)
