import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faStar, faLocationDot, faFileLines} from '@fortawesome/free-solid-svg-icons';

const Store = ({idx, category, name, distance, star, review, favorite, isFavorite, tag, handleCheckeLike}) => {
    return (
        <div className="flex">
            <Link to={`/detail/${idx}`} className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 h-full flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <span className="px-3 py-1 rounded-full bg-orange-400 text-white text-sm">{category}</span>
                            <button
                                onClick={e => handleCheckeLike(e, idx, isFavorite)}
                                className="absolute w-8 h-8 right-0 top-1/2 -translate-y-1/2 translate-x-[6px] hover:opacity-75"
                            >
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className={`${isFavorite ? 'text-red-400' : 'text-gray-400'} text-xl`}
                                />
                            </button>
                        </div>
                        <p className="text-2xl font-bold line-clamp-2 break-keep">{name}</p>
                    </div>
                    <div>
                        <div className="flex gap-3 justify-between mb-3">
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
                                <span className="w-7 h-7 text-xs rounded-full flex justify-center items-center bg-orange-100">
                                    <FontAwesomeIcon icon={faHeart} className="text-red-400" />
                                </span>
                                {favorite}
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="w-7 h-7 text-xs rounded-full flex justify-center items-center bg-teal-100">
                                    <FontAwesomeIcon icon={faLocationDot} className="text-teal-400" />
                                </span>
                                {distance}분
                            </div>
                        </div>
                        <div className="h-[83px] overflow-y-auto scrollbar flex flex-wrap items-start gap-2 bg-orange-100 rounded-md p-2 text-sm">
                            {tag && tag.length > 0 ? (
                                tag.map((data, id) => (
                                    <span
                                        key={id}
                                        className="rounded-full p-1 pb-[0.33rem] px-3 bg-white shadow-sm shadow-orange-400 text-orange-500"
                                    >
                                        # {data}
                                    </span>
                                ))
                            ) : (
                                <div className="flex justify-center items-center w-full h-full text-orange-400 font-light">
                                    등록된 태그가 없습니다
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Store;
