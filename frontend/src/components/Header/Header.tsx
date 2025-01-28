import styles from "./Header.module.scss"
import headerLogo from "../../assets/logo.png"
import seachIcon from "../../assets/search.svg"
import notificationicon from "../../assets/notification.svg"
import dropdown from "../../assets/dropdown.svg"
import { Link } from 'react-router'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.header__content}>
                    <div className={styles.header__left}>
                        <Link to={'/'}>
                            <img src={headerLogo} alt="Logo" className={styles.header__logo} />
                        </Link>
                        <span className={styles.header__border}></span>
                        <nav className={styles.header__menu}>
                            <ul className={styles.header__list}>
                                <li><Link to={"/discover"}>Discover</Link></li>
                                <li><Link to={"/frequently"}>How it work</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className={styles.header__right}>
                        <div className={styles.search__form}>
                            <input type="text" placeholder="Search" className={styles.search__input} />
                            <img src={seachIcon} alt="Icon" className={styles.search__icon} />
                        </div>
                        <div className={styles.right__notification}>
                            <img src={notificationicon} alt="Icon" className={styles.notification__icon} />
                            <span className={styles.notification__counter}>0</span>
                        </div>
                        <div className={styles.header__buttons}>
                            <button className={styles.button__upload}>Upload</button>
                            <button className={styles.button__wallet}>Connect Wallet</button>
                        </div>

                        <button className={styles.header__dropdown}>
                            <img src={dropdown} alt="Icon" />
                        </button>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header
