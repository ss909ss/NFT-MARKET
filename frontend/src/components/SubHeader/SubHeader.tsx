import imageIcon from '../../assets/image.svg'
import pencilIcon from '../../assets/pencil.svg'
import { Link, useNavigate } from 'react-router-dom';
import s from './SubHeader.module.scss';
import { toast } from 'react-toastify';

const SubHeader = () => {
    const navigate = useNavigate();

    const logoutFunction = async () => {
        try {
            localStorage.clear();
            navigate('/')
            toast.success("Logged out of the account successfully")
        } catch (e) {
            console.error("Logout failed", e);
            toast.error("Logout request failed");
        }
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
                        onClick={logoutFunction}
                    >
                        logout
                    </button>
                </div>
            </div>
        </section>
    )
}

export default SubHeader
