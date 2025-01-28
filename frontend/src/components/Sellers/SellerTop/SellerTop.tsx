import React from 'react'
import s from './SellerTop.module.scss'
import arrowDown from '../../../assets/arrow-down.png';


const SellerTop = () => {
    return (
        <section className={s.sellerСontainer}>
            <div className={s.container}>
                <div className={s.sellerTop}>
                    <div className={s.sellerLeft}>
                        <div className={s.sellerLeftBlock}>
                            <span className={s.popular}>
                                Popular
                            </span>
                            <p className={s.sellers}>Sellers</p>
                        </div>
                        <img src={arrowDown} alt="" className={s.arrowDown} />
                    </div>
                    <div className={s.sellerRight}>
                        <div className={s.rightBlock}>
                            <span className={s.timeFrame}>
                            TIMEFRAME
                            </span>
                            <select name="" id="" className={s.rightBlockSelect}>
                                <option value="" className={s.optionSelect}>
                                Today
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 

export default SellerTop
