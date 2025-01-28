import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import styles from "./layout.module.scss"
import {  Outlet } from "react-router"


const Layout = () => {
    return (
        <div className={styles.layout__wrapper}>
          <Header/>
            <main>
                <Outlet />
            </main>
            <Footer/>
        </div>
    )
}

export default Layout
