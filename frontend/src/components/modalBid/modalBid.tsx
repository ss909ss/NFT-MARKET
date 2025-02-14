import React, { useEffect, useState } from 'react'
import s from './modalBid.module.scss'
import closeIcon from '../../assets/cancel.png'
import { useInfo } from '../../context/UserInfo';
import axios from 'axios';


interface ModalBidProps {
    isOpenBidAuction: boolean;
    onClose: () => void;
    startingPrice: number;
}

const ModalBid = ({ isOpenBidAuction, onClose, startingPrice }: ModalBidProps) => {
    const [bidAmount, setBidAmount] = useState<number | "">("");
    const { token, balance } = useInfo();
    const [bidder, setBidder] = useState<string | null>(null);

    console.log(bidder)
    useEffect(() => {
        if (bidder) {
            localStorage.setItem("bidder", bidder);
        }
    }, [bidder]);

   
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBidAmount(parseFloat(e.target.value) || 0);
    };


    if (!isOpenBidAuction) return null


    const handleAdddAuction = async () => {
        if (!token) {
            alert("You have not token")
        }
        else if (startingPrice > Number(bidAmount)) {
            alert("Ставка не может быть меньше рыночной цены")
        }
        const auctionId = localStorage.getItem("auctionId");
        try {
            const response = await axios.post(`https://nft-market-as0q.onrender.com/auctions/${auctionId}/bid`,
                { bidAmount: bidAmount },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
            console.log(response.data)
            setBidder(response.data?.bids?.at(-1)?.bidder);
            if (response.status === 200) {
                alert("Bid placed successfully:");
                onClose();
                const bidPrice = localStorage.setItem("newBidPrice", response.data?.currentBid)
                console.log(bidPrice)
            }

        } catch (e) {
            console.error("Error placing bid:", e);
        }
    }

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
                        <input
                            type="number"
                            className={s.bidLeft}
                            name="bidAmount"
                            value={bidAmount}
                            onChange={handleInputChange}
                        />
                        <p className={s.bidRight}>ETH</p>
                    </div>
                    <span className={s.bidLine}></span>
                    <div className={s.bidBalance}>
                        <p className={s.bidLeft}>Your balance</p>
                        <p className={s.bidRight}>{balance} BTC</p>
                    </div>
                    <div className={s.bidService}>
                        <p className={s.bidLeft}>Service fee</p>
                        <p className={s.bidRight}>0 BTC</p>
                    </div>
                    <div className={s.bidService}>
                        <p className={s.bidLeft}>Total bid amount</p>
                        <p className={s.bidRight}>0 BTC</p>
                    </div>
                </div>
                <div className={s.bidButtons}>
                    <button className={s.bidAdd} onClick={handleAdddAuction}>Place a bid</button>
                    <button className={s.bidCancel} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </section >
    )
}

export default ModalBid
