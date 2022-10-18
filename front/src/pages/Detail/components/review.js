import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage, faThumbsUp, faThumbsDown} from '@fortawesome/free-regular-svg-icons';

const Review = ({data, handleReviewToggle}) => {
    return (
        <div key={data.idx} className="relative flex flex-col gap-5 mt-4 p-4 bg-white shadow-lg rounded">
            <div className="flex gap-1 justify-between">
                <div className="flex gap-4">
                    <span className="w-[40px] h-[40px] bg-orange-300 rounded-full p-2"></span>
                    <div className="flex flex-col gap-2">
                        <p>{data.name}</p>
                        <div className="flex gap-2 items-center">
                            <span>{data.star}</span>
                            <span className={`${data.image.length > 0 ? 'hidden' : ''} text-orange-500`}>
                                <FontAwesomeIcon icon={faImage} />
                            </span>
                        </div>
                        <strong className="text-xl">"{data.comment}"</strong>
                        <p className="mb-1">
                            <span className="text-sm rounded-full px-4 py-1 bg-orange-500 text-white">{data.menu}</span>
                        </p>
                        <div className="flex gap-2">
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
                </div>
                <span>{data.wdate}</span>
            </div>
            <div className="moreData hidden">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-3 items-center border p-2 rounded-full">
                        <span className="w-[40px] h-[40px] bg-orange-100 text-orange-400 rounded-full p-2 text-center">
                            <FontAwesomeIcon icon={faThumbsUp} />
                        </span>
                        <p>{data.comment_good}</p>
                    </div>
                    <div className="flex gap-3 items-center border p-2 rounded-full">
                        <span className="w-[40px] h-[40px] bg-red-100 text-red-400 rounded-full p-2 text-center">
                            <FontAwesomeIcon icon={faThumbsDown} />
                        </span>
                        <p>{data.comment_bad}</p>
                    </div>
                    <div className="flex gap-2 mt-2">
                        {data.image.length > 0 &&
                            data.image.map((img, idx) => {
                                <div key={idx} className="w-[100px] h-[100px] border">
                                    <img src={img} alt="리뷰이미지" />
                                </div>;
                            })}
                    </div>
                </div>
            </div>
            <span
                onClick={e => handleReviewToggle(e)}
                className="absolute right-3 bottom-3 text-center text-orange-600 cursor-pointer"
            >
                <i className="fa fa-chevron-circle-down" aria-hidden="true"></i>
            </span>
        </div>
    );
};

export default Review;
