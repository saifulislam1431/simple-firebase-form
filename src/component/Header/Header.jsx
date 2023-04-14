import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {

    return (
        <div>
            <nav className='flex px-10 py-3 items-center justify-between bg-sky-300'>
                <h1>Logo</h1>
                <ul className='flex font-semibold text-yellow-700'>
                    <li className='mr-10'>
                        <NavLink to="/">Home</NavLink>
                       
                    </li>
                    <li className='mr-10'>
                    <NavLink to="/login">LogIn</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;