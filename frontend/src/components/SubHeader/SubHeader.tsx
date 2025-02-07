import imageIcon from '../../assets/image.svg'
import pencilIcon from '../../assets/pencil.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, selectUser } from '../../store/authSlice/authSlice';
import s from './SubHeader.module.scss';


const SubHeader = () => {
const navigate = useNavigate();
    const dispatch = useDispatch(); // Получаем dispatch
    const logoutFunction = () => {
        dispatch(logout());
        navigate('/')
        alert("Вышел с аккаунта успешно")
    }


 

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
                    <button
                        type='button'
                        className={s.subHeaderButton}
                        onClick={logoutFunction} // Диспатчим logout
                    >
                        logout
                    </button>

                </div>
            </div>
        </section>
    )
}

export default SubHeader
