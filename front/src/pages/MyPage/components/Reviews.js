import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import Pagination from './Pagination';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

const Reviews = ({reviews, handleDeleteReview}) => {
    // 화면에 보여줄 티켓 수
    const limit = 3;

    // 페이지
    const [page, setPage] = useState(1);

    const offset = (page - 1) * limit;

    // 최신리뷰 별점
    const handleStar = star => {
        const arr = [];
        for (let i = 0; i < 5; i++) {
            if (i < star) arr.push(true);
            else arr.push(false);
        }
        return arr;
    };
    return (
        <div className="mt-[20px] flex flex-col w-full">
            <div
                className={
                    reviews?.length > 0
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6'
                        : 'flex justify-center items-center grow '
                }
            >
                {reviews?.slice(offset, offset + limit).map(data => {
                    const {idx, shopIdx, menu, star, name, comment, wdate} = data;
                    return (
                        <Fragment key={idx}>
                            <div
                                className={` ${
                                    idx > 1 ? 'w-full' : ''
                                } flex flex-col mb-2.5 bg-white rounded-lg shadow-md overflow-hidden`}
                            >
                                <Link to={`/detail/${shopIdx}`} className="p-5">
                                    <div className="flex justify-between items-center gap-4 mb-3">
                                        <span className="inline-block text-xs p-1 px-3 bg-orange-400 text-white rounded-full truncate">
                                            {menu}
                                        </span>
                                        <span className="text-sm whitespace-nowrap">{wdate}</span>
                                    </div>
                                    <span className="text-[15px] mb-3">
                                        {handleStar(star).map((item, idx) => (
                                            <span key={idx} className={`text-${item ? 'yellow' : 'gray'}-400`}>
                                                <FontAwesomeIcon icon={faStar} />
                                            </span>
                                        ))}
                                    </span>
                                    <h4 className="text-xl font-bold text-gray-900 truncate w-full mb-2">{name}</h4>
                                    <p className="truncate w-full text-gray-800">"{comment}"</p>
                                </Link>
                                <div className="flex text-center text-white">
                                    <Link
                                        to={`/write?idx=${shopIdx}&ridx=${idx}`}
                                        className="w-full py-2 bg-stone-400 transition-colors hover:bg-stone-500 focus:outline-none focus:bg-stone-600"
                                    >
                                        수정
                                    </Link>
                                    <button
                                        className="w-full py-2 bg-orange-400 transition-colors hover:bg-orange-500 focus:outline-none focus:bg-orange-600"
                                        onClick={e => handleDeleteReview(e, idx)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        </Fragment>
                    );
                })}
            </div>
            <Pagination total={reviews.length} limit={limit} page={page} setPage={setPage} />
        </div>
    );
};

export default Reviews;
