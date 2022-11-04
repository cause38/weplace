import React from 'react';
import {Fragment} from 'react';

const JoinInput = ({id, name, type, value, onChange, placeholder, ariaLabel, readOnly, focus}) => {
    return (
        <Fragment>
            {readOnly ? (
                <>
                    <label
                        htmlFor={id}
                        className="block w-2/5 pl-1 py-2 text-slate-700 text-sm font-medium placeholder-gray-500 border-0 rounded-md border-orange-400 min-w-[90px]"
                    >
                        {name}
                    </label>

                    <input
                        id={id}
                        className="block w-full border-0 border-b-2 pl-1 py-2 text-gray-700 text-sm placeholder-gray-500 focus:outline-none bg-slate-200 opacity-0.5"
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        aria-label={ariaLabel}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        ref={focus}
                        readOnly
                    />
                </>
            ) : (
                <>
                    <label
                        htmlFor={id}
                        className="block w-2/5 pl-1 py-2 text-slate-700 text-sm font-medium placeholder-gray-500 border-0 rounded-md border-orange-400 min-w-[90px] focus:border-orange-400 focus:ring-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    >
                        {name}
                    </label>

                    <input
                        id={id}
                        className="block w-full border-0 border-b-2 pl-1 py-2 text-gray-700 text-sm placeholder-gray-500 bg-white duration-700 ease-in
                focus:outline-none focus:border-orange-300 focus:transition focus:duration-700"
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        aria-label={ariaLabel}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        ref={focus}
                    />
                </>
            )}
        </Fragment>
    );
};

export default JoinInput;
