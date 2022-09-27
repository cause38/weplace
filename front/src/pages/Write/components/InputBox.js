import React from 'react';
import {Fragment} from 'react';

const InputBox = ({label, id, onClick, checkBox}) => {
    return (
        <Fragment>
            {onClick ? (
                <div>
                    <label
                        className={
                            checkBox
                                ? 'w-full h-full border border-orange-400 rounded-full px-4 py-1 text-orange-600 transition-colors cursor-pointer hover:bg-orange-400 hover:text-white'
                                : 'inline-block text-gray-700 mb-2'
                        }
                        htmlFor={id}
                    >
                        {checkBox ? '# ' + label : label}
                    </label>
                    <input
                        name={id}
                        id={id}
                        type="text"
                        readOnly={checkBox ? false : true}
                        onClick={e => onClick(e)}
                        className={
                            checkBox
                                ? 'hidden '
                                : '' +
                                  'block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-0'
                        }
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
                        type={checkBox ? 'checkbox' : 'text'}
                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-orange-400 focus:ring-orange-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                    />
                </div>
            )}
        </Fragment>
    );
};

export default InputBox;
