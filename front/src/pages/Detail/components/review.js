import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {faImage, faThumbsUp, faThumbsDown} from '@fortawesome/free-regular-svg-icons';

const Review = ({data, more, handleReviewToggle}) => {
    const [star, setStar] = useState([]);

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
        <div key={data.idx} className="relative flex flex-col gap-5 mt-4 p-4 py-5 bg-white shadow-lg rounded">
            <div className="flex gap-1 justify-between border border-gray-100 rounded-full p-2 py-1 pr-5">
                <div className="flex gap-3 items-center">
                    <span
                        className="w-[50px] h-[50px] bg-orange-300 rounded-full p-2"
                        style={{background: `url('${data.thumb}') center/cover`}}
                    ></span>
                    <p className="text-lg">{data.name}</p>
                </div>
                <p className="flex items-center">{data.wdate}</p>
            </div>

            <div className="w-full mb-6">
                <div className="px-4 flex flex-col gap-3">
                    <div className="flex gap-2 justify-between items-center w-full">
                        <div className="flex gap-2">
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
