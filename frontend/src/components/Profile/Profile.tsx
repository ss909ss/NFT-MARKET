import s from './Profile.module.scss';
import coins from '../../assets/coins.svg';
import globeIcon from '../../assets/globe.svg';
import facebookIcon from '../../assets/facebook.svg';
import twitterIcon from '../../assets/twitter.svg';
import instagramIcon from '../../assets/Instagram.svg';
import userIcon from '../../assets/avatar.png';
import { Link } from 'react-router-dom';

import { useGetProfileQuery } from '../../store/api/profileApi';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectProfile } from '../../store/authSlice/profileSlice';


const Profile = () => {
    const { data: dataProfile, error, isLoading } = useGetProfileQuery();

    console.log("Загружается?", isLoading);
    console.log("Ошибка?", error);
    console.log("Данные профиля:", dataProfile);



    // Если произошла ошибка при получении данных
    if (error) {
        return <p>Error occurred!</p>;
    }

    // Если данные не получены (на всякий случай)
    if (!dataProfile) {
        return <p>Нет данных</p>;
    }

    // Если данные успешно получены, отображаем UI

    useEffect(() => {
        console.log("dataProfile обновился:", dataProfile);
    }, [dataProfile]);

    return (
        <section className={s.container}>
            <div className={s.profile}>
                <aside className={s.aside}>
                    <div className={s.profileBlock}>
                        <img
                            src={dataProfile.profileImage || userIcon}
                            alt="User"
                            className={s.profileUserLogo}
                        />

                        <div className={s.profileBlockInfo}>
                            <h2 className={s.profileName}>
                                {dataProfile?.data?.username || "User"}
                            </h2>
                         

                            <div className={s.profileQrcode}>
                            <p className={s.qrcode}>
                                {dataProfile?.data?.email || "No email"}
                            </p>
                                <img src={coins} alt="Coins" className={s.profileQrcodeImage} />
                            </div>
                            <p className={s.profileUserDescription}>Description here</p>
                            <div className={s.profileLink}>
                                <img
                                    src={globeIcon}
                                    alt="Website"
                                    className={s.socilalLinkImage}
                                />
                                <Link to="https://ui8.net" className={s.socilalLink}>
                                    https://ui8.net
                                </Link>
                            </div>
                        </div>

                        <button className={s.profileFollowButton}>Follow</button>

                        <div className={s.socilalLinks}>
                            <img src={twitterIcon} alt="Twitter" className={s.socialImage} />
                            <img src={instagramIcon} alt="Instagram" className={s.socialImage} />
                            <img src={facebookIcon} alt="Facebook" className={s.socialImage} />
                        </div>

                        <span className={s.profileLine}></span>
                        <p className={s.profileDate}>
                            Member since {dataProfile.dateJoined || "Unknown"}
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default Profile;
