import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import './index.module.scss'
import App from './App.tsx'
import {Provider} from 'react-redux';
import store from "./store/store";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
)
