import React, {useState, useEffect} from 'react';
import Modal from './Modal';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleCheck, faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';

const Alert = ({title, msg, type, visible, handleAlert, setVisible}) => {
    const data = {
        success: {color: '#4ADE80', icon: faCircleCheck},
        danger: {color: '#f87171', icon: faCircleXmark},
        warning: {color: '#facc15', icon: faCircleInfo},
        primary: {color: '#fb923c', icon: faCircleInfo},
        confirm: {color: '#fb923c', icon: faCircleInfo},
    };

    const msgMarkup = () => {
        return {__html: msg};
    };

    const isConfirm = type === 'confirm';
    const [isOk, setIsOk] = useState(false);

    useEffect(() => {
        if (isOk) handleAlert();
    }, [isOk]);

    return (
        <div>
            <Modal
                visible={visible}
                alert={true}
                contents={
                    <>
                        <div className="text-center text-5xl font-light" style={{color: data[type].color}}>
                            <FontAwesomeIcon icon={data[type].icon} />
                            <h3 className="font-semibold text-xl mt-2 capitalize">{title ? title : type}</h3>
                        </div>
                        <p
                            className="text-center flex flex-col justify-center items-center my-10 mt-8"
                            dangerouslySetInnerHTML={msgMarkup()}
                        ></p>
                        <div className="flex justify-center items-center gap-2 max-w-[200px] mx-auto">
                            <button
                                className={`${
                                    isConfirm ? '' : 'hidden'
                                } w-full p-4 py-2 rounded text-white hover:bg-opacity-90 transition-colors`}
                                style={{backgroundColor: data[type].color}}
                                onClick={() => setIsOk(true)}
                            >
                                확인
                            </button>
                            <button
                                onClick={() => setVisible(false)}
                                className="bg-gray-100 max-w-[100px] w-full p-4 py-2 rounded hover:bg-gray-200/90 transition-colors"
                            >
                                닫기
                            </button>
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default Alert;
