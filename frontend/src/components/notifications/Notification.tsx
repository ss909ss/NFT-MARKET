import s from './Notification.module.scss';
import nft from '../../assets/singleImage.png'


const Notification = () => {
  return (
    <section className={s.notification}>
      <div className={s.notificationBlock}>
        <div className={s.notificationTop}>
            <h2 className={s.notificationTitle}>Notification</h2>
            <button type='button' className={s.notificationButton}>See all</button>
        </div>
        <div className={s.notificationContent}>
            <img src={nft} alt="Image" className={s.notificationImage} />
            <div className={s.notificationBlockInfo}>
                <p className={s.notificationContTitle}>ETH received 0.08 ETH recived</p>
                <p className={s.notificationDate}>2 days ago</p>
            </div>
        </div>

        <div className={s.notificationContent}>
            <img src={nft} alt="Image" className={s.notificationImage} />
            <div className={s.notificationBlockInfo}>
                <p className={s.notificationContTitle}>ETH received 0.08 ETH recived</p>
                <p className={s.notificationDate}>2 days ago</p>
            </div>
        </div>

        <div className={s.notificationContent}>
            <img src={nft} alt="Image" className={s.notificationImage} />
            <div className={s.notificationBlockInfo}>
                <p className={s.notificationContTitle}>ETH received 0.08 ETH recived</p>
                <p className={s.notificationDate}>2 days ago</p>
            </div>
        </div>

        <div className={s.notificationContent}>
            <img src={nft} alt="Image" className={s.notificationImage} />
            <div className={s.notificationBlockInfo}>
                <p className={s.notificationContTitle}>ETH received 0.08 ETH recived</p>
                <p className={s.notificationDate}>2 days ago</p>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Notification
