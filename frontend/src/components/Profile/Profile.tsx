import s from './Profile.module.scss';
import coins from '../../assets/coins.svg';
import globeIcon from '../../assets/globe.svg';
import facebookIcon from '../../assets/facebook.svg';
import twitterIcon from '../../assets/twitter.svg';
import instagramIcon from '../../assets/Instagram.svg';
import userIcon from '../../assets/avatar.png';
import { Link } from 'react-router-dom';  
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../../store/authSlice/authSlice';
import { useGetProfileQuery } from '../../store/api/profileApi';

const Profile = () => {
    const dispatch = useDispatch();
    const {data } = useGetProfileQuery();

    return (
        <section className={s.container}>
            <div className={s.profile}>
                <aside className={s.aside}>
                    <div className={s.profileBlock}>
                        <img src={userIcon} alt="" className={s.profileUserLogo} />

                        <div className={s.profileBlockInfo}>
                            <h2 className={s.profileName}>{data?.email || "User"}</h2>
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
