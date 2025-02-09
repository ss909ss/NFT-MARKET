import s from './Auth.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth, setAuth, setLoginUser, setToken, setUser } from '../../store/authSlice/authSlice'
import { SubmitHandler, useForm } from "react-hook-form"
import { FormData } from '../../types/Form'
import { usePostFormLoginMutation, usePostFormRegisterMutation } from '../../store/api/authApi'
import { useNavigate } from 'react-router'
import { useState } from 'react'

const Login = () => {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth)
    const { register, handleSubmit, reset } = useForm<FormData>();
    const navigate = useNavigate();
    const [postLogin, { isLoading: isLoggingIn }] = usePostFormLoginMutation();
    const [postRegister, { isLoading: isRegistering }] = usePostFormRegisterMutation();
    const [isLoginForm, setIsLoginForm] = useState(false);




    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
         
                const responseLogin = await postLogin({ email: data.email, password: data.password }).unwrap();
                if (responseLogin.token) {
                    localStorage.setItem("token", responseLogin.token);
                    dispatch(setToken(responseLogin.token));
                    console.log("Токен сохранён в localStorage:", responseLogin.token);
                  }
                  

                dispatch(setAuth(true));

               
                navigate('/profile');
            
            reset();
        } catch (error) {
            console.error("Ошибка при отправке формы:", error);
        }
    };


    return (
        <section className={s.auth}>
            <div className={s.container}>
                <div className={s.authContent}>
                    <div className={s.authForm}>
                        <h2 className={s.authTitle}>
                            Login
                        </h2>



                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                           
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
                                <button type="submit" className={s.authSubLinkBtn}>
                                    Войти
                                </button>
                             
                            </div>
                        </form>



                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
