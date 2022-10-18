import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation, Link, useParams} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage, faHeart, faStar, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {profileImgValue} from 'atoms/state';
import axios from 'axios';
import {faLocation} from '../../../node_modules/@fortawesome/free-solid-svg-icons/index';

const Detail = () => {
    const idx = parseInt(useParams().id);
    const token = sessionStorage.getItem('token');

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

    useEffect(() => {
        axios.get(`http://place-api.weballin.com/review/view`, {params: {idx, token}}).then(res => {
            if (res.status === 200) {
                setStore(res.data.data.shopInfo);
            }
        });
    }, []);

    useEffect(() => {
        console.log(store);
    }, [store]);

    const handleReviewToggle = e => {
        const more = e.currentTarget.previousElementSibling;
        more.classList.toggle('hidden');
        if (more.classList.contains('hidden')) {
            console.log('안보임');
            e.currentTarget.innerHTML = `<i class="fa fa-chevron-circle-down" aria-hidden="true"></i>`;
        } else {
            console.log('보임');
            e.currentTarget.innerHTML = `<i class="fa fa-chevron-circle-up" aria-hidden="true"></i>`;
        }
    };

    return (
        <div className="container-wb">
            <div className="bg-white rounded p-6 pt-7 shadow-lg">
                <span className="rounded-full px-4 py-1 bg-orange-500 text-white font-medium">{store.category}</span>
                <h3 className="text-2xl font-bold mt-4">{store.name}</h3>
                <p>{`${store.address} ${store.base} ${store.floor}층`}</p>
                <div className="flex gap-2 mt-4">
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
                <div className="flex flex-col items-center gap-1 w-full p-5 bg-white rounded shadow-lg">
                    <span className="w-[40px] h-[40px] bg-yellow-100 text-yellow-400 rounded-full p-2 text-center">
                        <FontAwesomeIcon icon={faStar} />
                    </span>
                    <p className="text-lg font-bold text-gray-700">{store.star}</p>
                    <p>별점</p>
                </div>
                <div className="flex flex-col items-center gap-1 w-full p-5 bg-white rounded shadow-lg">
                    <span className="w-[40px] h-[40px] bg-red-100 text-red-400 rounded-full p-2 text-center">
                        <FontAwesomeIcon icon={faHeart} />
                    </span>
                    <p className="text-lg font-bold text-gray-700">{store.favorite}</p>
                    <p>찜</p>
                </div>
                <div className="flex flex-col items-center gap-1 w-full p-5 bg-white rounded shadow-lg">
                    <span className="w-[40px] h-[40px] bg-teal-100 text-teal-400 rounded-full p-2 text-center">
                        <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    <p className="text-lg font-bold text-gray-700">{store.distance}분</p>
                    <p>예상 거리</p>
                </div>
            </div>
            <div className="relative flex flex-col gap-5 mt-4 p-4 bg-white shadow-lg rounded">
                <div className="flex gap-1 justify-between">
                    <div className="flex gap-4">
                        <span className="w-[40px] h-[40px] bg-orange-300 rounded-full p-2"></span>
                        <div className="flex flex-col gap-2">
                            <p>JJ</p>
                            <div className="flex gap-2 items-center">
                                <span>⭐⭐⭐⭐</span>
                                <div className="w-[15px] h-[15px] border ms-2"></div>
                            </div>
                            <strong className="text-xl">또 가고 싶은 곳</strong>
                            <p className="mb-1">
                                <span className="text-sm rounded-full px-4 py-1 bg-orange-500 text-white">
                                    메뉴이름
                                </span>
                            </p>
                            <div className="flex gap-2">
                                <span className="text-sm rounded-full px-4 py-1 bg-white text-orange-600 border border-orange-300 font-medium">
                                    #저렴한
                                </span>
                                <span className="text-sm rounded-full px-4 py-1 bg-white text-orange-600 border border-orange-300 font-medium">
                                    #맛있는
                                </span>
                            </div>
                        </div>
                    </div>
                    <span>2022-10-18</span>
                </div>
                <div className="moreData hidden">
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-3 items-center border p-2 rounded-full">
                            <span className="w-[40px] h-[40px] bg-orange-300 rounded-full p-2 text-center">👍</span>
                            <p>가깝고 맛있다</p>
                        </div>
                        <div className="flex gap-3 items-center border p-2 rounded-full">
                            <span className="w-[40px] h-[40px] bg-orange-300 rounded-full p-2 text-center">👎</span>
                            <p>가깝고 맛있다</p>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <div className="w-[100px] h-[100px] border"></div>
                            <div className="w-[100px] h-[100px] border"></div>
                            <div className="w-[100px] h-[100px] border"></div>
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
        </div>
    );
};

export default Detail;
