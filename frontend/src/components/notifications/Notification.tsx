import s from './Notification.module.scss';
import nft from '../../assets/singleImage.png'
import { useInfo } from '../../context/UserInfo';
import axios from 'axios';
import { useEffect, useState } from 'react';


interface NotificationData {
    id: string;
    image?: string; // optional image URL
    message: string;
    date: string;
}


const Notification = () => {
    const { token } = useInfo();
    const [data, setData] = useState<NotificationData[]>([])

    const getNotifications = async () => {
        if (!token) {
            alert("You do not have a token");
            return;
        }
        try {
            const response = await axios.get(
                "https://nft-market-as0q.onrender.com/auth/messages",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data); // Logs the object with _id, nftLikes, walletTransfers, auctionBids

            // Destructure the arrays from the response
            const { walletTransfers } = response.data;

            if (Array.isArray(walletTransfers) && walletTransfers.length > 0) {
                // Map walletTransfers to your NotificationData shape
                const notifications = walletTransfers.map((transfer: any) => ({
                    id: transfer._id,
                    // You can add an image if available or use the fallback
                    image: nft,
                    message: `Transferred ${transfer.amount} tokens`,
                    // Format the timestamp as desired
                    date: new Date(transfer.timestamp).toLocaleString(),
                }));
                setData(notifications);
            } else {
                setData([]); // No walletTransfers, so nothing to display
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };


    // Fetch notifications when component mounts or when token changes
    useEffect(() => {
        getNotifications();
    }, []);

    return (
        <section className={s.notification}>
            <div className={s.notificationBlock}>
                <div className={s.notificationTop}>
                    <h2 className={s.notificationTitle}>Notification</h2>
                    <button type='button' className={s.notificationButton}>See all</button>
                </div>
                {data.length === 0 ? (
                    <p>No notifications available.</p>
                ) : (
                    data.map((notification) => (
                        <div key={notification.id} className={s.notificationContent}>
                            {/* <img
                                src={notification.image || nft}
                                alt="Notification"
                                className={s.notificationImage}
                            /> */}
                            <div className={s.notificationBlockInfo}>
                                <p className={s.notificationContTitle}>
                                    {notification.message}
                                </p>
                                <p className={s.notificationDate}>{notification.date}</p>
                            </div>
                        </div>
                    ))
                )}

            </div>
        </section>
    )
}

export default Notification
