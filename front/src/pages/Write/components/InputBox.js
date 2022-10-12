import React from 'react';
import {Fragment} from 'react';

const InputBox = ({label, id, onClick, onChange}) => {
    return (
        <>
            {onClick ? (
                <div>
                    <label className="inline-block text-gray-600 mb-2" htmlFor={id}>
                        {label}
                    </label>
                    <input
                        name={id}
                        id={id}
                        type="text"
                        readOnly
                        onClick={e => onClick(e)}
                        onChange={onChange}
                        className="block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-0"
                    />
                </div>
            ) : (
                <div>
                    <label className="block text-gray-700 mb-2" htmlFor={id}>
                        {label}
                    </label>
                    <input
                        name={id}
                        id={id}
                        type="text"
                        onChange={onChange}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-orange-400 focus:ring-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    />
                </div>
            )}
        </>
    );
};

export default InputBox;
