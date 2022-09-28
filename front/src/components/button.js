import React from 'react';
import {Fragment} from 'react';

const Button = ({contents, onClick, disAbled}) => {
    return (
        <Fragment>
            {disAbled ? (
                <button
                    className={
                        'w-full h-full py-[5px] leading-5 text-white transition-colors duration-300 transform bg-gray-500 rounded hover:bg-gray-400 focus:outline-none'
                    }
                    type="button"
                    onClick={e => onClick(e)}
                    disabled
                >
                    {contents}
                </button>
            ) : (
                <button
                    className={
                        'w-full h-full py-[5px] leading-5 text-white transition-colors duration-300 transform bg-orange-500 rounded hover:bg-orange-400 focus:outline-none'
                    }
                    type="button"
                    onClick={e => onClick(e)}
                >
                    {contents}
                </button>
            )}
        </Fragment>
    );
};

export default Button;
