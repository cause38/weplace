import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import Pagination from './Pagination';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faStar, faFileLines} from '@fortawesome/free-solid-svg-icons';

const Favorites = ({favoriteList, handleDeleteFavorite, goToDetail}) => {
    // 화면에 보여줄 티켓 수
    const limit = 3;

    // 페이지
    const [page, setPage] = useState(1);

    const offset = (page - 1) * limit;

    return (
        <div className="mt-[20px] flex flex-col w-full">
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
                            <Link
                                to={`/detail/${idx}`}
                                className={` ${
                                    idx > 1 ? 'w-full' : ''
                                } flex flex-col mb-2.5 p-4 bg-white rounded-lg shadow-md overflow-hidden`}
                            >
                                <div className="flex justify-between items-center gap-4 mb-3">
                                    <span className="inline-block text-xs p-1 px-3 bg-orange-400 text-white rounded-full truncate">
                                        {category}
                                    </span>
                                    <span className={`hover:opacity-50`} onClick={e => handleDeleteFavorite(e, idx)}>
                                        <FontAwesomeIcon icon={faHeart} className="text-red-400 text-xl" />
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 truncate w-full mb-2">{name}</h4>
                                    <div className="flex gap-3 justify-between mt-4">
                                        <div className="flex gap-2 items-center">
                                            <span className="w-7 h-7 text-xs rounded-full flex justify-center items-center bg-yellow-100">
                                                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                                            </span>
                                            {star}
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <span className="w-7 h-7 text-xs rounded-full flex justify-center items-center bg-orange-100">
                                                <FontAwesomeIcon icon={faFileLines} className="text-orange-400" />
                                            </span>
                                            {review}
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <span className="w-7 h-7 text-xs rounded-full flex justify-center items-center bg-red-100">
                                                <FontAwesomeIcon icon={faHeart} className="text-red-400" />
                                            </span>
                                            {favorite}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Fragment>
                    );
                })}
            </div>
            <Pagination total={favoriteList.length} limit={limit} page={page} setPage={setPage} />
        </div>
    );
};

export default Favorites;
