import { useEffect, useState } from 'react'
import styles from './CreatorSingle.module.scss';
// import userAvatar from '../../../assets/avatar.png';
import cryptoImage from '../../../assets/crypto.png'
// import arrowLeft from '../../../assets/Left arrow.png';
// import arrowRight from '../../../assets/Right arrow.svg';
// import singleImage from '../../../assets/singleImage.png'
import { Link } from "react-router";
// import { ETH_PRICE_API } from "../../../store/api/cryptoApi";
import { INft } from '../../../types/NFT';
// import { useAuth } from '../../../context/authContenxt';
import axios from 'axios';
import { useInfo } from '../../../context/UserInfo';


interface INftsResponse {
    data: INft[];
}


const CreatorSingle = () => {
    const { avatar } = useInfo();
    const [singleData, setSingleData] = useState<INft[]>([]);


    // const [ethPrice, setEthPrice] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [auctionEndTime, setAuctionEndTime] = useState<Date | null>(null);
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const fetchSingleData = async () => {
            try {
                const response = await axios.get<INftsResponse>("https://nft-market-as0q.onrender.com/nfts");
                if (response.data.data.length > 0) {
                    // setSingleData(response.data.data[0]); 
                    setSingleData(response.data.data || []);


                    setAuctionEndTime(new Date(response.data.data[currentIndex].auctionEndTime)); // Установить сразу!
                } 
            } catch (e) {
                console.error("Ошибка загрузки NFT", e);
            }
        };
    
        fetchSingleData();
    }, [currentIndex]); // Загружаем данные один раз
    


    useEffect(() => {
        if (!auctionEndTime) return; // Если auctionEndTime ещё не задано, ничего не делать

        const interval = setInterval(() => {
            if (auctionEndTime) {
                const now = new Date();
                const diff = auctionEndTime.getTime() - now.getTime();

                if (diff <= 0) {
                    setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                    clearInterval(interval); // Останавливаем таймер
                } else {
                    setTimeLeft({
                        hours: Math.floor(diff / (1000 * 60 * 60)),
                        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                        seconds: Math.floor((diff % (1000 * 60)) / 1000),
                    });
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval); // Очищаем интервал при размонтировании компонента или изменении auctionEndTime
        };
    }, [auctionEndTime]);
    // const calculateValue = (ethAmount: number) => {
    //     return ethPrice !== null ? (ethAmount * ethPrice).toFixed(2) : "-";
    // };


    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % singleData.length);
    };

    // Переключение на предыдущий NFT
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + singleData.length) % singleData.length);
    };

    const currentNft = singleData[currentIndex];


    return (
        <section className={styles.creator__container}>
            <div className={styles.container}>
                        <div key={currentNft._id} className={styles.creator__single}>
                            <div className={styles.creator__left}>
                                <img src={currentNft.image} alt="NFT" className={styles.creatorLeftImage} />
                            </div>

                            <div className={styles.creator__right}>
                                <div className={styles.right__block}>
                                    <div className={styles.rightBlockTop}>
                                        <h2 className={styles.rightTitle}>{currentNft.name}</h2>
                                        <div className={styles.rightTopBottom}>
                                            <div className={styles.rightBlockBotomLeft}>
                                                <img src={avatar} alt="Avatar" className={styles.userAvatar} />
                                                <div className={styles.rightBlockUserInfo}>
                                                    <p className={styles.rightBlockUserTitle}>Creator</p>
                                                    <h3 className={styles.rightBlockUser}>{currentNft.creator}</h3>
                                                </div>
                                            </div>
                                            <div className={styles.rightBlockBotomRight}>
                                                <img src={cryptoImage} alt="Crypto" className={styles.cryptoImage} />
                                                <div className={styles.rightBlockPriceInfo}>
                                                    <p className={styles.rightBlockPriceTitle}>Instant price</p>
                                                    <h3 className={styles.rightBlockPrice}>{currentNft.price} BTC</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.rightBlockInfo}>
                                        <div className={styles.rightBlockInfoTop}>
                                            <span className={styles.rightBlockInfoBid}>Current Bid</span>
                                            <h2 className={styles.rightBlockInfoEtn}>{currentNft.price} BTC</h2>
                                            {/* <p className={styles.rightBlockInfoPrice}>${calculateValue(1.0)}</p> */}
                                        </div>
                                        <div className={styles.rightBlockInfoBottom}>
                                            <p className={styles.rightBlockInfoAuction}>Auction ending in</p>
                                            <div className={styles.rightBlockInfoBottomHours}>
                                                <div className={styles.rightBlockInfoHour}>
                                                    <h3 className={styles.rightBlockInfoNumber}>{timeLeft.hours}</h3>
                                                    <p className={styles.rightBlockInfoHrs}>Hrs</p>
                                                </div>
                                                <div className={styles.rightBlockInfoHour}>
                                                    <h3 className={styles.rightBlockInfoNumber}>{timeLeft.minutes}</h3>
                                                    <p className={styles.rightBlockInfoHrs}>mins</p>
                                                </div>
                                                <div className={styles.rightBlockInfoHour}>
                                                    <h3 className={styles.rightBlockInfoNumber}>{timeLeft.seconds}</h3>
                                                    <p className={styles.rightBlockInfoHrs}>secs</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.rightBlockBottom}>
                                        <button className={styles.rightBlockBottomButon} type="button">
                                            Place a bid
                                        </button>
                                        <Link to="/oneItem" className={styles.rightBlockBottomButonDefault}>
                                            View item
                                        </Link>
                                    </div>

                                    <div className={styles.rightBlockBottomPagination}>
                                        <button onClick={handlePrev} className={styles.leftBlockBottomButon}>
                                            <img src={"/path-to-left-arrow.jpg"} alt="Left" className={styles.arrowLeft} />
                                        </button>
                                        <button onClick={handleNext} className={styles.rightBlockBottomeButon}>
                                            <img src={"/path-to-right-arrow.jpg"} alt="Right" className={styles.arrowRight} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
               
            </div>
        </section>
    )
}

export default CreatorSingle
