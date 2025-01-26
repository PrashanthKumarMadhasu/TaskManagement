import React, { useState } from 'react';
import './ForgotForm.css';
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { sendOtp, verifyOtp, updatePassword} from "../../api";
import { handleToast } from "../../Utils/Toasts";

const ForgotForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [resendOtp, setResendOtp] = useState(false);
    const [enteredOtp, setEnteredOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSendOtp = async (e) => {
        e.preventDefault();

        await sendOtp({ email })
            .then((res) => {
                handleToast(`Check your email for the OTP`, "green");
                setOtpSent(true);
            })
            .catch((err) => {
                handleToast(err.response?.data?.message || "Failed to send OTP.", "red");
                setResendOtp(true);
            });
    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        await verifyOtp({email, enteredOtp })
            .then((res) => {
                handleToast(`OTP verified`, "green");
                setVerified(true);
            })
            .catch((err) => {
                handleToast(err.response?.data?.message || "Invalid OTP! Please try again.", "red");
                setEnteredOtp("");
                setVerified(false);
                setEnteredOtp("");
                setResendOtp(false);
            });
    };

    const handleGoBack = () => {
        setOtpSent(false);
    }

    const handleReset = async(e) => {
        e.preventDefault();

        // Password pattern validation (example: at least 8 chars, 1 number, 1 special char)
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            handleToast("Password must be at least 8 characters long and contain a number and a special character.", "red");
            return;
        }

        if (password !== confirmPassword) {
            handleToast("Passwords do not match.", "red");
            return;
        }

        await updatePassword({email, password, confirmPassword})
            .then((res) => {
                setOtpSent(true);   
            })
            .catch((err) => {
                handleToast(err.response?.data?.message || "Error", "red");
                setResendOtp(true);
            });
        handleToast("Password updated successfully.", "green");
        //Redirect to login page after a few seconds
        setTimeout(() => {
            navigate("/");
        }, 2000);
    }

    return (
        <div className="forgot-password-wrapper">
            <div className='forgot-container'>
                <form className='forgot-form'>
                    {!otpSent ? (
                        <>
                            <h1 className='forgot-header'>Forgot Password ? </h1>
                            <div className="input-email">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <FaEnvelope className='icon' />
                            </div>

                            <button type="button" className="otp" onClick={handleSendOtp}>{!resendOtp ? "SEND OTP" : "RESEND OTP"} </button>
                            <br />
                        </>
                    ) : (
                        (!verified ? (
                            <>
                                <>
                                    <h1 className='forgot-header'>Enter OTP</h1>
                                    <div className="input-otp">
                                        <input
                                            type="text"
                                            placeholder="Enter OTP"
                                            value={enteredOtp}
                                            onChange={(e) => setEnteredOtp(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="button" className="otp" onClick={handleVerifyOTP}>VERIFY OTP</button>
                                    <p className='forgot-sub-header'><a style={{ cursor: 'pointer', }} onClick={handleGoBack}>Go back</a></p>
                                </>
                            </>
                        ) : (
                            <>
                                <h1 className='forgot-header'>Reset Password</h1>

                                <div className="input-password">
                                    <input
                                        type="text"
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="input-password">
                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className='update-otp' onClick={handleReset}>Update Password</button>
                            </>))
                    )}
                </form>
            </div>
        </div>
    );
}

export default ForgotForm;
