import s from './Profile.module.scss';
import coins from '../../assets/coins.svg';
import globeIcon from '../../assets/globe.svg';
import facebookIcon from '../../assets/facebook.svg';
import twitterIcon from '../../assets/twitter.svg';
import instagramIcon from '../../assets/Instagram.svg';
import userIcon from '../../assets/avatar.png';
import { Link } from 'react-router-dom';

// import { useGetProfileQuery } from '../../store/api/profileApi';
import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectProfile } from '../../store/authSlice/profileSlice';
import axios from 'axios';
import { IProfile } from '../../types/profileType';
import { useAuth } from '../../context/authContenxt';

const Profile = () => {
    const { token } = useAuth(); // Получаем токен из контекста
    const [profileData, setProfileData] = useState<IProfile | null>(null);
  
    useEffect(() => {
      const fetchProfile = async () => {
        if (!token) {
          console.error('No token found!');
          return;
        }
  
        try {
          const response = await axios.get<IProfile>(
            "https://nft-market-as0q.onrender.com/auth/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          console.log('Profile data:', response.data);  
          setProfileData(response.data.data);  
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data);
            console.error("Status code:", error.response?.status);
          } else {
            console.error("Unexpected error:", error);
          }
        }
      };
  
      fetchProfile();
    }, [token]);
     

    return (
        <section className={s.container}>
            <div className={s.profile}>
                <aside className={s.aside}>
                    <div className={s.profileBlock}>
                        <img src={profileData?.profileImage} alt="User" className={s.profileUserLogo} />

                        <div className={s.profileBlockInfo}>
                            <h2 className={s.profileName}>{profileData?.username || "User"}</h2>
                            <div className={s.profileQrcode}>
                                <p className={s.qrcode}>{profileData?.email  || "No email"}</p>
                                <img src={coins} alt="Coins" className={s.profileQrcodeImage} />
                            </div>
                            <p className={s.profileUserDescription}>Description here</p>
                            <div className={s.profileLink}>
                                <img src={globeIcon} alt="Website" className={s.socilalLinkImage} />
                                <Link to="https://ui8.net" className={s.socilalLink}>https://ui8.net</Link>
                            </div>
                        </div>

                        <button className={s.profileFollowButton}>Follow</button>

                        <div className={s.socilalLinks}>
                            <img src={twitterIcon} alt="Twitter" className={s.socialImage} />
                            <img src={instagramIcon} alt="Instagram" className={s.socialImage} />
                            <img src={facebookIcon} alt="Facebook" className={s.socialImage} />
                        </div>

                        <span className={s.profileLine}></span>
                        <p className={s.profileDate}>Member since {profileData?.dateJoined || "Unknown"}</p>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default Profile;

