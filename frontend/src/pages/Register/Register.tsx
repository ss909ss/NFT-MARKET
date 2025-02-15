import s from './Auth.module.scss'
import { useDispatch } from 'react-redux'
// import { setAuth, setUser } from '../../store/authSlice/authSlice'
import { SubmitHandler, useForm } from "react-hook-form"
import { IFormRegister } from '../../types/Form'
// import { usePostFormRegisterMutation } from '../../store/api/authApi'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useState } from 'react'

const Register = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm<IFormRegister>();
    const navigate = useNavigate();
    // const [postRegister] = usePostFormRegisterMutation();
    const [auth, setAuth] = useState(false);
    const [username, setUsername] = useState<null | string>(null);
    const [email, setEmail] = useState<null | string>(null);
    const [password, setPassword] = useState<string>("");
    const [token, setToken] = useState<null | string>(null);
    const [avatar, setAvatar] = useState<null | string>(null);
    const [auctionId, setAuctionId] = useState<null | string>(null);
    const [favorites, setFavorites] = useState<null | string>(null);
    const [newBidPrice, setNewBidPrice] = useState<null | string>(null);
    const [walletId, setWalletId] = useState<null | string>(null);

    const onSubmit: SubmitHandler<IFormRegister> = async (data) => {
        try {
            console.log("Sending data", data);

            const responseRegister = await axios.post('https://nft-market-as0q.onrender.com/auth/register', {
                username: data.username,
                email: data.email,
                password: data.password,
                id: data.id,
                wallet: {
                    walletId: ''
                }
            });

            console.log("Response from the server:", responseRegister);

            if (responseRegister) {
                const walletId = responseRegister.data?.wallet?.walletId;

                if (walletId) {
                    localStorage.setItem("walletId", walletId);
                    console.log("walletId saved:", walletId);
                } else {
                    console.warn("walletId is missing from the server response");
                }

                setAuth(true);
                setUsername(data.username);
                setEmail(data.email);
                setPassword(data.password);
                setToken(responseRegister.data.token || null);
                setAvatar(responseRegister.data.avatar || null);
                setAuctionId(responseRegister.data.auctionId || null);
                setFavorites(responseRegister.data.favorites || null);
                setNewBidPrice(responseRegister.data.newBidPrice || null);
                setWalletId(walletId);

                console.log("User registered:", responseRegister);
            } else {
                console.error("Registration error: empty response from the server");
            }

            reset();
        } catch (error) {
            console.error("Error when submitting a form:", error);
        }
    };

    const handleNavigate = () => {
        navigate("/login")
    }

    return (
        <section className={s.auth}>
            <div className={s.container}>
                <div className={s.authContent}>
                    <div className={s.authForm}>
                        <h2 className={s.authTitle}>
                            Register
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                            <input
                                type="text"
                                className={s.authInput}
                                placeholder="Username"
                                {...register("username", { required: true })}
                                autoComplete="off"
                            />
                            <input
                                type="email"
                                className={s.authInput}
                                placeholder="Email"
                                {...register("email", { required: true })}
                                autoComplete="new-email"
                            />
                            <input
                                type="password"
                                className={s.authInput}
                                placeholder="Password"
                                {...register("password", { required: true })}
                                autoComplete="new-password"
                            />
                            <div className={s.authBtns}>
                                <button type="submit" className={s.authSubLinkBtn} onClick={handleNavigate}>
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;
