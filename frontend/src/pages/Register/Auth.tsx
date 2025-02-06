import s from './Auth.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../store/authSlice/authSlice';
import { RootState } from '../../store/store';
import { useForm } from "react-hook-form";
import { FormData } from '../../types/Form';
import { usePostFormLoginMutation, usePostFormRegisterMutation } from '../../store/api/authApi';
import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // імпортуємо useNavigate

const Auth = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth.auth);
    const { register, handleSubmit, reset } = useForm<FormData>();
    const [postLogin, { isLoading: isLoggingIn }] = usePostFormLoginMutation();
    const [postRegister, { isLoading: isRegistering }] = usePostFormRegisterMutation();
    const [email, setEmail] = useState(localStorage.getItem("email") || "");
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const navigate = useNavigate(); // хук для навігації

    useEffect(() => {
        // Перевіряємо наявність токену в куки при завантаженні сторінки
        const token = Cookies.get('token');
        if (token) {
            dispatch(setAuth(true)); // Якщо токен є, встановлюємо стан авторизації
            navigate('/profile'); // Перенаправляємо на сторінку профілю
        }
    }, [dispatch, navigate]);

    const toggleAuthLink = () => {
        dispatch(setAuth(!auth));
    };

    const onSubmit = async (data: FormData) => {
        try {
            let response;

            if (auth) {
                // Логін
                response = await postLogin({ email: data.email, password: data.password }).unwrap();
            } else {
                // Реєстрація
                response = await postRegister({ username: data.username, email: data.email, password: data.password }).unwrap();
            }

            // Якщо успішно, зберігаємо в localStorage
            localStorage.setItem("email", data.email);
            if (!auth) {
                localStorage.setItem("username", data.username);
            }

            // Встановлюємо токен у cookies
            Cookies.set('token', response.token, { expires: 7 });
            reset();

            // Перенаправляємо на профіль після успішного логіну/реєстрації
            navigate('/profile');
        } catch (error) {
            console.error("Помилка авторизації:", error);
        }
    };

    return (
        <section className={s.auth}>
            <div className={s.container}>
                <div className={s.authContent}>
                    <div className={s.authForm}>
                        <h2 className={s.authTitle}>{auth ? "Login" : "Register"}</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {!auth && (
                                <input
                                    type="text"
                                    className={s.authInput}
                                    placeholder="Username"
                                    {...register("username", { required: true })}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            )}
                            <input
                                type="email"
                                className={s.authInput}
                                placeholder="Email"
                                {...register("email", { required: true })}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                className={s.authInput}
                                placeholder="Password"
                                {...register("password", { required: true })}
                            />
                            <div className={s.authBtns}>
                                <button type="submit" className={s.authSubLinkBtn}>
                                    {auth ? "Sign In" : "Sign Up"}
                                </button>
                                <button
                                    type="button"
                                    className={s.authSubLinkBtnRegister}
                                    onClick={toggleAuthLink}
                                >
                                    {auth ? "Register" : "Login"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Auth;
