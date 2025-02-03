import React, {useState} from "react";
import s from "./Discover.module.scss";
import search from "../../assets/search-white.svg";
import close from "../../assets/close.svg"
import nft from "../../assets/nft-image.png"
import avatar from "../../assets/avatar.png"
import line from "../../assets/line.svg"

const Discover = () => {
    const [price, setPrice] = useState(5); // Состояние для цены

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(event.target.value));
    };

    return (
        <section className={s.discover}>
            <div className={s.container}>
                <form className={s.yourKeywords}>
                    <button type="submit" className={s.yourKeywords__searchButton}>
                        <img src={search} alt="search icon"/>
                    </button>

                    <input
                        type="text"
                        className={s.yourKeywords__input}
                        placeholder="Type your keywords"
                    />
                </form>

                <div className={s.content}>
                    <div className={s.content__head}>
                        <ul className={s.content__head__navigation}>
                            <li>
                                <a href="#">All items</a>
                            </li>
                            <li>
                                <a href="#">Art</a>
                            </li>
                            <li>
                                <a href="#">Game</a>
                            </li>
                            <li>
                                <a href="#">Photography</a>
                            </li>
                            <li>
                                <a href="#">Music</a>
                            </li>
                            <li>
                                <a href="#">Video</a>
                            </li>
                        </ul>
                    </div>

                    <div className={s.discover__content}>
                        <div className={s.filter}>
                            <div className={s.filter__content}>
                                <div className={s.filter__price}>
                                    <div className={s.filter__price__title}>Price range</div>
                                    <div className={s.filter__range}>
                                        <input
                                            type="range"
                                            min="0.01"
                                            max="10"
                                            step="0.01"
                                            value={price}
                                            onChange={handlePriceChange}
                                        />
                                        <div className={s.filter__range__value}>{price} ETH</div>
                                    </div>
                                    <div className={s.filter__range__labels}>
                                        <span>0.01 ETH</span>
                                        <span>10 ETH</span>
                                    </div>
                                </div>

                                <div className={s.filter__likes}>
                                    likes
                                </div>

                                <div className={s.filter__colors}>
                                    open
                                </div>

                                <div className={s.filter__creator}>
                                    creator
                                </div>
                            </div>

                            <div className={s.filter__reset}>
                                <img src={close} alt=""/>
                                Reset filter
                            </div>
                        </div>

                        <div className={s.discover__cards}>
                            <div className={s.discover__card}>
                                <img src={nft} alt="" className={s.nftImage}/>
                                <div className={s.discover__card__infoWrapper}>
                                    <div>Amazing digital art</div>
                                    <div className={s.discover__card__price}>2.45 ETH</div>
                                </div>

                                <div className={s.discover__card__inStock}>
                                    <div className={s.discover__card__avatars}>
                                        <img src={avatar} alt=""/>
                                        <img src={avatar} alt=""/>
                                        <img src={avatar} alt=""/>
                                    </div>

                                    <div className={s.discover__card__amountInStock}>
                                        3 in stock
                                    </div>
                                </div>

                                <div className={s.discover__card__bid}>
                                    <img src={line} alt=""/>
                                    <div>Highest bid</div>
                                    <div className={s.price}>0.001 ETH</div>
                                    <div>New bid 🔥</div>
                                </div>
                            </div>
                            <div className={s.discover__card}>
                                <img src={nft} alt="" className={s.nftImage}/>
                                <div className={s.discover__card__infoWrapper}>
                                    <div>Amazing digital art</div>
                                    <div className={s.discover__card__price}>2.45 ETH</div>
                                </div>

                                <div className={s.discover__card__inStock}>
                                    <div className={s.discover__card__avatars}>
                                        <img src={avatar} alt=""/>
                                        <img src={avatar} alt=""/>
                                        <img src={avatar} alt=""/>
                                    </div>

                                    <div className={s.discover__card__amountInStock}>
                                        3 in stock
                                    </div>
                                </div>

                                <div className={s.discover__card__bid}>
                                    <img src={line} alt=""/>
                                    <div>Highest bid</div>
                                    <div className={s.price}>0.001 ETH</div>
                                    <div>New bid 🔥</div>
                                </div>
                            </div>
                            <div className={s.discover__card}>
                                <img src={nft} alt="" className={s.nftImage}/>
                                <div className={s.discover__card__infoWrapper}>
                                    <div>Amazing digital art</div>
                                    <div className={s.discover__card__price}>2.45 ETH</div>
                                </div>

                                <div className={s.discover__card__inStock}>
                                    <div className={s.discover__card__avatars}>
                                        <img src={avatar} alt=""/>
                                        <img src={avatar} alt=""/>
                                        <img src={avatar} alt=""/>
                                    </div>

                                    <div className={s.discover__card__amountInStock}>
                                        3 in stock
                                    </div>
                                </div>

                                <div className={s.discover__card__bid}>
                                    <img src={line} alt=""/>
                                    <div>Highest bid</div>
                                    <div className={s.price}>0.001 ETH</div>
                                    <div>New bid 🔥</div>
                                </div>
                            </div>
                            <div className={s.discover__card}>
                                <img src={nft} alt="" className={s.nftImage}/>
                                <div className={s.discover__card__infoWrapper}>
                                    <div>Amazing digital art</div>
                                    <div className={s.discover__card__price}>2.45 ETH</div>
                                </div>

                                <div className={s.discover__card__inStock}>
                                    <div className={s.discover__card__avatars}>
                                        <img src={avatar} alt=""/>
                                        <img src={avatar} alt=""/>
                                        <img src={avatar} alt=""/>
                                    </div>

                                    <div className={s.discover__card__amountInStock}>
                                        3 in stock
                                    </div>
                                </div>

                                <div className={s.discover__card__bid}>
                                    <img src={line} alt=""/>
                                    <div>Highest bid</div>
                                    <div className={s.price}>0.001 ETH</div>
                                    <div>New bid 🔥</div>
                                </div>
                            </div>
                            <div className={s.discover__card}>
                                <img src={nft} alt="" className={s.nftImage}/>
                                <div className={s.discover__card__infoWrapper}>
                                    <div>Amazing digital art</div>
                                    <div className={s.discover__card__price}>2.45 ETH</div>
                                </div>

                                <div className={s.discover__card__inStock}>
                                    <div className={s.discover__card__avatars}>
                                        <img src={avatar} alt=""/>
                                        <img src={avatar} alt=""/>
                                        <img src={avatar} alt=""/>
                                    </div>

                                    <div className={s.discover__card__amountInStock}>
                                        3 in stock
                                    </div>
                                </div>

                                <div className={s.discover__card__bid}>
                                    <img src={line} alt=""/>
                                    <div>Highest bid</div>
                                    <div className={s.price}>0.001 ETH</div>
                                    <div>New bid 🔥</div>
                                </div>
                            </div>
                            <div className={s.discover__card}>
                                <img src={nft} alt="" className={s.nftImage}/>
                                <div className={s.discover__card__infoWrapper}>
                                    <div>Amazing digital art</div>
                                    <div className={s.discover__card__price}>2.45 ETH</div>
                                </div>

                                <div className={s.discover__card__inStock}>
                                    <div className={s.discover__card__avatars}>
                                        <img src={avatar} alt=""/>
                                        <img src={avatar} alt=""/>
                                        <img src={avatar} alt=""/>
                                    </div>

                                    <div className={s.discover__card__amountInStock}>
                                        3 in stock
                                    </div>
                                </div>

                                <div className={s.discover__card__bid}>
                                    <img src={line} alt=""/>
                                    <div>Highest bid</div>
                                    <div className={s.price}>0.001 ETH</div>
                                    <div>New bid 🔥</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Discover;
