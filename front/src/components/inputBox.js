import React from 'react';
import Button from './button';

const InputBox = ({id, name, type, value, onChange, placeholder, ariaLabel}) => {
    return (
        <div className="w-full mt-4 flex ">
            {name && (
                <label
                    htmlFor="{name}"
                    className="w-2/5 pl-1 py-2 mt-2 text-slate-600 text-sm font-semibold placeholder-gray-500 bg-slate-200 border rounded-md focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    {name}
                </label>
            )}
            <input
                id={id}
                className={
                    name
                        ? 'block w-[62%]  pl-1 py-2  mt-2 ml-[-5px] text-gray-700 text-xs placeholder-gray-500 bg-white border rounded-md focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                        : 'block w-full  pl-1 py-2  mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                }
                name={name}
                type={type}
                placeholder={placeholder}
                aria-label={ariaLabel}
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
};

export default InputBox;
