import s from './Auth.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {   setAuth, setUser } from '../../store/authSlice/authSlice'
import { SubmitHandler, useForm } from "react-hook-form"
import { FormData, IFormRegister } from '../../types/Form'
import { usePostFormRegisterMutation } from '../../store/api/authApi'
import { useNavigate } from 'react-router'


const Register = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm<FormData>();
    const navigate = useNavigate();
    const [postRegister] = usePostFormRegisterMutation();
    
    const onSubmit: SubmitHandler<IFormRegister> = async (data) => {
        try {
            console.log("Отправка данных:", data);
    
            const responseRegister = await postRegister({
                username: data.username,
                email: data.email,
                password: data.password,
                id: data.id,
                wallet: {
                    walletId: ''
                }
            }).unwrap();
    
            console.log("Ответ от сервера:", responseRegister);
    
            if (responseRegister) {
                // const userId = responseRegister?.user?._id; // Достаём userId
                const walletId = responseRegister?.wallet?.walletId; // Достаём walletId
    
                // if (userId) {
                //     localStorage.setItem("userId", userId);
                //     console.log("userId сохранен:", userId);
                // } 
                // else {
                //     console.warn("userId отсутствует в ответе сервера");
                // }
    
                if (walletId) {
                    localStorage.setItem("walletId", walletId);
                    console.log("walletId сохранен:", walletId);
                } else {
                    console.warn("walletId отсутствует в ответе сервера");
                }
    
                dispatch(setAuth(true));
                dispatch(setUser({ 
                    username: data.username, 
                    email: data.email, 
                    password: data.password
                }));
    
                console.log("Пользователь зарегистрирован:", responseRegister);
            } else {
                console.error("Ошибка регистрации: пустой ответ от сервера");
            }
    
            reset();
        } catch (error) {
            console.error("Ошибка при отправке формы:", error);
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

export default Register
