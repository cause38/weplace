import React from 'react';

const LoginInput = ({type, value, onChange, placeholder, ariaLabel, focus}) => {
    return (
        <>
            <input
                className="block w-full border-0 border-b-2 pl-1 py-2 text-gray-700 text-sm placeholder-gray-500 bg-white duration-700 ease-in
                focus:outline-none focus:border-orange-300 focus:transition focus:duration-700"
                type={type}
                placeholder={placeholder}
                aria-label={ariaLabel}
                value={value}
                onChange={e => onChange(e.target.value)}
                ref={focus}
            />
        </>
    );
};

export default LoginInput;
