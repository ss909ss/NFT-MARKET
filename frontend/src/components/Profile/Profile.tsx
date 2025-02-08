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

const Profile = () => {
    const { data } = useGetProfileQuery();


    
    // const userName = localStorage.getItem("username");
    // const email = localStorage.getItem("email")
    useEffect(() => {

    }, [data])

    return (
        <section className={s.container}>
            <div className={s.profile}>
                <aside className={s.aside}>
                    <div className={s.profileBlock}>
                        <img src={data?.profileImage} alt="" className={s.profileUserLogo} />

                        <div className={s.profileBlockInfo}>
                            <h2 className={s.profileName}>{data?.username  ||  "User"}</h2>
                            <div className={s.profileQrcode}>
                                <p className={s.qrcode}>{data?.email || "No email"}</p>
                                <img src={coins} alt="" className={s.profileQrcodeImage} />
                            </div>
                            <p className={s.profileUserDescription}>Description here</p>
                            <div className={s.profileLink}>
                                <img src={globeIcon} alt="" className={s.socilalLinkImage} />
                                <Link to="https://ui8.net" className={s.socilalLink}>https://ui8.net</Link>
                            </div>

                        </div>
                        <button className={s.profileFollowButton}>Follow</button>

                        <div className={s.socilalLinks}>
                            <img src={twitterIcon} alt="" className={s.socialImage} />
                            <img src={instagramIcon} alt="" className={s.socialImage} />
                            <img src={facebookIcon} alt="" className={s.socialImage} />
                        </div>

                        <span className={s.profileLine}></span>

                        <p className={s.profileDate}>Member since Mar 15, 2021</p>
                    </div>
                </aside>
            </div>
        </section>
    );
}

export default Profile;
