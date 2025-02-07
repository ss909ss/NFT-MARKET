import s from "./Wallet.module.scss";
import ethereum from "../../assets/ethereum.svg"
import user from "../../assets/user.svg";
import gallery from "../../assets/gallery.svg";
import lightBulb from "../../assets/lightBulb.svg";
import disconnect from "../../assets/disconnect.svg";
import coinsIcon from "../../assets/coinsIcon.svg";

const Wallet = () => {
    return (
        <section className={s.myWallet}>
            <h2>Enrico Cole</h2>
            <div className={s.myWallet__link}>
                0xc4c16ab5ac7d...b21a
                <img src={coinsIcon} alt="" />
            </div>
            <div className={s.myWallet__balance}>
                <div className={s.myWallet__balance_flex}>
                    <img src={ethereum} alt="" />
                    <div>
                        <div className={s.myWallet__balance__title}>
                            Balance
                        </div>
                        <div className={s.myWallet__balance__value}>
                            4.689 ETH
                        </div>
                    </div>
                </div>

                <button className={s.myWallet__balance__manageFun}>
                    Manage fun on Coinbase
                </button>
            </div>

            <div className={s.myWallet__navs}>
                <button className={s.myWallet__navs__nav}>
                    <img src={user} alt="" />
                    My profile
                </button>
                <button className={s.myWallet__navs__nav}>
                    <img src={gallery} alt="" />
                    My items
                </button>
                <button className={s.myWallet__navs__nav}>
                    <img src={lightBulb} alt="" />
                    Dark theme
                </button>
                <button className={s.myWallet__navs__nav}>
                    <img src={disconnect} alt="" />
                    Disconnect
                </button>
            </div>
        </section>
    )
}

export default Wallet;