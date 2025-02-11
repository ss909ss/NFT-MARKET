import s from "./modalToken.module.scss"
import closeIcon from '../../assets/cancel.png'

const ModalToken = () => {
    return (
        <section className={s.modalWrapper}>
            <div className={s.modalWrapper__top}>
                <h1 className={s.modalWrapper__top__title}>Transfer token</h1>
                <img src={closeIcon} alt="" className={s.closeIcon} />
            </div>

            <div className={s.modalWrapper__purshasing}>
                You can transfer tokens from your address to another
            </div>

            <form className={s.modalWrapper__form}>
                <label htmlFor="modalWrapper__input">Receiver address</label>
                <input type="text" id="modalWrapper__input" className={s.modalWrapper__input} placeholder="Paste Address"/>
            </form>

            <div className={s.modalWrapper__buttons}>
                <button className={s.modalWrapper__buttons__countine}>
                    continue
                </button>

                <button className={s.modalWrapper__buttons__cancel}>
                    Cancel
                </button>
            </div>
        </section>
    )
}

export default ModalToken;