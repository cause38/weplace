import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {faImage, faThumbsUp, faThumbsDown, faPenToSquare, faTrashCan} from '@fortawesome/free-regular-svg-icons';

const Review = ({idx, token, sIdx, data, more, handleReviewToggle, handleImg, getReviewData}) => {
    const [star, setStar] = useState([]);
    const qs = require('qs');

    const handleDelete = ridx => {
        if (window.confirm('삭제 시 복구가 불가능합니다.\n정말 삭제 하시겠습니까?')) {
            const url = 'http://place-api.weballin.com/mypage/deleteReview';
            const data = {token: token, idx: parseInt(ridx)};
            const options = {
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                data: qs.stringify(data),
            };

            axios
                .delete(url, options)
                .then(response => {
                    if (response.data.state === 200) {
                        alert(response.data.msg);
                        getReviewData();
                    } else {
                        alert(response.data.msg);
                    }
                })
                .catch(function (error) {
                    console.error(error);
                    alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
                });
        }
    };

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
        <div className="relative flex flex-col gap-5 mt-4 p-4 py-5 bg-white shadow-lg rounded">
            <div className="flex gap-1 justify-between border border-gray-100 rounded-full p-2 py-1 pr-5">
                <div className="flex gap-3 items-center">
                    <span
                        className="w-[50px] h-[50px] bg-orange-300 rounded-full p-2"
                        style={{background: `url('${data.thumb}') center/cover`}}
                    ></span>
                    <p className="text-lg">{data.name}</p>
                    <div className={`${data.isMine ? '' : 'hidden'} flex gap-2`}>
                        <Link
                            to={`/write?idx=${sIdx}&ridx=${data.idx}`}
                            className="text-orange-500 bg-orange-100 w-[30px] h-[30px] text-xs p-1 flex justify-center items-center rounded-full hover:bg-orange-50"
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                        <button
                            type="button"
                            onClick={() => handleDelete(data.idx)}
                            className="text-orange-500 bg-orange-100 w-[30px] h-[30px] text-xs p-1 flex justify-center items-center rounded-full hover:bg-orange-50"
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
                        <div className="flex gap-3 items-center w-full border p-2 rounded-full">
                            <span className="w-[40px] h-[40px] bg-green-100 text-green-400 rounded-full p-2 text-center">
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </span>
                            <p>{data.comment_good}</p>
                        </div>
                        <div className="flex gap-3 items-center w-full border p-2 rounded-full">
                            <span className="w-[40px] h-[40px] bg-red-100 text-red-400 rounded-full p-2 text-center">
                                <FontAwesomeIcon icon={faThumbsDown} />
                            </span>
                            <p>{data.comment_bad}</p>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        {data.image.length > 0 &&
                            data.image.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="w-[100px] h-[100px] border p-2 hover:bg-orange-200 cursor-pointer"
                                    onClick={() => handleImg(item)}
                                    style={{background: `url(${item}) no-repeat center/auto 90%`}}
                                ></div>
                            ))}
                    </div>
                </div>
            </div>
            <span
                onClick={e => handleReviewToggle(e)}
                className="absolute right-5 bottom-5 text-center text-orange-600 cursor-pointer"
            >
                {more ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
            </span>
        </div>
    );
};

export default Review;
