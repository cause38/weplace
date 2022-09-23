import React from 'react';

const Button = ({contents, onClick}) => {
    return (
        <button
            className="px-4 py-2 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
            type="button"
            onClick={() => onClick()}
        >
            {contents}
        </button>
    );
};

export default Button;
