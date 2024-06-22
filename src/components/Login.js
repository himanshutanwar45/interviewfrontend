import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';
import { loginUser } from '../state/action/action'
import '../Login.css'
import Signup from './Signup';

const Login = ({ loginUser, setProgress, showAlert }) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const { email, password } = credentials

    let history = useNavigate();

    useEffect(() => {
        setProgress(40)
        setTimeout(() => {
            setProgress(100)
        }, 1000)
        // eslint-disable-next-line
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password, (userData) => {

                if (userData.success) {
                    history('/')
                    localStorage.setItem('auth-Token',userData.authToken)
                    localStorage.setItem('name',userData.name)
                    localStorage.setItem('userId',userData.userId)
                    localStorage.setItem('isAdmin',userData.isAdmin)
                    setCredentials({ email: "", password: "" })
                }
                else {
                    showAlert('error',userData.error)
                    
                }


            });
        }
        catch (error) {
            showAlert('error',error.message)
        }
        setProgress(100)
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const signRef = useRef(null)
    const signClose = useRef(null)

    const handleSignup = (e) => {
        e.preventDefault();
        if (signRef.current) {
            signRef.current.click();
        } else {
            console.error("Signup button ref is not assigned.");
        }
    }

    return (
        <>
            <form className='form my-2'>
                <div className="screen-1">
                    <div className="email">
                        <label htmlFor="email">Email Address</label>
                        <div className="sec-2">
                            <ion-icon name="mail-outline"></ion-icon>
                            <input type="email" id="email" name="email" onChange={onChange} value={email} />
                        </div>
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <div className="sec-2">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input className="pas" type="password" id="password" name="password" onChange={onChange} value={password} />
                            <ion-icon className="show-hide" name="eye-outline"></ion-icon>
                        </div>
                    </div>
                    <button className="btn btn-outline-primary" onClick={handleSubmit}>Login </button>

                    <div className="footer">
                        <button className="btn btn-outline-primary" onClick={handleSignup}>Signup</button>
                        <button className="btn btn-outline-primary" >Forget Password ?</button>

                    </div>
                    
                </div>
            </form>

            {/* Signup Form */}
            <Signup signRef={signRef} signClose={signClose} setProgress={setProgress} showAlert={showAlert}></Signup>
        </>
    )
}

const mapStateToProps = state => ({
    loginTouser: state.loginTouser
});


const mapDispatchToProps = {
    loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

