import React from 'react';

const Modal = ({visible, setModalVisible, contents, title}) => {
    return (
        <div className={!visible ? 'hidden' : ''}>
            <div className={'fixed top-0 left-0 w-full h-full z-[100] bg-gray-400 opacity-70'}></div>
            <div className="absolute w-full max-w-xl p-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-[101]">
                <div className="flex justify-between mb-6">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <button onClick={() => setModalVisible(false)} className="relative w-5 h-5 hover:opacity-75">
                        <span className="absolute top-1/2 left-0 rotate-45 block w-full h-[2px] bg-orange-400 rounded-full"></span>
                        <span className="absolute top-1/2 left-0 -rotate-45 block w-full h-[2px] bg-orange-400 rounded-full"></span>
                    </button>
                </div>
                <div className="w-full">{contents}</div>
            </div>
        </div>
    );
};

export default Modal;
