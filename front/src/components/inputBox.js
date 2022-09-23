import React from 'react';
import Button from './button';

const InputBox = ({name, type, value, onChange, placeholder, ariaLabel}) => {
    return (
        <div className="w-full mt-4 flex ">
            {name && (
                <label
                    htmlFor="{name}"
                    className="w-1/3 flex-auto pl-1 py-2 mt-2 text-slate-600 font-semibold placeholder-gray-500 bg-slate-200 border rounded-md focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    {name}
                </label>
            )}
            <input
                className={
                    name
                        ? 'block w-2/3  pl-1 py-2  mt-2 ml-[-5px] text-gray-700 placeholder-gray-500 bg-white border rounded-md focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                        : 'block w-full  pl-1 py-2  mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                }
                name={name}
                type={type}
                placeholder={placeholder}
                aria-label={ariaLabel}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputBox;
