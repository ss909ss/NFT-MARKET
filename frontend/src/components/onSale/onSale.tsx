
import s from './onSale.module.scss'
import nft from "../../assets/nft-image.png"
import candlesticks from '../../assets/candlesticks.png'
import { useAuth } from '../../context/authContenxt'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { INft } from '../../types/NFT'
import { Link } from 'react-router'

interface INftsResponse {
    data: INft[];
}


const OnSale = () => {
    const { token } = useAuth();
    const [saleData, setSaleData] = useState<INft[] | null>([]);

    useEffect(() => {
        const fetchItemsSale = async () => {
            const currentUserId = localStorage.getItem("userId");
            console.log("Обновленный userId:", currentUserId);

            if (!token) {
                alert("No token, please login or register");
                return;
            }

            try {
                const response = await axios.get<INftsResponse>("https://nft-market-as0q.onrender.com/nfts", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const createdNfts = response.data?.data.filter(nft => nft.creator === currentUserId);
                console.log("NFT, принадлежащие пользователю:", createdNfts);

                setSaleData(createdNfts);
            } catch (e) {
                console.error("Ошибка загрузки NFT:", e);
            }
        };

        fetchItemsSale();
    }, [token, localStorage.getItem("userId")]); // Добавляем userId в зависимости

    return (
        <section className={s.onSale}>
            {saleData && saleData.length > 0 ? (
                saleData.map((nft) => (
                    <Link to={`/nft/${nft._id}`} >
                        <div key={nft._id} className={s.tabBlock}>
                            <img src={nft.image} alt={nft.name} className={s.nftImg} />
                            <div className={s.nftInfo}>
                                <div className={s.infoTop}>
                                    <p className={s.nftTitle}>{nft.name}</p> {/* Исправлено */}
                                    <p className={s.nftPrice}>{nft.price} ETH</p> {/* Исправлено */}
                                </div>
                                <span className={s.nftInfoLine}></span>

                                <div className={s.infoBottom}>
                                    <img src={candlesticks} alt="candlesticks-image" />
                                    <p className={s.bottomTitle}>
                                        Highest bid <span className={s.bottomPRoce}>0.001 ETH</span>
                                    </p>
                                    <p className={s.bottomNewBild}>New bid 🔥</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <p>No items on sale</p>
            )}

        </section>
    );
};

export default OnSale;