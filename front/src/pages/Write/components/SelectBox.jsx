import React from 'react';

const SelectBox = ({label, id, arr, value, onChange, contents, isReadOnly}) => {
    return (
        <div>
            <label className="inline-block text-gray-700 mb-2" htmlFor={id}>
                {label}
            </label>
            <div className="flex items-center gap-4">
                <div className="relative w-full">
                    <select
                        id={id}
                        value={value}
                        onChange={onChange}
                        disabled={isReadOnly}
                        className={`${
                            isReadOnly ? 'bg-gray-100 ' : ''
                        }w-full rounded border appearance-none border-gray-200 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 text-base pl-3 pr-10`}
                    >
                        {arr}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                        >
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </span>
                </div>
                {contents}
            </div>
        </div>
    );
};

export default SelectBox;
