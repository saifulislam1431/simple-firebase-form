import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from '../../firebase/firebase.config';

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Register = () => {
    const [getError , setGetError] = useState('');
    const [getSuccess , setGetSuccess] = useState('');
    const auth = getAuth(app);

    const handleSubmit = (e) => {
        e.preventDefault();
        setGetError('');
        setGetSuccess('');

        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);
        
        if(!/(?=.*[A-Z])/.test(password)){
            setGetError("Password should have one uppercase letter")
            return;

        }
        else if(!/(?=.*[a-z])/.test(password)){
            setGetError("Password should have one lowercase letter")
            return;

        }
        else if(!/(?=.*\d)/.test(password)){
            setGetError("Password should have one digit")
            return;
        }
        else if(password.length < 8){
            setGetError("Password should have eight character")
            return;
        }


        createUserWithEmailAndPassword(auth, email, password)
        .then(res=>{
            const loggedUser = res.user;
            console.log(loggedUser);
            sendVerification(res.user);
            setGetError('')
            e.target.reset();
            toast.success('Your account created successfully!', {
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
        .catch(error=>{
            console.log("Error:" , error.message);
        })

        const sendVerification = (user) =>{
          sendEmailVerification(user)
          .then(()=>{
            toast.success('Email verification send!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
          })
        }

      

    }
    return (
        <div className='px-10 py-3 flex items-center justify-center min-h-[calc(100vh-100px)]'>
            <div>
                <h1 className='font-extrabold text-2xl text-center py-3 text-purple-600'>Register Form</h1>
                <form className='form' onSubmit={handleSubmit}>
                    <input type="text" id="username" name="username" required placeholder='Your Username'/><br />
                    <input type="email" id="email" name="email" required placeholder='Your Email' /><br />

                    <input type="password" id="password" name="password" required placeholder='Password' /><br />
                    <p className='text-red-600'>{getError}</p>
                    <input type="submit" value="Register" className='btn-submit' />
                </form>
                <p className='font-medium my-2'>Already have an account? <Link to="/login" className='text-green-950 underline'>Please login.</Link></p>
            </div>
        </div>
    );
};

export default Register;