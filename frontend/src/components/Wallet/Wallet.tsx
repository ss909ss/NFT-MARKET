import s from "./Wallet.module.scss";
import ethereum from "../../assets/ethereum.svg"
import user from "../../assets/user.svg";
import gallery from "../../assets/gallery.svg";
import lightBulb from "../../assets/lightBulb.svg";
import disconnect from "../../assets/disconnect.svg";
import coinsIcon from "../../assets/coinsIcon.svg";
import { useEffect, useState } from "react";
import { IProfile } from "../../types/profileType";
import { useAuth } from "../../context/authContenxt";
import axios from "axios";

const Wallet = () => {
    const { token } = useAuth();
    const [profileInfo, setProfileInfo] = useState<IProfile | null>(null);

    useEffect(() => {
        const fetchProfileInfo = async () => {
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
                setProfileInfo(response.data.data)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.response?.data);
                    console.error("Status code:", error.response?.status);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        };
        fetchProfileInfo();
    }, [token])

    return (
        <section className={s.myWallet}>
            <h2>{profileInfo?.username}</h2>
            <div className={s.myWallet__link}>
                0xc4c16ab5ac7d...b21a
                <img src={coinsIcon} alt="" />
            </div>
            <div className={s.myWallet__balance}>
                <div className={s.myWallet__balance_flex}>
                    <img src={ethereum} alt="" />
                    <div>
                        <div className={s.myWallet__balance__title}>
                            Balance
                        </div>
                        <div className={s.myWallet__balance__value}>
                            4.689 ETH
                        </div>
                    </div>
                </div>

                <button className={s.myWallet__balance__manageFun}>
                    Manage fun on Coinbase
                </button>
            </div>

            <div className={s.myWallet__navs}>
                <button className={s.myWallet__navs__nav}>
                    <img src={user} alt="" />
                    My profile
                </button>
                <button className={s.myWallet__navs__nav}>
                    <img src={gallery} alt="" />
                    My items
                </button>
                <button className={s.myWallet__navs__nav}>
                    <img src={lightBulb} alt="" />
                    Dark theme
                </button>
                <button className={s.myWallet__navs__nav}>
                    <img src={disconnect} alt="" />
                    Disconnect
                </button>
            </div>
        </section>
    )
}

export default Wallet;