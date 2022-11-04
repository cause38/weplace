import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-regular-svg-icons';
import {useEffect} from 'react';

const FloatingBtn = () => {
    return (
        <div>
            <Link
                to="/write"
                className="fixed bottom-24 right-24 w-12 h-12 flex justify-center items-center text-xl font-bold transition-colors bg-orange-400 hover:bg-orange-500 text-white rounded-full shadow-md shadow-orange-300 transition-colors"
            >
                <FontAwesomeIcon icon={faPenToSquare} />
            </Link>
        </div>
    );
};

export default FloatingBtn;
