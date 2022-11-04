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

    console.log('revew', reviews);

    const offset = (page - 1) * limit;
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
                                className={
                                    idx > 1
                                        ? 'flex flex-col w-full min-w-[315px] mb-2.5  bg-white rounded-[20px] shadow-md overflow-hidden'
                                        : 'flex flex-col min-w-[315px] mb-2.5 bg-white rounded-[20px] shadow-md overflow-hidden'
                                }
                            >
                                <div className="p-5">
                                    <div className="flex justify-between">
                                        <h3 className="w-fit p-2 rounded-[20px] bg-orange-400 text-white text-sm">
                                            {name}
                                        </h3>
                                        <p className="flex items-center text-sm">{wdate}</p>
                                    </div>
                                    <span className="star pl-1">
                                        {[1, 2, 3, 4, 5].map(el => (
                                            <i
                                                key={el}
                                                className={`fas fa-star fa-light ${el <= star && 'yellowStar'}`}
                                            />
                                        ))}
                                    </span>
                                    <div className="flex justify-between">
                                        <p className="pl-1 font-medium underline underline-offset-2 italic">{menu}</p>
                                        <div className="flex justify-between">
                                            <div className="flex gap-2 items-center">
                                                <span className="w-7 h-7 text-xs rounded-full flex justify-center items-center bg-yellow-100">
                                                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                                                </span>
                                                {star}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="pl-1 text-2xl font-bold ">{comment}</p>
                                </div>
                                <div className="flex justify-between h-10">
                                    <Link
                                        to={`/write?idx=${shopIdx}&ridx=${idx}`}
                                        className="w-1/2 h-full text-center leading-10 text-white bg-gray-500 hover:bg-gray-400 focus:outline-none focus:bg-gray-600"
                                        // onClick={() => goToWrite(idx, shopIdx)}
                                    >
                                        수정
                                    </Link>
                                    <button
                                        className="w-1/2 h-full bg-orange-500 text-white hover:bg-orange-400 focus:outline-none focus:bg-orange-600"
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
