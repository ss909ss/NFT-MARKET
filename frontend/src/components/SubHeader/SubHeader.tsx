import { Link } from 'react-router';
// import banner from '../../assets/subHeader.jpg';
import imageIcon from '../../assets/image.svg'
import pencilIcon from '../../assets/pencil.svg' 
import s from './SubHeader.module.scss';

const SubHeader = () => {
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
                </div>
            </div>
        </section>
    )
}

export default SubHeader
