import s from './Auth.module.scss'
import { useDispatch,  } from 'react-redux'
import {  setAuth,  setToken } from '../../store/authSlice/authSlice'
import {  SubmitHandler, useForm } from "react-hook-form"

import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useAuth } from '../../context/authContenxt'
import { useInfo } from '../../context/UserInfo'

interface FormData {
    email: string;
    password: string;
  }
  
  const Login = () => {
    const [loading, setLoading] = useState(false);
    const { updateUsername, updateEmail} =useInfo();
    const { setToken } = useAuth(); // Получаем функцию для установки токена
    const navigate = useNavigate();
  
    const { register, handleSubmit } = useForm<FormData>();
  
    // const onSubmitJHandler: SubmitHandler<FormData> = async (data) => {
    //   try {
    //     setLoading(true);
    //     const response = await axios.post('https://nft-market-as0q.onrender.com/auth/login', {
    //       email: data.email,
    //       password: data.password,
    //     });
  
    //     if (response.data.token) {
    //       setToken(response.data.token); // Устанавливаем токен через контекст
    //       navigate('/profile');
    //     }
    //   } catch (error) {
    //     console.error('Ошибка при отправке формы:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
  //   const onSubmitJHandler: SubmitHandler<FormData> = async (data) => {
  //     try {
  //         setLoading(true);
  //         const response = await axios.post('https://nft-market-as0q.onrender.com/auth/login', {
  //             email: data.email,
  //             password: data.password,
  //         });
  
  //         if (response.data.token) {
  //             setToken(response.data.token); // Устанавливаем токен
  
  //             // Загружаем данные профиля сразу после входа
  //             try {
  //                 const profileResponse = await axios.get("https://nft-market-as0q.onrender.com/auth/profile", {
  //                     headers: { Authorization: `Bearer ${response.data.token}` },
  //                 });
  
  //                 updateUsername(profileResponse.data.data.username || "");
  //                 updateEmail(profileResponse.data.data.email || ""); // Обновляем email
  //             } catch (error) {
  //                 console.error("Ошибка при загрузке профиля после входа:", error);
  //             }
  
  //             navigate('/profile');
  //         }
  //     } catch (error) {
  //         console.error('Ошибка при отправке формы:', error);
  //     } finally {
  //         setLoading(false);
  //     }
  // };
  const onSubmitJHandler: SubmitHandler<FormData> = async (data) => {
    try {
        setLoading(true);
        const response = await axios.post('https://nft-market-as0q.onrender.com/auth/login', {
            email: data.email,
            password: data.password,
        });

        if (response.data.token) {
            setToken(response.data.token);

            try {
                const profileResponse = await axios.get("https://nft-market-as0q.onrender.com/auth/profile", {
                    headers: { Authorization: `Bearer ${response.data.token}` },
                });

                updateUsername(profileResponse.data.data.username);
                updateEmail(profileResponse.data.data.email);
            } catch (error) {
                console.error("Ошибка загрузки профиля после входа:", error);
            }

            navigate('/profile');
        }
    } catch (error) {
        console.error('Ошибка при отправке формы:', error);
    } finally {
        setLoading(false);
    }
};
  
  
  return (
      <section className="auth">
        <div className="container">
          <div className="authContent">
            <div className="authForm">
              <h2 className="authTitle">Login</h2>
              <form onSubmit={handleSubmit(onSubmitJHandler)} autoComplete="off">
                <input
                  type="email"
                  className="authInput"
                  placeholder="Email"
                  {...register('email', { required: 'Email is required' })}
                  autoComplete="new-email"
                />
                <input
                  type="password"
                  className="authInput"
                  placeholder="Password"
                  {...register('password', { required: 'Password is required' })}
                  autoComplete="new-password"
                />
                <div className="authBtns">
                  <button type="submit" className="authSubLinkBtn" disabled={loading}>
                    {loading ? 'Loading...' : 'Войти'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Login;