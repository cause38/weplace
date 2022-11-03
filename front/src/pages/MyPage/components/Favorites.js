import React, {Fragment, useState} from 'react';
import Pagination from './Pagination';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faStar, faLocationDot, faFileLines} from '@fortawesome/free-solid-svg-icons';

const Favorites = ({favoriteList, handleDeleteFavorite, goToDetail}) => {
    // 화면에 보여줄 티켓 수
    const limit = 3;

    // 페이지
    const [page, setPage] = useState(1);

    const offset = (page - 1) * limit;

    return (
        <div className=" mt-[20px] flex flex-col w-full">
            <div
                className={
                    favoriteList?.length > 0
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6'
                        : 'flex justify-center items-center grow '
                }
            >
                {favoriteList?.slice(offset, offset + limit).map(data => {
                    const {idx, favorite, category, name, review, star, wdate} = data;
                    return (
                        <Fragment key={idx}>
                            <div
                                className={
                                    idx > 1
                                        ? ' flex w-full min-w-[315px] mb-2.5  bg-white rounded-[20px] shadow-md overflow-hidden'
                                        : ' flex min-w-[315px] mb-2.5 bg-white rounded-[20px] shadow-md overflow-hidden'
                                }
                            >
                                <div
                                    className={
                                        favoriteList?.length < 0
                                            ? 'absolute cursor-pointer mt-5 p-2 hover:opacity-50'
                                            : 'absolute cursor-pointer mt-11 p-2 hover:opacity-50'
                                    }
                                    onClick={e => handleDeleteFavorite(e, idx)}
                                >
                                    <span className="text-red-600 text-5xl">&#128150; </span>
                                </div>
                                <div
                                    className="w-full ml-20 p-4 cursor-pointer hover:bg-orange-400 hover:text-white"
                                    onClick={goToDetail}
                                >
                                    <div className="flex justify-between ">
                                        <span className="w-fit px-1.5 py-px rounded-[20px] bg-orange-400 text-white">
                                            {category}
                                        </span>
                                        <span>{wdate}</span>
                                    </div>
                                    <div className="pt-3">
                                        <span className="text-2xl font-bold">{name}</span>
                                    </div>
                                    <div className="flex justify-between pt-3">
                                        <div className="flex gap-2 items-center">
                                            <span className="w-7 h-7 text-xs rounded-full flex justify-center items-center bg-yellow-100">
                                                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                                            </span>
                                            {star}
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <span className="w-7 h-7 text-xs rounded-full flex justify-center items-center bg-red-100">
                                                <FontAwesomeIcon icon={faFileLines} className="text-red-400" />
                                            </span>
                                            {review}
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <span className="w-7 h-7 text-ml rounded-full flex justify-center items-center bg-orange-100">
                                                <FontAwesomeIcon icon={faHeart} className="text-red-400" />
                                            </span>
                                            {favorite}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    );
                })}
            </div>
            <Pagination total={favoriteList.length} limit={limit} page={page} setPage={setPage} />
        </div>
    );
};

export default Favorites;
