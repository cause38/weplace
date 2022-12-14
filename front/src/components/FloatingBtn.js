import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-regular-svg-icons';

const FloatingBtn = () => {
    const {pathname} = useLocation();

    return (
        <div
            className={`${
                pathname !== '/write' ? 'fixed xl:sticky' : 'hidden'
            } bottom-5 right-5 md:bottom-10 md:right-10 xl:bottom-auto; xl:right-auto xl:top-[calc(100%_-_100px)] xl:left-full xl:-translate-x-[90px] z-[1000] w-[50px] h-[50px] flex justify-center items-center`}
        >
            <Link
                to="/write"
                className={`w-[50px] h-[50px] flex w-full h-full justify-center items-center text-xl font-bold transition-colors bg-orange-400 hover:bg-orange-500 text-white rounded-full shadow-md shadow-orange-300 transition-colors`}
            >
                <FontAwesomeIcon icon={faPenToSquare} />
            </Link>
        </div>
    );
};

export default FloatingBtn;
