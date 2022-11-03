import React, {Fragment, useState} from 'react';
import Pagination from './Pagination';

const Reviews = ({reviews, goToWrite, handleDeleteReview}) => {
    // 화면에 보여줄 티켓 수
    const limit = 3;

    // 페이지
    const [page, setPage] = useState(1);

    const offset = (page - 1) * limit;
    return (
        <div className=" mt-5 flex flex-col max-w-[890px] w-fit">
            <div className="flex h-48 overflow-hidden grow">
                {reviews?.slice(offset, offset + limit).map(data => {
                    const {idx, menu, star, name, comment, wdate} = data;
                    return (
                        <Fragment key={idx}>
                            <div
                                className={
                                    idx > 1
                                        ? 'h-[170px] w-[280px] min-w-[280px] bg-white ml-2.5  rounded-[20px] shadow-md overflow-hidden'
                                        : 'h-[170px] w-[280px] min-w-[280px] bg-white rounded-[20px] shadow-md overflow-hidden'
                                }
                            >
                                <div className="p-2.5">
                                    <div className="flex justify-between ">
                                        <h3 className="w-fit px-1 py-0.5 rounded-[20px] bg-orange-400 text-white text-sm">
                                            {menu}
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
                                    <p className="pl-1 font-medium">{name}</p>
                                    <p className="pl-1 text-2xl font-bold ">{comment}</p>
                                </div>
                                <div className="flex justify-between h-2/6 pt-3.5">
                                    <button
                                        className="w-1/2 h-full text-white bg-gray-500 hover:bg-gray-400 focus:outline-none focus:bg-gray-600"
                                        onClick={goToWrite}
                                    >
                                        수정
                                    </button>
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
