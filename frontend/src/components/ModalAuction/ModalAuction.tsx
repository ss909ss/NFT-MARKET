import s from './ModalAuction.module.scss'
import closeIcon from '../../assets/cancel.png'
import { useInfo } from '../../context/UserInfo';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/authContenxt';
import axios from 'axios';
import { useNft } from '../../context/nftContext';
import { useEffect } from 'react';


interface ModalAuction {
    isOpen: boolean;
    onClose: () => void;
    nft: string;
    startingPrice: number;
    endTime: string
}

const ModalAuction = ({ isOpen, onClose, nft, startingPrice, endTime }: ModalAuction) => {
    const { token } = useAuth();
    
    if (!isOpen) return null;

    const createAuction = async () => {
        if (!token) {
            alert("You have not token")
        }

        try {

            const response = await axios.post(`https://nft-market-as0q.onrender.com/auctions/`,{
                nft, startingPrice, endTime
            }, {

                headers: { Authorization: `Bearer ${token}` },
            })
        if (response.status === 201) {
            alert("Auction was successfully created")
            onClose();
        } 
    } catch (e) {
        console.log(e)
    }
}


return (
    <section className={s.modal}>
        <div className={s.modalContent}>

            <h1 className={s.createTitle}>Create Auction?</h1>

            <div className={s.modalButtons}>
                
                <button className={s.modalAdd} onClick={createAuction} >Create Auction</button>
                <button className={s.modalCancel} onClick={onClose}>Cancel</button>
            </div>
        </div>

    </section >
)
}

export default ModalAuction
