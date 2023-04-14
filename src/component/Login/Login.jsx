import React, { useRef, useState } from 'react';
import './Login.css'
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const auth = getAuth(app);

const Login = () => {
    const [getError, setGetError] = useState('');
    const emailRef = useRef();

    const handleForm = (e) => {


        e.preventDefault();

        const form = e.target;

        setGetError('')
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        form.reset();

        if (!/(?=.*[A-Z])/.test(password)) {
            setGetError("Password should have one uppercase letter")
            return;

        }
        else if (!/(?=.*[a-z])/.test(password)) {
            setGetError("Password should have one lowercase letter")
            return;

        }
        else if (!/(?=.*\d)/.test(password)) {
            setGetError("Password should have one digit")
            return;
        }
        else if (password.length < 8) {
            setGetError("Password should have eight character")
            return;
        }


        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                const signedUser = res.user;
                console.log(signedUser);

                toast.success('Login successful!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setGetError('');
            })
            .catch(error => {
                console.log("Error:", error.message);
                setGetError(error.message);
            })

    }
    const handleEmail = (e) => {
        const email = emailRef.current.value;

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.error('Please send email.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .then(error => {
                console.log(error);
                setGetError(error.message);
            })
    }
    return (
        <div className='px-10 py-3 flex items-center justify-center min-h-[calc(100vh-100px)]'>
            <div>
                <h1 className='font-extrabold text-2xl text-center py-3 text-purple-600'>Login Form</h1>
                <form className='form' onSubmit={handleForm}>

                    <input type="email" id="email" ref={emailRef} name="email" required placeholder='Your Email' /><br />

                    <input type="password" id="password" name="password" required placeholder='Password' /><br />
                    <p>{getError}</p>
                    <input type="submit" value="Login" className='btn-submit' />
                </form>

                <p className='font-medium my-2'>New to this site? <Link to="/register" className='text-green-950 underline'>Please Register.</Link></p>

                <p className='font-medium my-2'>Forget password? <a to="/register" className='text-blue-800 underline' onClick={handleEmail}>Reset password.</a></p>
            </div>
        </div>
    );
};

export default Login;