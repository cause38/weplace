import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Review from './components/review';
import Modal from 'components/Modal';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faStar, faLocationDot, faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';

const Detail = () => {
    const idx = parseInt(useParams().id);
    const token = sessionStorage.getItem('token');

    // store data
    const [review, setReview] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalImg, setModalImg] = useState('');
    const [moreToggle, setMoreToggle] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [store, setStore] = useState({
        address: '',
        base: '',
        category: '',
        distance: '',
        favorite: '',
        floor: '',
        idx: '',
        name: '',
        review: [],
        star: '',
        tag: [],
        url: '',
    });

    useEffect(() => {
        axios.get(`http://place-api.weballin.com/review/view`, {params: {idx, token}}).then(res => {
            if (res.status === 200) {
                setIsFavorite(res.data.data.isFavorite);
                setStore(res.data.data.shopInfo);
                setReview(res.data.data.review);
            }
        });
    }, []);

    const handleReviewToggle = e => {
        const more = e.currentTarget.previousElementSibling.querySelector('.moreData');
        setMoreToggle(!moreToggle);
        more.classList.toggle('hidden');
    };

    const handleImg = img => {
        setModalVisible(true);
        setModalImg(img);
    };

    return (
        <div className="container-wb">
            <Modal
                visible={modalVisible}
                setModalVisible={setModalVisible}
                title=""
                contents={
                    <>
                        <div className="h-[50vh]">
                            <img src={modalImg} alt="리뷰이미지" className="h-full mx-auto" />
                        </div>
                    </>
                }
            />

            <div className="bg-white rounded p-6 pt-7 shadow-lg">
                <div className="flex justify-between items-center">
                    <span className="rounded-full px-4 py-1 bg-orange-500 text-white font-medium">
                        {store.category}
                    </span>
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={`${isFavorite ? 'text-red-400' : 'text-gray-400'} text-xl`}
                    />
                </div>
                <h3 className="text-2xl font-bold mt-3 mb-1">{store.name}</h3>
                <p>{`${store.address} ${store.base} ${store.floor}층`}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                    {store.tag.length > 0 &&
                        store.tag.map((tag, idx) => (
                            <span
                                key={idx}
                                className="text-sm rounded-full px-4 py-1 bg-white text-orange-600 border border-orange-300 font-medium"
                            >
                                #{tag}
                            </span>
                        ))}
                </div>
            </div>
            <div className="flex gap-5 mt-4">
                <div className="flex sm:flex-col justify-center items-center gap-2 sm:gap-1 w-full p-2 py-3 sm:p-5 bg-white rounded shadow-lg">
                    <span className="w-[40px] h-[40px] bg-yellow-100 text-yellow-400 rounded-full p-2 text-center">
                        <FontAwesomeIcon icon={faStar} />
                    </span>
                    <p className="sm:text-lg sm:font-bold text-gray-700">{store.star}</p>
                    <p className="hidden sm:block">별점</p>
                </div>
                <div className="flex sm:flex-col justify-center items-center gap-2 sm:gap-1 w-full p-2 py-3 sm:p-5 bg-white rounded shadow-lg">
                    <span className="w-[40px] h-[40px] bg-red-100 text-red-400 rounded-full p-2 text-center">
                        <FontAwesomeIcon icon={faHeart} />
                    </span>
                    <p className="sm:text-lg sm:font-bold text-gray-700">{store.favorite}</p>
                    <p className="hidden sm:block">찜</p>
                </div>
                <div className="flex sm:flex-col justify-center items-center gap-2 sm:gap-1 w-full p-2 py-3 sm:p-5 bg-white rounded shadow-lg">
                    <a
                        href={store.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-[40px] h-[40px] bg-teal-100 text-teal-400 rounded-full p-2 text-center"
                    >
                        <FontAwesomeIcon icon={faLocationDot} />
                        <FontAwesomeIcon
                            className="absolute text-sm -right-[1px] -top-[1px]"
                            icon={faArrowUpRightFromSquare}
                        />
                    </a>
                    <p className="sm:text-lg sm:font-bold text-gray-700">{store.distance}분</p>
                    <p className="hidden sm:block">예상 거리</p>
                </div>
            </div>
            {review.length > 0 &&
                review.map(item => (
                    <Review
                        key={item.idx}
                        idx={idx}
                        token={token}
                        sIdx={store.idx}
                        data={item}
                        more={moreToggle}
                        handleReviewToggle={handleReviewToggle}
                        handleImg={handleImg}
                    />
                ))}
        </div>
    );
};

export default Detail;
