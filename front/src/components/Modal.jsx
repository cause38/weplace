import {React, useState, useEffect, useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleCheck, faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';

const Modal = ({visible, setModalVisible, contents, title, alert, msg, type, handleAlert}) => {
    // alert type color / icon array
    const data = {
        success: {color: '#4ADE80', icon: faCircleCheck},
        danger: {color: '#f87171', icon: faCircleXmark},
        warning: {color: '#facc15', icon: faCircleInfo},
        primary: {color: '#fb923c', icon: faCircleInfo},
        confirm: {color: '#fb923c', icon: faCircleInfo},
        delete: {color: '#f87171', icon: faCircleInfo},
    };

    // alert msg html return
    const msgMarkup = () => {
        return {__html: msg};
    };

    // alert type confirm ::  button view / click function
    const isConfirm = type === 'confirm' || type === 'delete';
    const [isOk, setIsOk] = useState(false);
    const modalBox = useRef();

    useEffect(() => {
        if (alert && isOk) handleAlert();
    }, [isOk]);

    // ESC key_on :: modal hide
    const handleESC = e => {
        const key = e.keyCode ? e.keyCode : e.which;
        if (key === 27) setModalVisible(false);
    };

    // modal open :: body scroll hide
    useEffect(() => {
        if (visible) {
            const input = modalBox.current.querySelector('input');
            if (input) input.focus();
            document.body.classList.add('overflow-y-hidden', 'touch-none', 'overscroll-none');
            setTimeout(() => {
                modalBox.current.classList.remove('opacity-0');
                modalBox.current.classList.add('opacity-100');
            }, 150);

            window.addEventListener('keyup', e => handleESC(e));
        } else {
            document.body.classList.remove('overflow-y-hidden', 'touch-none', 'overscroll-none');
            setTimeout(() => {
                modalBox.current.classList.add('opacity-0');
                modalBox.current.classList.remove('opacity-100');
            }, 150);
        }

        return () => {
            if (visible) {
                window.removeEventListener('keyup', e => handleESC(e));
            }
        };
    }, [visible]);

    return (
        <div
            ref={modalBox}
            className={`${
                !visible ? 'hidden' : 'opacity-0'
            } transition fixed top-0 left-0 w-full h-full min-w-[360px] z-[1001]`}
        >
            <div className={'bg-gray-400 opacity-70 w-full h-full'} onClick={() => setModalVisible(false)}></div>
            <div
                className={`absolute w-11/12 ${
                    alert ? 'max-w-[400px]' : 'max-w-[500px]'
                } overflow-hidden p-6 md:p-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-[1001]`}
            >
                <div className={`${alert ? 'hidden' : ''} flex justify-between mb-6`}>
                    <h3 className="text-xl font-semibold">{title ? title : ''}</h3>
                    <button onClick={() => setModalVisible(false)} className="relative w-5 h-5 hover:opacity-75">
                        <span className="absolute top-1/2 left-0 rotate-45 block w-full h-[2px] bg-orange-400 rounded-full"></span>
                        <span className="absolute top-1/2 left-0 -rotate-45 block w-full h-[2px] bg-orange-400 rounded-full"></span>
                    </button>
                </div>
                <div className="w-full">
                    {!alert ? (
                        contents
                    ) : (
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
                                    onClick={() => setModalVisible(false)}
                                    className="bg-gray-100 max-w-[100px] w-full p-4 py-2 rounded hover:bg-gray-200/90 transition-colors"
                                >
                                    닫기
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
