import React from 'react'
import './LoginForm.css'
import { MdEmail } from "react-icons/md";
import { UserSignIn } from "../../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Redux/reducers/userSlice";
import { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const LoginForm = () => {
    const dispatch = useDispatch();
    const [toggleEye, setToggleEye] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlePassword = (e) => {
        e.preventDefault()
        setToggleEye(!toggleEye);
    };
    const handleLogin = async (e) => {
        e.preventDefault()
        await UserSignIn({ email, password })
            .then((res) => {
                console.log('API Response:', res);
                dispatch(loginSuccess(res.data));
            })
            .catch((err) => {
                console.error('API Error:', err.response);
                alert(err.response.data.message);
            });
    }

    return (
        <div className="wrapper">
            <form action="" >
                <h1>Login</h1>
                <div className="input-box">
                    <input type="email" placeholder='Enter your email' value={email} name="email" onChange={(e) => setEmail(e.target.value)} required />
                    <MdEmail className='icon' />
                </div>
                <div className="input-box">
                    <input type={toggleEye ? 'text' : 'password'} placeholder='Password' value={password} name="password" onChange={(e) => setPassword(e.target.value)} required />
                    {!toggleEye ? <FaEyeSlash className='icon' onClick={handlePassword} /> : <FaRegEye className='icon' onClick={handlePassword} />}
                </div>
                <div className="remember-forgot">
                    <a href="/forgot-password" target='_self' rel="noopener noreferrer">Forgot password?</a>
                </div>

                <button type='submit' onClick={handleLogin}>Login</button>

            </form>

        </div>
    )
}

export default LoginForm;