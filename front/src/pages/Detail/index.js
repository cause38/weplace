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
    const qs = require('qs');

    // store data
    const [review, setReview] = useState([]);
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

    // 이미지 모달
    const [modalVisible, setModalVisible] = useState(false);

    // 이미지 모달 src
    const [modalImg, setModalImg] = useState('');

    // 리뷰 more
    const [moreToggle, setMoreToggle] = useState(false);

    // 찜 관리
    const [isFavorite, setIsFavorite] = useState(false);

    // 리뷰 데이터
    const getReviewData = () => {
        axios.get(`http://place-api.weballin.com/review/view`, {params: {idx, token}}).then(res => {
            if (res.status === 200) {
                setIsFavorite(res.data.data.isFavorite);
                setStore(res.data.data.shopInfo);
                setReview(res.data.data.review);
            }
        });
    };

    useEffect(() => {
        getReviewData();
    }, []);

    // 리뷰 more 버튼 관리
    const handleReviewToggle = e => {
        const more = e.currentTarget.previousElementSibling.querySelector('.moreData');
        setMoreToggle(!moreToggle);
        more.classList.toggle('hidden');
    };

    // 이미지 확대
    const handleImg = img => {
        setModalVisible(true);
        setModalImg(img);
    };

    // 찜 목록
    const handleFavorite = e => {
        const url = 'http://place-api.weballin.com/favorite';
        const data = {token, idx};

        if (!isFavorite) {
            // 추가
            axios.post(url, data).then(async res => await setFavorite(res));
        } else {
            // 삭제
            const options = {
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                data: qs.stringify(data),
            };
            axios.delete(url, options).then(async res => await setFavorite(res));
        }
    };

    // 찜 목록 추가 / 삭제 공통 함수
    const setFavorite = res => {
        if (res.status === 200) {
            alert(res.data.msg);
            getReviewData();
        } else if (res.data.state === 400 || res.data.state === 401) {
            alert(res.data.msg);
        } else {
            alert('통신 장애가 발생하였습니다\n잠시 후 다시 시도해주세요');
        }
    };

    return (
        <div className="container-wb">
            <Modal
                visible={modalVisible}
                setModalVisible={setModalVisible}
                title=""
                contents={
                    <>
                        <div className="h-[70vh] overflow-auto scrollbar">
                            <div className="flex flex-col items-center justify-center min-h-full border rounded p-2">
                                <img src={modalImg} alt="리뷰이미지" className="w-full h-auto mx-auto" />
                            </div>
                        </div>
                    </>
                }
            />

            <div className="bg-white rounded p-6 pt-7 shadow-lg">
                <div className="flex justify-between items-center">
                    <span className="rounded-full px-4 py-1 bg-orange-500 text-white font-medium">
                        {store.category}
                    </span>
                    <button onClick={handleFavorite} className={`${token === null ? 'hidden' : ''}`}>
                        <FontAwesomeIcon
                            icon={faHeart}
                            className={`${isFavorite ? 'text-red-400' : 'text-gray-400'} text-xl`}
                        />
                    </button>
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
                review.map((item, index) => (
                    <Review
                        key={index}
                        idx={idx}
                        token={token}
                        sIdx={store.idx}
                        data={item}
                        more={moreToggle}
                        getReviewData={getReviewData}
                        handleReviewToggle={handleReviewToggle}
                        handleImg={handleImg}
                    />
                ))}
        </div>
    );
};

export default Detail;
