import s from './Auth.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth, setAuth, setUser } from '../../store/authSlice/authSlice'
import { SubmitHandler, useForm } from "react-hook-form"
import { FormData } from '../../types/Form'
import { usePostFormLoginMutation, usePostFormRegisterMutation } from '../../store/api/authApi'
import { useNavigate } from 'react-router'

const Auth = () => {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth)
    const { register, handleSubmit, reset } = useForm<FormData>();
    const navigate = useNavigate();
    const [postLogin, { isLoading: isLoggingIn }] = usePostFormLoginMutation();
    const [postRegister, { isLoading: isRegistering }] = usePostFormRegisterMutation();

    const toggleAuthLink = () => {
        dispatch(setAuth(!auth));
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            if (auth) {
                const responseLogin = await postLogin({ email: data.email, password: data.password }).unwrap();
                if (responseLogin.token) {
                    localStorage.setItem("token", responseLogin.token);
                    console.log("Токен сохранён в локал сторедж:", responseLogin.token);
                }
                dispatch(setAuth(true));
                navigate('/profile');
            } 
            else {
                const responseRegister = await postRegister({
                    username: data.username, email: data.email, password: data.password
                }).unwrap();

                console.log("Ответ от регистрации:", responseRegister);

                // if (responseRegister) {
                //     console.log("Пользователь зарегестрировался",)
                // } else {
                //     console.error("Пользователь не зарегестрировался");
                // }
                if (responseRegister) {
                    console.log("Пользователь зарегистрирован:", responseRegister);
                    dispatch(setAuth(true));
                    dispatch(setUser({ username: data.username, email: data.email }));
                    navigate("/uploadItem");
                } else {
                    console.error("Ошибка регистрации");
                }

                dispatch(setAuth(true));
                navigate('/uploadItem');
            }

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
                            {auth ? "Login" : "Register"}
                        </h2>



                        <form onSubmit={handleSubmit(onSubmit)}>
                            {!auth && (
                                <input
                                    type="text"
                                    className={s.authInput}
                                    placeholder="Username"
                                    {...register("username", { required: true })}
                                />
                            )}
                            <input
                                type="email"
                                className={s.authInput}
                                placeholder="Email"
                                {...register("email", { required: true })}
                            />
                            <input
                                type="password"
                                className={s.authInput}
                                placeholder="Password"
                                {...register("password", { required: true })}
                            />

                            <div className={s.authBtns}>
                                {/* Кнопка для отправки формы */}
                                <button type="submit" className={s.authSubLinkBtn}>
                                    {auth ? "Войти" : "Зарегистрироваться"}
                                </button>
                                {/* Кнопка для переключения между формами */}
                                <button
                                    type="button" // не отправляет форму
                                    className={s.authSubLinkBtnRegister}
                                    onClick={toggleAuthLink} // переключение состояния auth
                                >
                                    {auth ? "Зарегистрироваться" : "Войти"}
                                </button>
                            </div>
                        </form>




                    </div>
                </div>
            </div>
        </section>
    )
}

export default Auth
