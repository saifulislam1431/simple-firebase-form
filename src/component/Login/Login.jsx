import React from 'react';
import './Login.css'

const Login = () => {
    const handleForm=(e)=>{
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email,password);
        
    }
    return (
        <div className='px-10 py-3 flex items-center justify-center min-h-[calc(100vh-100px)]'>
            <div>
            <h1 className='font-extrabold text-2xl text-center py-3 text-purple-600'>Login Form</h1>
            <form className='form' onSubmit={handleForm}>

                <input type="email" id="email" name="email" required placeholder='Your Email' /><br />

                <input type="password" id="password" name="password" required  placeholder='Password'/><br />

                <input type="submit" value="Login" className='btn-submit'/>
            </form>
            </div>
        </div>
    );
};

export default Login;