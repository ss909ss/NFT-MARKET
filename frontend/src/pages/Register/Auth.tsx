import s from './Auth.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../store/authSlice/authSlice'
import { RootState } from '../../store/store'

const Auth = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth.auth);

    const toggleAuthLink = () => {
        dispatch(setAuth(!auth));
    }

    return (
        <section className={s.auth}>
            <div className={s.container}>
                <div className={s.authContent}>
                    <div className={s.authForm}>
                        <h2 className={s.authTitle}>
                            {auth ? "Login" : "Register"}
                        </h2>
                        {auth ? (
                            <>
                                <input type="password" className={s.authInput} name="password" placeholder='password' />
                                <input type="text" className={s.authInput} name="email" placeholder='email' />
                            </>
                        ) : (
                            <>
                                <input type="text" className={s.authInput} name="name" placeholder='name' />
                                <input type="password" className={s.authInput} name="password" placeholder='password' />
                                <input type="text" className={s.authInput} name="email" placeholder='email' />
                            </>
                        )}

                        <div className={s.authBtns}>
                            <button
                                className={s.authSubLinkBtn}
                                onClick={toggleAuthLink}
                            >
                                Sign In
                            </button>

                            <button
                                className={s.authSubLinkBtnRegister}
                                onClick={toggleAuthLink}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Auth