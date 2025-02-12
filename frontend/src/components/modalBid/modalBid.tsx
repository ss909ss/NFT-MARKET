import React from 'react'
import s from './modalBid.module.scss'
import closeIcon from '../../assets/cancel.png'
import { useInfo } from '../../context/UserInfo';
import { useNavigate } from 'react-router';


interface ModalBidProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalBid = ({ isOpen, onClose }: ModalBidProps) => {
    const navigate =useNavigate();
    const {balance} = useInfo();

    if (!isOpen) return null


  
    return (
        <section className={s.modal}>
            <div className={s.modalContent}>
                <div className={s.modalTop}>
                    <h1 className={s.bidTitle}>Place a bid</h1>
                    <img src={closeIcon} alt="" onClick={onClose} />
                </div>
                <p className={s.bidSubtitle}>You are about to place a bit for C O I N Z from UI8</p>
                <h2 className={s.titleBid}>Your bid</h2>

             
                <div className={s.bidInfo}>

                    <div className={s.bidCategory}>
                            <input type="number"  className={s.bidLeft}/>
                        <p className={s.bidRight}>ETH</p>
                    </div>
                    <span className={s.bidLine}></span>
                    <div className={s.bidBalance}>
                        <p className={s.bidLeft}>Your balance</p>
                        <p className={s.bidRight}>{balance} BTC</p>
                    </div>

                    <div className={s.bidService}>
                        <p className={s.bidLeft}>Service fee</p>
                        <p className={s.bidRight}>0 ETH</p>
                    </div>

                    <div className={s.bidService}>
                        <p className={s.bidLeft}>Total bid amount</p>
                        <p className={s.bidRight}>0 ETH</p>
                    </div>
                </div>

                <div className={s.bidButtons}>
                    <button className={s.bidAdd} >Place a bid</button>
                    <button className={s.bidCancel} onClick={onClose}>Cancel</button>
                </div>

            </div>
        </section >
    )
}

export default ModalBid
