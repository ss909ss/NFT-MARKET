
import s from './Favorite.module.scss'
import nft from "../../assets/nft-image.png"
import candlesticks from '../../assets/candlesticks.png'
import { useAuth } from '../../context/authContenxt'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { INft } from '../../types/NFT'
import { useFavorites } from '../../context/favorites'
import { Link } from 'react-router'



const Favorites = () => {
    const { token } = useAuth();
    const { getFavorites } = useFavorites();
    const favorites = getFavorites();

    return (
        <section className={s.onSale}>
            {favorites.length === 0 ? (
                <p>No favorites added yet.</p>
            ) : (
                favorites.map((favorite) => (
                    <Link to={`/nft/${favorite._id}`} >
                        <div key={favorite._id} className={s.tabBlock}>
                            <img src={favorite.image} alt={favorite.name} className={s.nftImg} />
                            <div className={s.nftInfo}>
                                <div className={s.infoTop}>
                                    <p className={s.nftTitle}>{favorite.name}</p> {/* Исправлено */}
                                    <p className={s.nftPrice}>{favorite.price} ETH</p> {/* Исправлено */}
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
            )}

        </section>
    );
};

export default Favorites;