import React from 'react'
import styles from './CreatorSingle.module.scss';
import userAvatar from '../../../assets/avatar.png';
import cryptoImage from '../../../assets/crypto.png'
import arrowLeft from '../../../assets/Left arrow.png';
import arrowRight from '../../../assets/Right arrow.svg';
import singleImage from '../../../assets/singleImage.png'

const CreatorSingle = () => {
    return (
        <section className={styles.container}>
            <div className={styles.creator__single}>
                <div className={styles.creator__left}>
                    <img src={singleImage} alt="" className={styles.creatorLeftImage} />
                </div>
                <div className={styles.creator__right}>
                    <div className={styles.right__block}>
                        <div className={styles.rightBlockTop}>
                            <h2 className={styles.rightTitle}>the creator network®</h2>
                            <div className={styles.rightTopBottom}>
                                <div className={styles.rightBlockBotomLeft}>
                                    <img src={userAvatar} alt="" className={styles.userAvatar} />
                                    <div className={styles.rightBlockUserInfo}>
                                        <p className={styles.rightBlockUserTitle}>Creator</p>
                                        <h3 className={styles.rightBlockUser}>Enrico Cole</h3>
                                    </div>
                                </div>
                                <div className={styles.rightBlockBotomRight}>
                                    <img src={cryptoImage} alt="" className={styles.cryptoImage} />
                                    <div className={styles.rightBlockPriceInfo}>
                                        <p className={styles.rightBlockPriceTitle}>Instant price</p>
                                        <h3 className={styles.rightBlockPrice}>3.5 ETH</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.rightBlockInfo}>
                            <div className={styles.rightBlockInfoTop}>
                                <span className={styles.rightBlockInfoBid}>Current Bid</span>
                                <h2 className={styles.rightBlockInfoEtn}>1.00 ETH</h2>
                                <p className={styles.rightBlockInfoPrice}>$3,618.36</p>
                            </div>
                            <div className={styles.rightBlockInfoBottom}>
                                <p className={styles.rightBlockInfoAuction}>Auction ending in</p>
                                <div className={styles.rightBlockInfoBottomHours}>
                                    <div className={styles.rightBlockInfoHour}>
                                        <h3 className={styles.rightBlockInfoNumber}>19</h3>
                                        <p className={styles.rightBlockInfoHrs}>Hrs</p>
                                    </div>

                                    <div className={styles.rightBlockInfoHour}>
                                        <h3 className={styles.rightBlockInfoNumber}>24</h3>
                                        <p className={styles.rightBlockInfoHrs}>mins</p>
                                    </div>

                                    <div className={styles.rightBlockInfoHour}>
                                        <h3 className={styles.rightBlockInfoNumber}>19</h3>
                                        <p className={styles.rightBlockInfoHrs}>secs</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.rightBlockBottom}>
                            <button className={styles.rightBlockBottomButon} type='button'>Place a bid</button>
                            <button className={styles.rightBlockBottomButonDefault} type='button'>View item</button>
                        </div>

                        <div className={styles.rightBlockBottomPagination}>
                            <button className={styles.leftBlockBottomButon} type='button'>
                                <img src={arrowLeft} alt="" className={styles.arrowLeft} />
                            </button>
                            <button className={styles.rightBlockBottomeButon} type='button'>
                                <img src={arrowRight} alt="" className={styles.arrowRight} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreatorSingle
