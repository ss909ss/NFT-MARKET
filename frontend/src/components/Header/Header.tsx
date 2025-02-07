import s from "./Header.module.scss";
import headerLogo from "../../assets/logo.png";
import seachIcon from "../../assets/search.svg";
import notificationicon from "../../assets/notification.svg";
import dropdown from "../../assets/dropdown.svg";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import Notification from "../notifications/Notification";
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from "../../store/authSlice";
import { selectAuth } from "../../store/authSlice/authSlice";
import Wallet from "../Wallet/Wallet";

const Header = () => {
    const [open, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth)
    const [isProfileOnClick, setIsProfileOnClick] = useState(false)

    const handleClick = () => {
        setIsOpen(!open);
    };

    const handleClickUpload = () => {
        if (auth) {
            navigate('/uploadItem');
        } else {
            navigate('/auth');
        }
    };

    const handleActiveProfile = () => {
        setIsProfileOnClick(prevState => !prevState)
    }

    return (
        <>
            <header className={s.header}>
                <div className={s.container}>
                    <div className={s.header__content}>
                        <div className={s.header__left}>
                            <Link to={'/'}>
                                <img src={headerLogo} alt="Logo" className={s.header__logo} />
                            </Link>
                            <span className={s.header__border}></span>
                            <nav className={s.header__menu}>
                                <ul className={s.header__list}>
                                    <li><Link to={"/discover"}>Discover</Link></li>
                                    <li><Link to={"/frequently"}>How it works</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className={s.header__right}>
                            <div className={s.search__form}>
                                <input type="text" placeholder="Search" className={s.search__input} />
                                <img src={seachIcon} alt="Icon" className={s.search__icon} />
                            </div>
                            <button className={s.right__notification} type='button' onClick={handleClick}>
                                <img src={notificationicon} alt="Icon" className={s.notification__icon} />
                                <span className={s.notification__counter}>0</span>
                            </button>

                            <div className={s.header__buttons}>
                                <button className={s.button__upload} onClick={handleClickUpload}>
                                    Upload
                                </button>
                                <button className={s.button__wallet}>Connect Wallet</button>
                                <button
                                    onClick={handleActiveProfile}
                                    className={s.button__upload}>
                                    Profile
                                </button>
                                <div className={s.dropProfile}>
                                    {isProfileOnClick && <Wallet />}
                                </div>
                            </div>

                            <button className={s.header__dropdown}>
                                <img src={dropdown} alt="Icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            {open && <Notification />}
        </>
    );
};

export default Header;
