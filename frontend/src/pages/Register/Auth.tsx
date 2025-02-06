import s from './Auth.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../store/authSlice/authSlice'
import { RootState } from '../../store/store'
import { useForm, SubmitHandler } from "react-hook-form"
import { FormData } from '../../types/Form'
import { usePostFormLoginMutation, usePostFormRegisterMutation } from '../../store/api/authApi'
import { useNavigate } from 'react-router'

const Auth = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth.auth);
    const { register, handleSubmit, reset } = useForm<FormData>();
    const navigate = useNavigate();
    const [postLogin, { isLoading: isLoggingIn }] = usePostFormLoginMutation();
    const [postRegister, { isLoading: isRegistering }] = usePostFormRegisterMutation();

    const toggleAuthLink = () => {
        dispatch(setAuth(!auth));
    }

    const onSubmit = async (data: FormData) => {
        try {
            if (auth) {
                const responseLogin = await postLogin({ email: data.email, password: data.password }).unwrap();
                if (responseLogin.token) {
                    localStorage.setItem("token", responseLogin.token);
                    console.log("Токен сохранён:", responseLogin.token);
                }
                dispatch(setAuth(true));
                navigate('/profile');
            } else if (!auth) {
                navigate('/')
            }
            else {
                const responseRegister = await postRegister({
                    username: data.username, email: data.email, password: data.password
                }).unwrap();

                console.log("Ответ от регистрации:", responseRegister);

                if (responseRegister.token) {
                    localStorage.setItem("token", responseRegister.token);
                    console.log("Токен сохранён:", responseRegister.token);
                } else {
                    console.error("Токен не был возвращён после регистрации");
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
