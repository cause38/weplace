import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ImgBox from './imgBox';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {faImage, faThumbsUp, faThumbsDown, faPenToSquare, faTrashCan} from '@fortawesome/free-regular-svg-icons';

const Review = ({
    sIdx,
    data,
    more,
    handleReviewToggle,
    handleImg,
    setModalVisible,
    setIsAlert,
    setModalImg,
    setDelIdx,
}) => {
    const [star, setStar] = useState([]);
    const qs = require('qs');

    // 별점
    useEffect(() => {
        const arr = [];
        for (let i = 0; i < 5; i++) {
            if (i < data.star) arr.push(true);
            else arr.push(false);
        }
        setStar(arr);
    }, []);

    return (
        <div className="relative flex flex-col gap-5 p-4 py-5 bg-white shadow-md rounded-lg">
            <div className="flex gap-1 justify-between border border-gray-200 rounded-full p-2 py-1 pr-5">
                <div className="flex gap-3 items-center">
                    <span
                        className="w-[50px] h-[50px] bg-orange-300 rounded-full p-2"
                        style={{background: `url('${data.thumb}') no-repeat center/cover`}}
                    ></span>
                    <p className="text-lg">{data.name}</p>
                    <div className={`${data.isMine ? '' : 'hidden'} flex gap-2`}>
                        <Link
                            to={`/write?idx=${sIdx}&ridx=${data.idx}`}
                            className="text-orange-500 bg-orange-100 w-[30px] h-[30px] text-xs p-1 flex justify-center items-center rounded-full transition-colors hover:bg-orange-200 hover:bg-opacity-75"
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                        <button
                            type="button"
                            onClick={() => {
                                setDelIdx(data.idx);
                                setIsAlert(true);
                                setModalVisible(true);
                            }}
                            className="text-orange-500 bg-orange-100 w-[30px] h-[30px] text-xs p-1 flex justify-center items-center rounded-full transition-colors hover:bg-orange-200 hover:bg-opacity-75"
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <p className="flex items-center">{data.wdate}</p>
            </div>

            <div className="w-full mb-6">
                <div className="sm:px-2 flex flex-col gap-3">
                    <div className="flex gap-2 justify-between items-center w-full">
                        <div className="flex gap-3">
                            <span className="text-sm rounded-full px-4 py-1 bg-orange-500 text-white">{data.menu}</span>
                            <span className={`${data.image.length <= 0 ? 'hidden' : ''} text-orange-500`}>
                                <FontAwesomeIcon icon={faImage} />
                            </span>
                        </div>
                        <span>
                            {star.map((item, idx) => (
                                <span key={idx} className={`text-${item ? 'yellow' : 'gray'}-400`}>
                                    <FontAwesomeIcon icon={faStar} />
                                </span>
                            ))}
                        </span>
                    </div>

                    <strong className="text-xl my-2">"{data.comment}"</strong>
                    <div className="flex gap-2 flex-wrap">
                        {data.tag.length > 0 &&
                            data.tag.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-sm rounded-full px-4 py-1 bg-white text-orange-600 border border-orange-300 font-medium"
                                >
                                    #{tag}
                                </span>
                            ))}
                    </div>
                </div>

                <div className="moreData w-full mt-5 mb-2 hidden">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-3 items-center w-full border bg-gray-50 rounded-lg">
                            <span className="min-w-[40px] min-h-[40px] bg-green-100 text-green-400 rounded-full p-2 text-center">
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </span>
                            <p>{data.comment_good}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-3 items-center w-full border bg-gray-50 rounded-lg">
                            <span className="min-w-[40px] min-h-[40px] bg-red-100 text-red-400 rounded-full p-2 text-center">
                                <FontAwesomeIcon icon={faThumbsDown} />
                            </span>
                            <p>{data.comment_bad}</p>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        {data.image.length > 0 &&
                            data.image.map((item, idx) => (
                                <ImgBox key={idx} item={item} handleImg={() => handleImg()} setModalImg={setModalImg} />
                            ))}
                    </div>
                </div>
            </div>
            <span
                onClick={e => {
                    setIsAlert(true);
                    handleReviewToggle(e);
                }}
                className="absolute right-5 bottom-5 text-center text-orange-600 cursor-pointer"
            >
                {more ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
            </span>
        </div>
    );
};

export default Review;
