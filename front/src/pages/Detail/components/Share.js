import React from 'react';

const Share = ({handleShare, kakaoSharedEvent}) => {
    return (
        <div className="px-3 py-1 bg-white shadow-lg border rounded-md font-medium text-gray-500 text-base text-center">
            <button
                id="kakao-shared-btn"
                className="block w-[100px] p-2 border-b hover:text-orange-500"
                onClick={e => handleShare(e, 'kakao')}
            >
                카카오
            </button>
            <button
                className=" block w-[100px] p-2 border-b hover:text-purple-500"
                onClick={e => handleShare(e, 'url')}
            >
                URL
            </button>
            <button className=" block w-[100px] p-2 hover:text-blue-500" onClick={e => handleShare(e, 'slack')}>
                Slack
            </button>
        </div>
    );
};

export default Share;
