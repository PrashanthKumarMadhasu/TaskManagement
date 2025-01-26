import { useState } from 'react'
import '../LoginForm/LoginForm.css'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { loginSuccess } from "../../Redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { UserSignUp } from "../../api";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { handleToast } from "../../Utils/Toasts";


const RegisterForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("");
    const [toggleEye, setToggleEye] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault()
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            handleToast("Password must be at least 8 characters long and contain a number and a special character.", "red");
            return;
        }
        await UserSignUp({ name, email, password })
            .then((res) => {
                dispatch(loginSuccess(res.data));
                handleToast("Account Created Success", "green");
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    }

    const handlePassword = (e) => {
        e.preventDefault()
        setToggleEye(!toggleEye);
    };

    return (
        <div className="wrapper">
            <form action="">
                <h1>Register</h1>
                <div className="input-box">
                    <input type="text" placeholder='Username' value={name} onChange={(e)=>{setName(e.target.value)}} required />
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input type="email" placeholder='example@gamil.com' value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
                    <MdEmail className='icon' />
                </div>
                <div className="input-box">
                    <input type={toggleEye ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
                    {!toggleEye ? <FaEyeSlash className='icon' onClick={handlePassword} /> : <FaRegEye className='icon' onClick={handlePassword} />}
                </div>

                <button type='submit' onClick={handleRegister}>Register</button>

            </form>

        </div>
    )
}

export default RegisterForm;