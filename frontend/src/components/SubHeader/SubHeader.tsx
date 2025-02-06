import imageIcon from '../../assets/image.svg'
import pencilIcon from '../../assets/pencil.svg' 
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice/authSlice';
import s from './SubHeader.module.scss';

const SubHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Видаляємо всі дані з localStorage та cookies
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        Cookies.remove('token');

        // Скидаємо статус авторизації в Redux
        dispatch(setAuth(false));

        // Перенаправляємо користувача на сторінку входу
        navigate('/login');
    };

    return (
        <section className={s.subHeader}>
           <div className={s.container}>
                <div className={s.subHeaderLinks}>
                    <Link to='/edit'>
                        <div className={s.subHeaderButton}>
                            Edit cover photo
                            <img src={imageIcon} alt="" className={s.subHeaderImage} />
                        </div>
                    </Link>

                    <Link to='/editProfile'>
                        <div className={s.subHeaderButton}>
                            Edit profile
                            <img src={pencilIcon} alt="" className={s.subHeaderImage} />
                        </div>
                    </Link>

                    <Link to='/logout'>
                        <div className={s.subHeaderButton} onClick={handleLogout}>
                            logout
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default SubHeader
