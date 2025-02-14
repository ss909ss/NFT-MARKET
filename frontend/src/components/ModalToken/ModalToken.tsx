import s from "./modalToken.module.scss"
import closeIcon from '../../assets/cancel.png'
import { useState } from "react";
import { useInfo } from "../../context/UserInfo";
import axios from "axios";
import { toast } from "react-toastify";

interface IModalBuy {
    isOpenBuyModal: boolean;
    onClose: () => void;
}

const ModalToken = ({ isOpenBuyModal, onClose }: IModalBuy) => {
    const [amount, setAmount] = useState<number | "">("");
    const [receiverWalletId, setWalletId] = useState("")
    const { balance, token } = useInfo();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "amount") {
            setAmount(parseFloat(e.target.value) || 0);
        } else if (name === "receiverWalletId") {
            setWalletId(value);
        }
    };

    const handleAddTransaction = async () => {
        if (Number(amount) > balance) {
            toast.error("The transfer cannot be more than the balance on hand");
            return;
        } else if (!token) {
            toast.error("You don't have the token")
        }

        try {
            const response = await axios.post(
                "https://nft-market-as0q.onrender.com/wallets/transfer",
                { amount, receiverWalletId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                toast.success("Successful");
            }
        } catch (e) {
            console.error(e);
            toast.error("An error occurred during the transaction.");
        }
    };

    if (!isOpenBuyModal) return null;
    return (
        <section className={s.modalWrapper}>
            <div className={s.modalWrapper__top}>
                <h1 className={s.modalWrapper__top__title}>Transfer token</h1>
                <img src={closeIcon} alt="" className={s.closeIcon} onClick={onClose} />
            </div>
            <div className={s.modalWrapper__purshasing}>
                You can transfer tokens from your address to another
            </div>
            <form className={s.modalWrapper__form}>
                <label htmlFor="modalWrapper__input">Receiver address</label>
                <input
                    type="text"
                    id="receiverWalletId"
                    name="receiverWalletId"
                    value={receiverWalletId}
                    onChange={handleChange}
                    className={s.modalWrapper__input}
                    placeholder="Paste Address"
                />
                <label htmlFor="modalWrapper__input">Amount</label>
                <input
                    type="number"
                    id="amountInput"
                    name="amount"
                    value={amount}
                    onChange={handleChange}
                    className={s.modalWrapper__input}
                    placeholder="Amount"
                />
            </form>
            <div className={s.modalWrapper__buttons}>
                <button className={s.modalWrapper__buttons__countine} onClick={handleAddTransaction}>
                    Continue
                </button>
                <button className={s.modalWrapper__buttons__cancel}>
                    Cancel
                </button>
            </div>
        </section>
    )
}

export default ModalToken;