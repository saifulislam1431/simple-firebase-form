import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/72342-welcome.json';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='px-10 py-3'>
            <div>
                <Lottie animationData={animationData} loop={true} />
            </div>

            <h3 className='text-center font-bold text-xl'>New User? <Link to="/register" className='text-purple-950 underline'>Register Here</Link></h3>
        </div>
    );
};

export default Home;