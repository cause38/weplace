import React from 'react';
import {Fragment} from 'react';

const InputBox = ({id, name, type, value, onChange, placeholder, ariaLabel, readOnly, nameInput}) => {
    return (
        <Fragment>
            {readOnly ? (
                <>
                    {name && (
                        <label
                            htmlFor={id}
                            className="w-2/5 pl-1 py-2 text-white text-sm font-medium placeholder-gray-500 bg-orange-300 border rounded-md focus:ring-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        >
                            {name}
                        </label>
                    )}
                    <input
                        id={id}
                        className={
                            name
                                ? 'block w-[62%]  pl-1 py-2 ml-[-15px] text-gray-700 text-sm placeholder-gray-500 bg-gray-200 border rounded-md border-orange-400 focus:border-orange-400 focus:ring-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring'
                                : 'block w-full  pl-1 py-2  text-gray-700 text-sm placeholder-gray-500 bg-gray-200 border rounded-md focus:outline-none'
                        }
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        aria-label={ariaLabel}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        ref={nameInput}
                        readOnly
                    />
                </>
            ) : (
                <>
                    {name && (
                        <label
                            htmlFor={id}
                            className="w-2/5 pl-1 py-2 text-white text-sm font-medium placeholder-gray-500 bg-orange-300 border rounded-md border-orange-400 focus:border-orange-400 focus:ring-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        >
                            {name}
                        </label>
                    )}
                    <input
                        id={id}
                        className={
                            name
                                ? 'block w-[62%]  pl-1 py-2 ml-[-15px] text-gray-700 text-sm placeholder-gray-500 bg-white border rounded-md border-orange-400 focus:border-orange-400 focus:ring-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring'
                                : 'block w-full  pl-1 py-2  text-gray-700 text-sm placeholder-gray-500 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring'
                        }
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        aria-label={ariaLabel}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        ref={nameInput}
                    />
                </>
            )}
        </Fragment>
    );
};

export default InputBox;
