import React from 'react';

const Share = ({handleShare}) => {
    return (
        <div className="flex">
            <button className="mr-3 p-3 border-2 border-orange-400" onClick={e => handleShare(e, 'kakao')}>
                카카오
            </button>
            <button className="mr-3 p-3 border-2 border-violet-400" onClick={e => handleShare(e, 'url')}>
                URL복사
            </button>
            <button className="mr-3 p-3 border-2 border-blue-400" onClick={e => handleShare(e, 'slack')}>
                Slack
            </button>
        </div>
    );
};

export default Share;
