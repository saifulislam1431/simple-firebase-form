import React from 'react';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../../firebase/firebase.config';

const Register = () => {
    const auth = getAuth(app);

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email, password);

        createUserWithEmailAndPassword(auth, email, password)
        .then(res=>{
            const loggedUser = res.user;
            console.log(loggedUser);
        })
        .catch(error=>{
            console.log("Error:" , error.message);
        })

    }
    return (
        <div className='px-10 py-3 flex items-center justify-center min-h-[calc(100vh-100px)]'>
            <div>
                <h1 className='font-extrabold text-2xl text-center py-3 text-purple-600'>Register Form</h1>
                <form className='form' onSubmit={handleSubmit}>
                    <input type="text" id="username" name="username" required placeholder='Your Username'/><br />
                    <input type="email" id="email" name="email" required placeholder='Your Email' /><br />

                    <input type="password" id="password" name="password" required placeholder='Password' /><br />

                    <input type="submit" value="Register" className='btn-submit' />
                </form>
            </div>
        </div>
    );
};

export default Register;